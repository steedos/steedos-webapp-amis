"use strict";
exports.id = 125;
exports.ids = [125];
exports.modules = {

/***/ 5125:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "B": () => (/* binding */ RecordRelatedListButtons)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_buttons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4413);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_object_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2767);
/* harmony import */ var _components_AmisRender__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1095);
/* harmony import */ var _lib_steedos_client__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8282);

/*
 * @Author: baozhoutao@steedos.com
 * @Date: 2022-08-01 13:32:49
 * @LastEditors: baozhoutao@steedos.com
 * @LastEditTime: 2022-08-25 17:05:51
 * @Description: 
 */ 






function RecordRelatedListButtons(props) {
    const { app_id , tab_id , schema , refId , foreign_key , record_id , object_name , masterObjectName , inMore , formFactor  } = props;
    const { 0: buttons , 1: setButtons  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        if (schema && schema.uiSchema) {
            setButtons((0,_lib_buttons__WEBPACK_IMPORTED_MODULE_1__/* .getListViewButtons */ .Iv)(schema.uiSchema, {
                app_id: app_id,
                tab_id: tab_id,
                router: router
            }));
        }
    }, [
        schema
    ]);
    const auth = (0,_lib_steedos_client__WEBPACK_IMPORTED_MODULE_6__/* .getSteedosAuth */ .Z0)();
    const uploadBtnSchema = {
        type: "page",
        bodyClassName: "p-0",
        body: [
            {
                "type": "form",
                "title": "\u8868\u5355",
                "body": [
                    {
                        "type": "input-file",
                        "label": "",
                        "name": "file",
                        "id": "u:a58d02614e04",
                        "btnLabel": "\u4E0A\u4F20",
                        "btnClassName": "m-0",
                        "multiple": false,
                        "maxLength": 10,
                        "submitType": "asUpload",
                        "uploadType": "fileReceptor",
                        "proxy": false,
                        "drag": false,
                        "autoUpload": true,
                        "useChunk": false,
                        "joinValues": false,
                        "extractValue": false,
                        "valueField": "version_id",
                        "receiver": {
                            "url": "${context.rootUrl}/s3",
                            headers: {
                                Authorization: "Bearer ${context.tenantId},${context.authToken}"
                            },
                            "method": "post",
                            "messages": {},
                            "dataType": "form-data",
                            "requestAdaptor": `
                        api.data.append('record_id', '${record_id}');
                        api.data.append('object_name', '${masterObjectName}');
                        api.data.append('space', '${auth.spaceId}');
                        api.data.append('owner', '${auth.userId}');
                        api.data.append('owner_name', '${auth.name}');
                        return api;
                      `
                        },
                        "onEvent": {
                            "success": {
                                "weight": 0,
                                "actions": [
                                    {
                                        "componentId": "u:5f901c0b917b",
                                        "args": {},
                                        "actionType": "clear"
                                    },
                                    {
                                        "componentId": "",
                                        "args": {
                                            "msgType": "success",
                                            "position": "top-right",
                                            "closeButton": true,
                                            "showIcon": true,
                                            "msg": "\u4E0A\u4F20\u6210\u529F"
                                        },
                                        "actionType": "toast"
                                    },
                                    {
                                        "componentId": "",
                                        "args": {},
                                        "actionType": "custom",
                                        "script": `
                                SteedosUI.getRef('${refId}').getComponentByName('page.listview_${object_name}').handleAction({}, { actionType: "reload"})
                            `
                                    }
                                ]
                            }
                        }
                    }
                ],
                "id": "u:5f901c0b917b",
                "wrapWithPanel": false
            }
        ],
        regions: [
            "body"
        ],
        data: {}
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: schema?.uiSchema && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                schema?.uiSchema?.permissions?.allowCreate && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                    children: [
                        schema.uiSchema.name != "cms_files" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                            onClick: (event)=>{
                                _lib_buttons__WEBPACK_IMPORTED_MODULE_1__/* .standardButtonsTodo.standard_new.call */ .QU.standard_new.call({}, event, {
                                    listViewId: refId,
                                    appId: app_id,
                                    uiSchema: schema.uiSchema,
                                    formFactor: formFactor,
                                    router: router,
                                    data: {
                                        data: {
                                            [foreign_key]: record_id
                                        }
                                    }
                                });
                            },
                            className: inMore ? "flex w-full items-center border-0 px-2 py-1" : "slds-button slds-button_neutral",
                            children: "\u65B0\u5EFA"
                        }),
                        schema.uiSchema.name === "cms_files" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_AmisRender__WEBPACK_IMPORTED_MODULE_5__/* .AmisRender */ .k, {
                            id: SteedosUI.getRefId({
                                type: "button",
                                appId: app_id,
                                name: "upload"
                            }),
                            schema: uploadBtnSchema,
                            router: router,
                            className: "inline-block"
                        })
                    ]
                }),
                buttons?.map((button)=>{
                    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_object_Button__WEBPACK_IMPORTED_MODULE_4__/* .Button */ .z, {
                        button: button,
                        inMore: inMore,
                        data: {
                            app_id: app_id,
                            tab_id: tab_id,
                            object_name: schema.uiSchema.name,
                            dataComponentId: SteedosUI.getRefId({
                                type: "listview",
                                appId: app_id,
                                name: schema.uiSchema.name
                            })
                        },
                        className: inMore ? "flex items-center border-0 px-2 py-1" : "",
                        scopeClassName: "inline-block"
                    }, button.name);
                })
            ]
        })
    });
}


/***/ })

};
;