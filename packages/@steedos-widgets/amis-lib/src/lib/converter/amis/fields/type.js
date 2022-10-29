/*
 * @Author: baozhoutao@steedos.com
 * @Date: 2022-10-28 14:52:55
 * @LastEditors: baozhoutao@steedos.com
 * @LastEditTime: 2022-10-28 14:53:02
 * @Description: 
 */
const AmisFormInputs = [
    'text',
    'date',
    'file',
    "avatar",
    'image',
    'datetime',
    'time',
    'number',
    'currency',
    'percent',
    'password',
    'url',
    'email'
]

export function getAmisStaticFieldType(type, readonly, options){
    if(!readonly){
        if(_.includes(AmisFormInputs, type)){
            return `input-${type}`;
        }
        return type;
    }
    if(_.includes(['text','image'], type)){
        if('image' === type && options && options.multiple){
            return `static-images`;
        }
        return `static-${type}`;
    }else{
        return 'static';
    }
};