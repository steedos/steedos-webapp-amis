import { keyBy, map, isNaN, isNil, union, debounce, each, clone, forEach, filter } from "lodash";

export const B6_TABLES_BASEID = "default";

const B6_HOST = "http://localhost:5100";//process.env.B6_HOST || "";
const B6_TABLES_API = `${B6_HOST}/api/v6/tables`;
export const B6_TABLES_ROOTURL = `${B6_TABLES_API}/${B6_TABLES_BASEID}`;

export const B6_TABLES_METABASE_ROOTURL = `${B6_TABLES_API}/meta/bases/${B6_TABLES_BASEID}/tables`;

const baseFields = ["created", "created_by", "modified", "modified_by"];

const FilterTypesMap = {
    'equals': '=',
    'notEqual': '!=',
    'contains': 'contains',
    'notContains': 'notcontains',
    'startsWith': 'startswith',
    'endsWith': 'endswith',
    'lessThan': '<',
    'lessThanOrEqual': '<=',
    'greaterThan': '>',
    'greaterThanOrEqual': '>=',
    'empty': 'empty' //TODO 不支持
}

function padZero(num: any) {
    num = num.toString();
    return num.length < 2 ? "0" + num : num;
}

// 判断一个js变量是否一个合法的Date变量
function isValidDate(date: any) {
    if (isNil(date)) {
        return true;
    }
    return Object.prototype.toString.call(date) === '[object Date]' && !isNaN(date.getTime());
}

//校验字符串日期值是否合法，如果合法返回Date类型，否则返回null
function parseDate(str: string) {
    // 定义正则表达式，匹配不同的日期格式
    // 格式：YYYY-MM-DD、YYYY/MM/DD 和 YYYY-MM-DDTHH:MM:SS.SSSZ 
    // 最后一种TZ格式是服务端返回的格式值，复制其它列字段值时会把这种格式值提交到接口，必须兼容
    var regex = new RegExp("^(\\d{4})([-\\/])(0?[1-9]|1[0-2])\\2(0?[1-9]|[12][0-9]|3[01])(T(\\d{2}):(\\d{2}):(\\d{2})(\\.\\d{3})?Z)?$");

    // 检查是否匹配正则表达式
    var match = str.match(regex);
    if (!match) {
        return null;
    }

    // 提取年份、月份、日期和时间
    var year = match[1];
    var month = match[3].padStart(2, '0'); // 补齐月份前导零
    var day = match[4].padStart(2, '0');   // 补齐日期前导零

    // 如果有时间部分，提取时间
    var timePart = match[5] ? match[5] : '';
    var standardizedDateStr = year + '-' + month + '-' + day + timePart;

    // 使用 Date 对象验证日期是否合法
    // 这里 standardizedDateStr 必须经过上面的补充前导零操作，否则new Date执行的结果会差8小时
    var date = new Date(standardizedDateStr);
    var timestamp = date.getTime();

    // 检查是否是合法日期
    if (typeof timestamp !== 'number' || isNaN(timestamp)) {
        return null;
    }

    // 检查生成的日期和输入是否一致（避免 2024-02-30 这种情况）
    if (date.getUTCFullYear() === parseInt(year, 10) &&
        date.getUTCMonth() + 1 === parseInt(month, 10) &&
        date.getUTCDate() === parseInt(day, 10)) {
        return date;
    }

    return null;
}

// 校验单选字段是否在选项范围
function checkSelectValueValid(value, options) {
    return (options || []).indexOf(value) > -1;
}

function getAmisGlobalVariables() {
    return {
        global: (window as any).Creator.USER_CONTEXT
    }
}

// 校验number值小数位数，必须小于等于指定位数
function checkNumberPrecision(num, precision) {
    const numStr = num.toString();
    const parts = numStr.split('.');
    if (precision > 0) {
        if (parts.length === 1) {
            return true;
        }
        return parts[1].length <= precision;
    }
    else {
        return parts.length === 1;
    }
}

export async function getMeta(tableId: string, force: boolean = false) {
    if (!tableId) {
        return;
    }
    try {
        const response = await fetch(`${B6_TABLES_METABASE_ROOTURL}/${tableId}`, {
            credentials: 'include',
            // "headers": {
            //     'Content-Type': 'application/json',
            //     "Authorization": "Bearer ${context.tenantId},${context.authToken}" //TODO context中没取到数据
            // }
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`getUISchema`, tableId, error);
    }
}

function evaluate() {
    var currentAmis = (window as any).Amis;
    return currentAmis.evaluate;
}

function runAmisFormula(formula: string, data: any, catchBack: Function, options: any = {}) {
    try {
        var globalData = getAmisGlobalVariables();
        return (evaluate as any)(formula, Object.assign({}, globalData, data), Object.assign({ evalMode: true }, options));
    }
    catch (ex) {
        return typeof catchBack === "function" && catchBack(ex);
    }
}

// 校验数据表中配置的Verifications并返回错误信息
function getTableVerificationErrors(data: any, tableVerifications: any) {
    let validated = true;
    const verificationErrors = [];
    // verification校验
    const verifications = tableVerifications || [];
    verifications.forEach(function (verification: any) {
        validated = runAmisFormula(verification.rule, data, function (ex) {
            console.warn("执行校验规则“" + verification.rule + "”公式出错了，请检查校验规则公式配置：", ex);
            //env.notify("error", "执行校验规则“" + verification.rule + "”公式出错了，请检查校验规则公式配置：" + (ex && ex.toString()))
        });
        if (!validated) {
            verificationErrors.push(verification.alert || "校验规则未配置错误信息");
        }
    });
    return verificationErrors;
}

function getMainMenuItems(params) {
    const athleteMenuItems = params.defaultItems.slice(0);
    // athleteMenuItems.unshift("separator");
    // athleteMenuItems.unshift({
    //     name: "删除字段",
    //     action: (menuParams) => {
    //         console.log("Start to delete a field");
    //         var fieldConfig = menuParams.column.colDef.cellEditorParams.fieldConfig;
    //         if (!fieldConfig) {
    //             return;
    //         }
    //         dispatchEvent("deleteField", {
    //             "deletingFieldId": fieldConfig._id
    //         });
    //     }
    // });
    // athleteMenuItems.unshift({
    //     name: "编辑字段",
    //     action: (menuParams) => {
    //         console.log("Start to edit a field");
    //         var fieldConfig = menuParams.column.colDef.cellEditorParams.fieldConfig;
    //         if (!fieldConfig) {
    //             return;
    //         }
    //         dispatchEvent("editField", {
    //             "editingFieldId": fieldConfig._id
    //         });
    //     }
    // });
    return athleteMenuItems;
}

function getColumnDef(field: any, dataTypeDefinitions: any, mode: string) {
    const isReadonly = mode === "read";
    const isAdmin = mode === "admin";
    var cellDataType: any,
        cellEditorParams: any,
        cellEditor: any,
        cellRendererParams: any,
        cellRenderer: any,
        valueFormatter: any,
        valueGetter: any,
        fieldOptions: any,
        editable = true,
        filter: any,
        filterParams: any;

    let isCellReadonly = isReadonly;
    if (field.readonly || field.is_system) {
        isCellReadonly = true;
    }

    let suppressMovable = baseFields.indexOf(field.name) > -1;
    let lockPosition = baseFields.indexOf(field.name) > -1 ? 'right' : false;

    // 根据字段类型设置 dataType
    cellEditorParams = {
        fieldConfig: field
    };
    cellRendererParams = {};
    filterParams = {
        debounceMs: 200,
        maxNumConditions: 1
    };
    switch (field.type) {
        case 'text':
        case 'textarea':
            cellDataType = 'text';
            filter = 'agTextColumnFilter';
            Object.assign(filterParams, {
                filterOptions: ["contains", "notContains", "equals", "startsWith", "endsWith"]
            });
            break;
        case 'number':
            cellDataType = 'number';
            let precision = 17; // field.precision || 0，编辑时默认始终支持任意小数位数输入
            if (!field.precision) {
                // 整数时不允许输入小数位
                precision = 0;
            }
            else {
                // 小数值要格式化为field.precision位数显示和导出Excel
                valueGetter = dataTypeDefinitions.number.valueGetter;
            }
            Object.assign(cellEditorParams, {
                precision: precision
            });
            filter = 'agNumberColumnFilter';
            Object.assign(filterParams, {
                filterOptions: ["equals", "greaterThan", "greaterThanOrEqual", "lessThan", "lessThanOrEqual"]
            });
            break;
        case 'select':
            cellDataType = 'text';
            fieldOptions = field.options && field.options.split("\n").map(function (n) { return n.trim(); }) || [];
            fieldOptions.unshift(null);
            Object.assign(cellEditorParams, {
                values: fieldOptions
            });
            cellEditor = "agSelectCellEditor";
            filter = 'agSetColumnFilter';
            Object.assign(filterParams, {
                values: fieldOptions
            });
            break;
        case 'select-multiple':
            cellDataType = 'object';
            fieldOptions = field.options && field.options.split("\n").map(function (n: string) { return n.trim(); }) || [];
            Object.assign(cellEditorParams, {
                values: fieldOptions
            });
            // cellEditor = MultiSelectCellEditor;
            filter = 'agSetColumnFilter';
            Object.assign(filterParams, {
                values: fieldOptions
            });
            break;
        case 'date':
            cellDataType = 'date';
            cellEditor = "agDateCellEditor";
            valueFormatter = dataTypeDefinitions.date.valueFormatter;
            // 如果不定义valueGetter，双击单元格进入编辑状态时，值显示为空
            valueGetter = dataTypeDefinitions.date.valueGetter;
            filter = 'agDateColumnFilter';
            Object.assign(filterParams, {
                filterOptions: ["equals", "greaterThan", "greaterThanOrEqual", "lessThan", "lessThanOrEqual"]
            });
            break;
        case 'datetime':
            cellDataType = 'date';
            editable = false;
            // cellEditor = DateTimeEditor;
            // 因为日期时间依赖了DateTimeEditor.init函数中对初始值定义，所以这里没必要再走一次valueGetter
            // valueGetter = dataTypeDefinitions.date.valueGetter;
            /*
            filter = 'agDateColumnFilter';
            Object.assign(filterParams, {
                filterOptions: ["equals", "greaterThan", "greaterThanOrEqual", "lessThan", "lessThanOrEqual"]
            });*/
            break;
        case 'boolean':
            cellDataType = 'boolean';
            Object.assign(cellRendererParams, {
                disabled: true
            });
            cellRenderer = "agCheckboxCellRenderer";
            filter = 'agSetColumnFilter';
            Object.assign(filterParams, {
                values: [true, false],
                suppressSelectAll: true,
                comparator: function (a, b) {
                    // 将 true 显示在 false 之前
                    if (a === true && b === false) return -1;
                    if (a === false && b === true) return 1;
                    return 0;
                },
                valueFormatter: function (params) {
                    return params.value ? '是' : '否';
                }
            });
            break;
        case 'formula':
            cellDataType = 'formula';
            editable = false;
            // 记录所有公式字段配置方便取出来用
            dataTypeDefinitions.formula.fields[field.name.toLowerCase()] = field;
            break;
        case 'lookup':
            cellDataType = 'lookup';
            editable = false;
            // 不可以使用 cellRenderer ，因为导出excel不认
            // cellRenderer = function(params) { return (params.value && params.value.name) || ""; }
            valueGetter = dataTypeDefinitions.lookup.valueGetter;
            break;
        default:
            cellDataType = 'text'; // 默认类型
    }

    var mainMenuItems = isAdmin ? getMainMenuItems : null;
    if (field.is_system) {
        // 系统字段不显示额外菜单
        mainMenuItems = null;
    }

    return {
        field: field.name.toLowerCase(),
        headerName: field.label,
        cellDataType: cellDataType,
        cellEditorParams: cellEditorParams,
        cellEditor: cellEditor,
        cellRendererParams: cellRendererParams,
        cellRenderer: cellRenderer,
        editable: isCellReadonly ? false : editable,
        valueFormatter: valueFormatter,
        valueGetter: valueGetter,
        tooltipValueGetter: tooltipValueGetter,
        filter: filter,
        filterParams: filterParams,
        mainMenuItems: mainMenuItems,
        suppressMovable: suppressMovable,
        lockPosition: lockPosition
    };

}

// 校验数据表中配置的Verifications并返回错误信息
function getFieldVerificationErrors(fieldValue, colDef) {
    const verificationErrors = [];
    if (isNil(colDef) || !colDef.editable) {
        // 不在列上定义，或列上只读的字段不用校验字段值类型合法性
        return [];
    }
    if (isNil(fieldValue)) {
        return [];
    }

    const fieldConfig = colDef.cellEditorParams.fieldConfig;
    if (fieldConfig.type === "date") {
        let isDateValid = true;
        if (typeof fieldValue === 'string') {
            if (fieldValue === '') {
                // 空字符串应该直接存储为null，也不校验失败
                return verificationErrors;
            }
            // 粘贴行数据过来时是字符串
            fieldValue = parseDate(fieldValue);
            if (fieldValue === null) {
                isDateValid = false;
            }
        }
        if (isDateValid) {
            // 到这里说明字段值已经转为一个Date类型变量，进一步判断变量是否合法
            isDateValid = isValidDate(fieldValue);
        }
        if (!isDateValid) {
            verificationErrors.push("字段“" + fieldConfig.label + "”必须是合法的日期格式！例如：2024-01-01 或 2024/01/01");
            return verificationErrors;
        }
    }
    else if (fieldConfig.type === "number") {
        if (typeof fieldValue === 'string') {
            fieldValue = Number(fieldValue);
        }
        if (typeof fieldValue !== 'number' || isNaN(fieldValue)) {
            verificationErrors.push("字段“" + fieldConfig.label + "”必须是数字！");
        }
        // 无论整数小数都不校验位数，整数直接存为整数，小数直接按原始值存，不截取小数位
        // else {
        //     let isPrecisionValid = checkNumberPrecision(fieldValue, fieldConfig.precision);
        //     if (!isPrecisionValid) {
        //         verificationErrors.push("字段“" + fieldConfig.label + "”小数位数不能大于" + fieldConfig.precision || 0 + "！");
        //     }
        // }
    }
    else if (fieldConfig.type === "select") {
        if (typeof fieldValue !== 'string') {
            verificationErrors.push("字段“" + fieldConfig.label + "”是单选类型，只支持字符串！");
            return verificationErrors;
        }
        let isSelectValueValid = checkSelectValueValid(fieldValue, colDef.cellEditorParams.values || []);
        if (!isSelectValueValid) {
            verificationErrors.push("字段“" + fieldConfig.label + "”是单选类型，请输入合法的选项值！");
        }
    }
    return verificationErrors;
}

// 监听行数据改变事件
async function onRowValueChanged(event: any, table: any) {
    console.log("===onRowValueChanged===table===", table);
    const tableId = table._id;
    const data = event.data;
    console.log('Saving updated data to server:', JSON.stringify(data));
    try {
        const allGridColumns = event.api.getAllGridColumns();
        // 字段类型值转换以及字段校验
        let fieldsVerificationErrors = [];
        const colDefs = keyBy(map(allGridColumns, "colDef"), "field");
        // removeIgnoredFieldValueInData(data, colDefs);
        each(data, function (n, k) {
            if (isNil(n)) {
                return;
            }
            const colDef = colDefs[k];
            if (colDef) {
                const fieldConfig = colDef.cellEditorParams.fieldConfig;
                if (fieldConfig.type === "date") {
                    let dateValiErrors = getFieldVerificationErrors(n, colDef);
                    let isDateValid = !dateValiErrors || dateValiErrors.length === 0;
                    if (!isDateValid) {
                        fieldsVerificationErrors = union(fieldsVerificationErrors, dateValiErrors);
                        data[k] = null; // 这里不转为null会真的保存为非法数据到数据库，非法字段类型值统一存为null
                        return;
                    }
                    let isDateString = false;
                    if (typeof n === 'string') {
                        if (n === '') {
                            // 空字符串直接存储为null
                            data[k] = null;
                            return;
                        }
                        isDateString = true;
                    }
                    let utcDate = n;
                    if (!isDateString) {
                        // 设置为选中日期的 UTC 0 点
                        // 只有从日期控件输入的值需要做转换，从粘贴行数据过来的字符串格式不用处理时区，因为要求粘贴过来的只兼容 YYYY-MM-DD YYYY/MM/DD 两种格式
                        const timezoneOffset = n.getTimezoneOffset();
                        utcDate = new Date(n.getTime() - timezoneOffset * 60 * 1000);
                    }
                    data[k] = utcDate;
                }
                else if (fieldConfig.type === "number") {
                    let numberValiErrors = getFieldVerificationErrors(n, colDef);
                    let isNumberValid = !numberValiErrors || numberValiErrors.length === 0;
                    if (!isNumberValid) {
                        fieldsVerificationErrors = union(fieldsVerificationErrors, numberValiErrors);
                        data[k] = null; // 非法字段类型值统一存为null
                        return;
                    }
                    if (typeof n === 'string') {
                        n = Number(n);
                    }
                    if (!fieldConfig.precision) {
                        n
                        // 整数直接转为四舍五入整数，不提醒错误，小数不用进这里，小数不管小数位数直接保存原始值即可
                        let isPrecisionValid = checkNumberPrecision(n, fieldConfig.precision);
                        if (!isPrecisionValid) {
                            n = Math.round(n)
                        }
                    }
                }
                else if (fieldConfig.type === "select") {
                    let selectValiErrors = getFieldVerificationErrors(n, colDef);
                    let isSelectValueValid = !selectValiErrors || selectValiErrors.length === 0;
                    if (!isSelectValueValid) {
                        fieldsVerificationErrors = union(fieldsVerificationErrors, selectValiErrors);
                        // 下拉框字段类型是字符串，不在范围内也直接保存，列表会显示异常信息就好
                        // data[k] = null; // 非法字段类型值统一存为null
                    }
                }
            }
        });
        // 循环所有公式字段执行公式计算并设置值到data中
        // 一定要先计算公式字段值再执行校验，否则校验规则中引用了公式字段值的话，校验规则中的公式值是错误的
        setRowDataFormulaValues(data, event.api);
        const formulaErrors = data.__formulaErrors.concat();
        // verifications校验
        const rowNode = event.node;
        const tableVerificationErrors = getTableVerificationErrors(data, table.verifications);
        const verificationErrors = union(fieldsVerificationErrors, tableVerificationErrors);
        let allValidated = verificationErrors.length === 0;
        if (allValidated) {
            // 校验通过重新把row data中校验错误信息移除，否则错误信息一直在
            rowNode.setData(Object.assign({}, data, { __verificationErrors: [] }));
        }
        else {
            console.log("The table verifications is not passed for the row data:", table.verifications, data);
            let editingCellsCount = event.api.getEditingCells().length;
            if (editingCellsCount === 0) {
                // 多行校验不通过时只开启第一行编辑状态
                /*
                // 从行编辑改为单元格编辑后，不再需要自动开启编辑状态
                event.api.startEditingCell({
                    rowIndex: event.rowIndex,
                    colKey: allGridColumns[0].colId
                });*/
            }
            rowNode.setData(Object.assign({}, data, { __verificationErrors: verificationErrors }));
            verificationErrors.forEach((msg) => {
                //env.notify("error", msg)
            });
            console.log(verificationErrors.join("\n"));
        }
        // 保存更新的数据到服务端
        delete data.__verificationErrors;
        delete data.__formulaErrors;
        var url = B6_TABLES_ROOTURL + '/' + tableId + '/' + data._id;
        const response = await fetch(url, {
            credentials: 'include',
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                // "Authorization": "Bearer ${context.tenantId},${context.authToken}" //TODO context中没取到数据
                "Authorization": "Bearer 654300b5074594d15147bcfa,dbe0e0da68ba2e83aca63a5058907e543a4e89f7e979963b4aa1f574f227a3b5063e149d818ff553fb4aa1"
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Server error! Status: ' + response.status);
        }
        const responseData = await response.json();
        console.log('Data saved successfully:', responseData);
        rowNode.setData(Object.assign({}, responseData, { __verificationErrors: verificationErrors, __formulaErrors: formulaErrors }));
    } catch (error) {
        console.error('Error saving data:', error);
        // env.notify("error", "保存数据失败，请刷新浏览器以查看最新数据状态，并稍后重试。");
    }
}

const changeQueue = new Map();

function processChangeQueue(table: any) {
    console.log("===processChangeQueue===table===", table);
    changeQueue.forEach((event, rowIndex) => {
        onRowValueChanged(event, table);
    });
    changeQueue.clear();
}

const debouncedProcessChangeQueue = debounce(processChangeQueue, 200, {
    leading: false,
    trailing: true
});

function onCellValueChanged(event: any, table: any) {
    const rowIndex = event.node.rowIndex;

    if (!changeQueue.has(rowIndex)) {
        changeQueue.set(rowIndex, event);
    } else {
        const existingEvent = changeQueue.get(rowIndex);
        // 更新现有的 event 对象中的数据
        existingEvent.data = { ...existingEvent.data, ...event.data };
    }

    debouncedProcessChangeQueue(table);
}

// 校验数据表中数据的字段类型格式合法性
function getFieldsVerificationErrors(fieldValues, colDefs) {
    let validated = true;
    let verificationErrors = [];

    for (const key in fieldValues) {
        if (fieldValues.hasOwnProperty(key)) {
            const value = fieldValues[key];
            var fieldItemValiResult = getFieldVerificationErrors(value, colDefs[key]);
            if (fieldItemValiResult && fieldItemValiResult.length) {
                verificationErrors = verificationErrors.concat(fieldItemValiResult);
            }
        }
    }
    return verificationErrors;
}

function tooltipValueGetter(params) {
    var data = params.data;
    var tips = (data.__verificationErrors || []).concat(data.__formulaErrors || []);
    if (tips && tips.length) {
        return tips.join("；");
    }
}

function setRowDataFormulaValues(rowData, targetGridApi) {
    // 获取数据类型定义
    var dataTypeDefinitions = targetGridApi.getGridOption("dataTypeDefinitions");
    var formulaFields = dataTypeDefinitions.formula.fields;

    // 作为公式参数参与计算前，表单中各种字段类型空值异常值处理，要转为0值或对应的默认值参与计算
    // 注意rowData中非法字段类型值已经提前转为空值或合法的默认字段值了，比如boolean类型非法的字符串会转为false，非法的数值会转为null
    // 所以下面不用额外处理，只需要考虑空值的情况
    const allGridColumns = targetGridApi.getAllGridColumns();
    const colDefs = keyBy(map(allGridColumns, "colDef"), "field");
    const formulaInputData = clone(rowData);
    each(colDefs, function (n, k) {
        if (!k) {
            return;
        }
        const colDef = n;
        const fieldValue = formulaInputData[k];
        const fieldConfig = colDef.cellEditorParams && colDef.cellEditorParams.fieldConfig;
        if (fieldConfig) {
            const fieldType = fieldConfig.type;
            if (fieldType === "number") {
                // 数字类型参数，如果为空，视为0值参与公式计算
                if (isNil(fieldValue)) {
                    formulaInputData[k] = 0;
                }
            }
            else if (fieldType === "boolean") {
                // boolean类型参数，如果为空，视为false值参与公式计算
                if (isNil(fieldValue)) {
                    formulaInputData[k] = false;
                }
            }
            else {
                // 其它类型，包括单选，日期，文本等，如果为空，视为空字符串参与公式计算
                if (isNil(fieldValue)) {
                    formulaInputData[k] = "";
                }
            }
        }
    });

    var success = true;
    var formulaErrors = [];

    // 遍历每个公式字段并计算
    for (var formulaFieldName in formulaFields) {
        if (formulaFields.hasOwnProperty(formulaFieldName)) {
            var formulaField = formulaFields[formulaFieldName];
            var formula = formulaField.formula;
            console.log("ag-grid amis formula runing:", formulaField.label, formula, rowData);
            var formulaValue = runAmisFormula(formula, formulaInputData, function (ex) {
                var errMsg = "公式字段“" + formulaField.label + "”执行公式”" + formula + "“出错了，请检查公式配置：" + (ex && ex.toString());
                console.warn(errMsg, ex);
                // env.notify("error", errMsg)
                formulaErrors.push(errMsg);
                success = false;
                return null;
            });
            // 检查结果是否为数值
            var valueType = typeof formulaValue;
            var isValueTypeInvalid = !isNil(formulaValue) && ["number", "string", "boolean"].indexOf(valueType) < 0;
            if (valueType === 'number') {
                if (isFinite(formulaValue)) {
                    // 四舍五入并保留两位小数
                    formulaValue = Math.round(formulaValue * 100) / 100;
                }
                else {
                    // 比如值为1/0是一个非法的数值
                    // 不可以设置为校验失败，因为新建记录时可能参与计算的字段值为空，此时公式计算结果为NaN，需要设置为null
                    // isValueTypeInvalid = true;
                }
            }
            if (isValueTypeInvalid) {
                var errMsg = "公式字段“" + formulaField.label + "”计算结果出错了，计算结果只支持数值、字符串和布尔类型。";
                console.warn(errMsg);
                // env.notify("error", errMsg)
                formulaErrors.push(errMsg);
                // 只支持变量类型 number/string/boolean,其他类型返回null，比如1/0值为NaN，会转为null保存
                success = false;
                formulaValue = null;
            }
            console.log("ag-grid amis formula run result:", formulaField.label, formula, formulaValue);
            rowData[formulaFieldName] = formulaValue;
        }
    }

    rowData.__formulaErrors = formulaErrors;
    return success;
}

let columnMoved = false;
const onColumnMoved = () => {
    columnMoved = true;
};

// Function to handle drag stopped event
async function onDragStopped(event) {
    if (!columnMoved) {
        return;
    }
    var allColumns = filter(event.api.getColumnDefs(), function (n) {
        return n.cellEditorParams && n.cellEditorParams.fieldConfig && baseFields.indexOf(n.cellEditorParams.fieldConfig.name) < 0;
    });
    var newSortedFieldIds = map(allColumns, "cellEditorParams.fieldConfig._id")
    var newSortedFields = map(allColumns, "cellEditorParams.fieldConfig")
    console.log("Saving new fields sort:", newSortedFields);
    // 将新的字段排序发送到服务器
    // dispatchEvent("sortFields", {
    //     "sortedFields": newSortedFieldIds
    // });
    columnMoved = false;
}

/**
 * 把ag-grid filterModel 转为魔方filters格式
 * @param filterModel
 */
function filterModelToOdataFilters(filterModel, colDefs) {
    const filters = [];
    forEach(filterModel, (value, key) => {
        const fieldConfig = colDefs[key].cellEditorParams.fieldConfig;
        if (value.type === 'between') {
            if (value.filterType === "number") {
                filters.push([key, "between", [value.numberFrom, value.numberTo]]);
            } else {
                if (value.filter) {
                    filters.push([key, value.type, value.filter]);
                } else {
                    filters.push([key, "between", [value.dateFrom, value.dateTo]]);
                }
            }

        } else {
            let filterItem;
            switch (fieldConfig.type) {
                case 'text':
                case 'textarea':
                    filterItem = [key, FilterTypesMap[value.type], value.filter];
                    filters.push(filterItem);
                    break;
                case 'number':
                    filterItem = [key, FilterTypesMap[value.type], value.filter];
                    filters.push(filterItem);
                    break;
                case 'select':
                case 'select-multiple':
                    // 因为不需要支持多选，这里先不处理，如果要支持多选使用anyof过滤操作符应该就可以了，比如["category", "anyof", selectedCategories]
                    const filterValues = value.values;
                    if (filterValues.length) {
                        let filterItem = [];
                        for (let i = 0; i < filterValues.length; i++) {
                            filterItem.push([key, "=", filterValues[i]]);
                            if (i < filterValues.length - 1) {
                                filterItem.push("or");
                            }
                        }
                        filters.push(filterItem);
                    }
                    break;
                case 'date':
                case 'datetime':
                    let dateValue = new Date(value.dateFrom);
                    if (fieldConfig.type === "date") {
                        // 设置为日期的 UTC 0 点
                        const timezoneOffset = dateValue.getTimezoneOffset();
                        dateValue = new Date(dateValue.getTime() - timezoneOffset * 60 * 1000);
                    }
                    filterItem = [key, FilterTypesMap[value.type], dateValue];
                    filters.push(filterItem);
                    break;
                case 'boolean':
                    let filterValue = value.values[0];
                    if (typeof filterValue !== "boolean") {
                        filterValue = filterValue === "true"
                    }
                    filterItem = [key, "=", filterValue];
                    filters.push(filterItem);
                    break;
                case 'formula':
                    // 不支持公式字段过滤
                    break;
            }
        }
    })
    return filters;
}

function getServerSideDatasource(tableId: string) {
    return {
        getRows: async function (params: any) {
            console.log('Server Side Datasource - Requesting rows from server:', params.request);
            let gridApi = params.api;
            // agGridRefs[tableId] = gridApi;\

            try {
                const colDefs = keyBy(
                    map(params.api.getAllGridColumns(), col => col.colDef),
                    "field"
                );
                const modelFilters = filterModelToOdataFilters(params.request.filterModel, colDefs);
                console.log('Server Side Datasource - Requesting rows by modelFilters:', modelFilters);

                let url = `${B6_TABLES_ROOTURL}/${tableId}`;
                const startRow = params.request.startRow;
                const pageSize = params.api.paginationGetPageSize();
                let separator = url.includes('?') ? '&' : '?';
                url += `${separator}skip=${startRow}&top=${pageSize}&expands=created_by,modified_by`;

                // 过滤
                let queryFilters = [];
                const collectFilters = [];
                // if (B6_TABLES_DATA_COLLECT_FIELDNAME && collectId) {
                //     collectFilters = [B6_TABLES_DATA_COLLECT_FIELDNAME, "=", collectId];
                // }
                if (collectFilters.length && modelFilters.length) {
                    queryFilters = [collectFilters, modelFilters];
                } else if (collectFilters.length) {
                    queryFilters = collectFilters;
                } else {
                    queryFilters = modelFilters;
                }
                if (queryFilters.length > 0) {
                    separator = url.includes('?') ? '&' : '?';
                    url += `${separator}filters=${JSON.stringify(queryFilters)}`;
                }

                // 排序
                const sortModel = params.request.sortModel;
                const sort = [];
                forEach(sortModel, sortField => {
                    sort.push(`${sortField.colId} ${sortField.sort}`);
                });
                console.log('Server Side Datasource - Requesting rows by sortModel:', sortModel);
                if (sort.length > 0) {
                    separator = url.includes('?') ? '&' : '?';
                    url += `${separator}sort=${sort.join(",")}`;
                }

                const response = await fetch(url, {
                    credentials: 'include',
                    // headers: {
                    //     'Content-Type': 'application/json',
                    //     'Authorization': 'Bearer ${context.tenantId},${context.authToken}' //TODO context中没取到数据
                    // }
                });

                if (!response.ok) {
                    throw new Error(`Server error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Server Side Datasource - data:', data);

                params.success({
                    rowData: data.data,
                    rowCount: data.totalCount
                });
            } catch (error) {
                console.error('Error fetching data from server:', error);
                // env.notify("error", '无法从服务器获取数据，请检查网络连接并重试。如果问题持续，请联系技术支持。');
                params.fail();
            }
        }
    };
}

function getDataTypeDefinitions() {
    return {
        date: {
            baseDataType: 'date',
            extendsDataType: 'date',
            valueParser__: function (params) {
                // ag-grid官网明确说valueParser是用来实现保存数据前数据转换的，但是实测这个函数并不一定会被触发
                // 另外valueSetter也能实现类似功能，但是一样实测不会被触发
                // 所以只能手动在调用保存接口前实现相关转换逻辑
                // 见：
                // https://www.ag-grid.com/javascript-data-grid/column-properties/#reference-editing-valueParser
                // https://www.ag-grid.com/javascript-data-grid/cell-data-types/#overriding-the-pre-defined-cell-data-type-definitions
                // 后面测试到规则是输入值为string类型时，即复制粘贴进来的字段值才会走valueParser
                // 因为要考虑到从excel大量copy数据过来时保持原错误字段值提醒用户手动改值, 所以不可以启用valueParser做值转换，只能手动在调用保存接口前实现相关转换逻辑
                console.log("valueParser:", params.newValue);
            },
            valueGetter: function (params) {
                var fieldType = params.colDef.cellEditorParams.fieldConfig.type;
                var fieldName = params.colDef.field;
                var fieldValue = params.data[fieldName];
                if (!fieldValue) return null;

                var date = new Date(fieldValue);
                return date;
            },
            valueFormatter: function (params) {
                var fieldType = params.colDef.cellEditorParams.fieldConfig.type;
                var date = new Date(params.value);

                if (!params.value) return "";

                if (fieldType === "date") {
                    return date.getFullYear() + '-' + padZero(date.getMonth() + 1) + '-' + padZero(date.getDate());
                } else if (fieldType === "datetime") {
                    // Convert to local time considering timezone
                    var localDate = new Date(date.getTime());
                    return localDate.getFullYear() + '-' + padZero(localDate.getMonth() + 1) + '-' + padZero(localDate.getDate()) + ' ' + padZero(localDate.getHours()) + ':' + padZero(localDate.getMinutes());
                }

                return "";
            }
        },
        formula: {
            baseDataType: 'text',
            extendsDataType: 'text',
            fields: {}
        },
        lookup: {
            baseDataType: 'text',
            extendsDataType: 'text',
            valueGetter: function (params) {
                // lookup字段值显示和导出为excel，不可以使用 cellRenderer ，因为导出excel不认
                var fieldType = params.colDef.cellEditorParams.fieldConfig.type;
                var fieldName = params.colDef.field;
                var fieldValue = params.data[fieldName];
                if (!fieldValue) return null;

                return fieldValue.name || "";
            }
        },
        number: {
            baseDataType: 'number',
            extendsDataType: 'number',
            valueGetter: function (params) {
                // number字段值显示和导出为excel，不可以使用 cellRenderer ，因为导出excel不认
                var fieldPrecision = params.colDef.cellEditorParams.fieldConfig.precision;
                var fieldName = params.colDef.field;
                var fieldValue = params.data[fieldName];
                if (!isNil(fieldValue)) {
                    let isValidNumber = true;
                    if (typeof fieldValue === 'string') {
                        fieldValue = Number(fieldValue);
                    }
                    if (typeof fieldValue !== 'number' || isNaN(fieldValue)) {
                        isValidNumber = false;
                    }
                    if (!isValidNumber) {
                        // 非法值直接清空显示和导出
                        return null;
                    }
                    if (fieldPrecision > 0) {
                        // 小数格式化为指定小数位数显示和导出
                        return parseFloat(fieldValue).toFixed(fieldPrecision);
                    }
                    else {
                        console.log("===整数直接返回显示和导出2===");
                        // 整数直接返回显示和导出
                        return fieldValue;
                    }
                }
            }
        }
    };
}

function getGridOptions(table: any, mode: string) {
    if (!table || !table.fields) {
        return null;
    }
    let tableId = table._id;
    let tableLabel = table.label;
    const isReadonly = mode === "read";
    const isAdmin = mode === "admin";
    var dataTypeDefinitions = getDataTypeDefinitions();

    var columnDefs = table.fields.map(function (field) {
        return getColumnDef(field, dataTypeDefinitions, mode);
    });

    // if (!isReadonly){
    //     // 添加选择列，这里单独添加选择列，不使用rowSelection配置为对象的方式默认生成的选择列是为了把索引列排在第一列
    //     columnDefs.unshift({
    //         headerCheckboxSelection: true,
    //         checkboxSelection: true,
    //         flex: null,//不配置的话，默认走defaultColDef中的flex:1的话，宽度不生效
    //         width: 50,
    //         minWidth: 50,
    //         contextMenuItems: [],
    //         mainMenuItems: [],
    //         pinned: 'left',
    //         suppressMovable: true,
    //         suppressHeaderMenuButton: true,
    //         suppressHeaderContextMenu: true,
    //         suppressFloatingFilterButton: true,
    //         resizable: false,
    //         sortable: false
    //     });
    // }
    columnDefs.unshift({
        headerName: "",
        valueGetter: "node.rowIndex + 1",
        flex: null,//不配置的话，默认走defaultColDef中的flex:1的话，宽度不生效
        width: 50,
        minWidth: 50,
        contextMenuItems: [],
        mainMenuItems: [],
        // pinned: 'left',
        suppressMovable: true,
        suppressHeaderMenuButton: true,
        suppressHeaderContextMenu: true,
        suppressFloatingFilterButton: true,
        resizable: true,
        sortable: false
    });

    // 使用闭包把 table 参数传递给事件处理函数
    const onRowValueChangedRaw = (event: any) => {
        onRowValueChanged(event, table);
    };
    const onCellValueChangedRaw = (event: any) => {
        onCellValueChanged(event, table);
    };

    var needToValiTable = table.verifications && table.verifications.length > 0;
    var columnFieldNames = map(columnDefs, "field");
    var pageSize = 100000;
    // 初始化网格配置
    let gridOptions: any = {
        columnDefs: columnDefs,
        dataTypeDefinitions: dataTypeDefinitions,
        rowClassRules: {
            'ag-grid-verification-errors-row': function (params) {
                if (!params.data) {
                    return false;
                }
                const allGridColumns = params.api.getAllGridColumns();
                const colDefs = keyBy(map(allGridColumns, "colDef"), "field");
                var fieldsVerificationErrors = getFieldsVerificationErrors(params.data, colDefs);
                var tableVerificationErrors = getTableVerificationErrors(params.data, table.verifications);
                const verificationErrors = union(fieldsVerificationErrors, tableVerificationErrors);
                params.data.__verificationErrors = verificationErrors;

                const hasVerificationErrors = params.data.__verificationErrors && params.data.__verificationErrors.length;
                const isFormulaError = params.data.__formulaErrors && params.data.__formulaErrors.length;
                return hasVerificationErrors || isFormulaError;
            }
        },
        rowData: null, // 初始为空，通过 API 动态加载
        rowModelType: 'serverSide',
        pagination: false,
        paginationPageSizeSelector: false,
        paginationPageSize: pageSize,
        cacheBlockSize: pageSize,
        // editType: 'fullRow',
        cellSelection: {
            handle: {
                mode: 'range',
            }
        },
        stopEditingWhenCellsLoseFocus: true,
        // onRowValueChanged: isReadonly ? null : onRowValueChangedRaw,
        onCellValueChanged: isReadonly ? null : onCellValueChangedRaw,
        onDragStopped: isAdmin ? onDragStopped : null,
        onColumnMoved: isAdmin ? onColumnMoved : null,
        defaultColDef: {
            flex: 1,
            minWidth: 100,
            resizable: true
        },
        getRowId: function (params) { return params.data._id; },
        selectionColumnDef: {
            pinned: 'left'
        },
        rowSelection: isReadonly ? null : {
            mode: "multiRow",
            selectAll: "all",
            checkboxes: true,
            headerCheckbox: true
        },
        // 勾选框列单独在columnDefs中定义后，rowSelection定义为上面的对象格式会多显示一列勾选框列
        // rowSelection: isReadonly ? null : "multiple",
        suppressRowClickSelection: true,
        onStoreUpdated: function (event) {
            var rowCount = event.api.getDisplayedRowCount();
            console.log('onStoreUpdated:', rowCount);
            // getRows 初始加载数据，过滤数据，列排序等，gridApi.applyServerSideTransaction 新建记录、删除记录都会触发
            // dispatchEvent("setTotalCount", {
            //     "totalCount": rowCount
            // });
        },
        defaultExcelExportParams: {
            fileName: tableLabel,
            columnKeys: columnFieldNames
        },
        defaultCsvExportParams: {
            fileName: tableLabel,
            columnKeys: columnFieldNames
        },
        serverSideDatasource: getServerSideDatasource(tableId)
    };

    if (needToValiTable) {
        // 用户有数据编辑权限时，默认使用单元格编辑，即 onCellValueChanged 属性有值
        // 如果 tables 中存在校验规则，把编辑模式转为行编辑，不使用单元格编辑模式，即把 onCellValueChanged 换成 onRowValueChanged
        if (gridOptions.onCellValueChanged) {
            gridOptions.editType = 'fullRow';
            gridOptions.onRowValueChanged = onRowValueChangedRaw;
            delete gridOptions.onCellValueChanged;
        }
    }

    // gridOptions = Object.assign({}, config, gridOptions);
    console.log("amis agGrid gridOptions:", gridOptions);
    return gridOptions;
}

export async function getTablesGridSchema(
    tableId: string,
    mode: string, //edit/read/admin
    ctx = {}
) {
    const meta = await getMeta(tableId);
    const gridOptions = getGridOptions(meta, mode);

    const amisSchema = {
        "type": "ag-grid",
        "dsType": "api",
        "className": "b6-tables-ag-grid h-96 ag-theme-quartz",
        "config": gridOptions
    };
    return {
        meta,
        amisSchema,
    };
}