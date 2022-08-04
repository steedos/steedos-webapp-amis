import {Modal, Drawer} from './modal'
import { Form } from '@/components/object/Form'
import { Button, Space} from 'antd';
export const SObject = {
    //TODO 清理router参数传递
    newRecord: (props)=>{
        const { appId, name, title, objectName, recordId, type, options, router, refId, data } = props;
        if(type === 'modal'){
            Modal(Object.assign({
                name: name,
                title: title,
                destroyOnClose: true,
                maskClosable: false,
                keyboard: false, // 禁止 esc 关闭
                // footer: null,
                cancelText: '取消',
                okText: '确定',
                onOk: ()=>{
                    const scope = SteedosUI.getRef(SteedosUI.getRefId({type: `form`, appId: appId, name: objectName}));
                    const form = scope.getComponentByName(`page_edit_${recordId}.form_edit_${recordId}`);
                    form.handleAction({}, { type: "submit" }).then((data)=>{
                        if(data){
                            SteedosUI.getRef(name).close();
                            if(refId){
                                SteedosUI.getRef(refId).getComponentById(`listview_${objectName}`).handleAction({}, { actionType: "reload"})
                            }
                        }
                    })
                },
                onCancel: ()=>{
                    SteedosUI.getRef(name).close();
                    SteedosUI.getRef(refId).getComponentById(`listview_${objectName}`).handleAction({}, { actionType: "reload"})
                },
                bodyStyle: {padding: "0px", paddingTop: "12px"},
                children: <Form appId={appId} objectName={objectName} recordId={recordId} data={data}></Form>
            }, options?.props));
        }else if(type === 'drawer'){
            SteedosUI.Drawer(Object.assign({
                name: name,
                title: title,
                destroyOnClose: true,
                maskClosable: false,
                footer: null,
                bodyStyle: {padding: "0px", paddingTop: "12px"},
                children: <Form appId={appId} objectName={objectName} recordId={recordId} data={data}></Form>,
                mask: false,
                size: 'large',
                style: null,
                extra: (
                <Space>
                    <Button onClick={()=>{
                        SteedosUI.getRef(name).close();
                        SteedosUI.getRef(refId).getComponentById(`listview_${objectName}`).handleAction({}, { actionType: "reload"})
                    }}>取消</Button>
                    <Button type='primary' onClick={()=>{
                        const scope = SteedosUI.getRef(SteedosUI.getRefId({type: `form`, appId: appId, name: objectName}));
                        const form = scope.getComponentByName(`page_edit_${recordId}.form_edit_${recordId}`);
                        form.handleAction({}, { type: "submit" }).then((data)=>{
                            if(data){
                                SteedosUI.getRef(name).close();
                                if(refId){
                                    SteedosUI.getRef(refId).getComponentById(`listview_${objectName}`).handleAction({}, { actionType: "reload"})
                                }
                            }
                        })
                    }}>确认</Button>
                </Space>)
            }, options?.props))
        }else{
            router.push(`/app/${appId}/${objectName}/view/new`)
        }
    }
}