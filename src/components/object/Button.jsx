/*
 * @Author: baozhoutao@steedos.com
 * @Date: 2022-07-27 17:34:25
 * @LastEditors: baozhoutao@steedos.com
 * @LastEditTime: 2022-08-25 18:18:15
 * @Description: 
 */
import { AmisRender } from "@/components/AmisRender";
import { execute } from "@/lib/buttons";
import { useRouter } from 'next/router';
import { isString } from "lodash";
export function Button(props) {
  const router = useRouter()
  const { button, data, className, scopeClassName, inMore } = props;
  const { dataComponentId } = data;
  const buttonClick = () => {
    return execute(button, Object.assign({}, data , {scope: SteedosUI.getRef(dataComponentId)})); //TODO 处理参数
  };

  if (button.type === "amis_action") {
    const schema = {
        type: "service",
        bodyClassName: 'p-0',
        body: [
            {
                type: "button",
                label: button.label,
                className: `${ inMore ? 'flex w-full items-center border-0 px-2 py-1' : 'bg-white' } ${className ? className : ''}`,
                confirmText: button.confirmText ? button.confirmText : null,
                onEvent: {
                  click: {
                    actions: isString(button.amis_actions) ? JSON.parse(button.amis_actions) : button.amis_actions,
                  },
                }
            }
        ],
        regions: [
          "body"
        ],
        data: {
            ...data
        }
      };
    console.log(`schema`, schema)
    return (
      <AmisRender
        id={SteedosUI.getRefId({type: 'button', appId: data.app_id, name: button.name})}
        schema={schema}
        router={router}
        className={scopeClassName}
      ></AmisRender>
    );
  } else {
    return (
      <button
        onClick={buttonClick}
        className={`antd-Button antd-Button--default ${className ? className : ''}`}
      >
        {button.label}
      </button>
    );
  }
}
