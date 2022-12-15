
  /*
 * @Author: baozhoutao@steedos.com
 * @Date: 2022-09-01 14:44:57
 * @LastEditors: baozhoutao@steedos.com
 * @LastEditTime: 2022-12-15 19:03:19
 * @Description: 
 */

export const AmisGlobalHeader = async (props) => {
    const { className = '', data, logoutScript = "" } = props;
    
    let  avatarSrc = null;

    if(data.context?.user?.avatar){
        avatarSrc = `${data.context.rootUrl || ""}/avatar/${data.context.user.userId}?w=220&h=200&fs=160&avatar=${data.context.user.avatar}`;
    }

    return {
        "type": "wrapper",
        "id": "u:9c3d279be31a",
        "className": `steedos-global-header ${className}`,
        "size": "xs",
        "body": [
          {
            "type": "button",
            "id": "u:267a7e84a89d",
            "onEvent": {
              "click": {
                "actions": [
                  {
                    "componentId": "",
                    "args": {
                      "url": "https://www.steedos.com/docs"
                    },
                    "actionType": "url"
                  }
                ]
              }
            },
            "body": [
              {
                "type": "steedos-icon",
                "category": "utility",
                "name": "help",
                "colorVariant": "default",
                "id": "u:afc3a08e8cf3",
                "className": "slds-button_icon slds-global-header__icon"
              }
            ],
            "label": "帮助"
          },
          {
            "type": "button",
            "onEvent": {
              "click": {
                "actions": [
                  {
                    "componentId": "",
                    "args": {
                      "url": "/app/admin"
                    },
                    "actionType": "url"
                  }
                ]
              }
            },
            "id": "u:b5d0ab3a32b5",
            "body": [
              {
                "type": "steedos-icon",
                "category": "utility",
                "name": "setup",
                "colorVariant": "default",
                "id": "u:793a86f8a9e4",
                "className": "slds-button_icon slds-global-header__icon"
              }
            ],
            "label": "设置"
          },
          {
            "type": "steedos-dropdown",
            "placement": "bottomRight",
            "trigger": [
              "click"
            ],
            "body": [
              {
                "type": "steedos-icon",
                "category": "utility",
                "name": "notification",
                "colorVariant": "default",
                "id": "u:00e16db9edeb",
                "className": "slds-button_icon slds-global-header__icon"
              }
            ],
            "overlay": [
                {
                    "type": "service",
                    "body": [
                        {
                            "type": "wrapper",
                            "body": [
                              {
                                "type": "tpl",
                                "tpl": "<p>通知</p>",
                                "inline": false,
                                "id": "u:0b4404270d4b"
                              }
                            ],
                            "className": "border-0 border-b text-base\t",
                            "id": "u:ad394b5f49f6",
                            "size": "sm"
                          },
                        {
                            "type": "each",
                            className: "overflow-auto max-h-96",
                            "name": "notifications",
                            "items": {
                              "type": "tpl",
                              "tpl": "<div class='flex items-center p-4 hover:bg-sky-50'><img src='<%=data.context.rootUrl + `/avatar/` + data.from%>' alt='' class='h-10 w-10 flex-none rounded-full'><div class='ml-4 flex-auto'><div class='font-medium'><%=data.name%></div><div class='mt-1 text-slate-700'><%=data.body%></div><div class='mt-1 text-slate-700'><%=moment(data.created).fromNow()%><abbr class='slds-text-link slds-m-horizontal_xxx-small <%=data.is_read ? 'hidden' : ''%>' title='unread'>●</abbr></div></div></div>",
                              "id": "u:07ece657c7b7"
                            },
                            "id": "u:18da41dab9ca"
                        },
                        {
                            "type": "button",
                            "label": "全部标记为已读",
                            "id": "u:5530f3779e3a",
                            "block": true,
                            "size": "md",
                            "onEvent": {
                              "click": {
                                "actions": [
                                  {
                                    "componentId": "",
                                    "args": {
                                      "api": {
                                        "url": "${context.rootUrl}/api/v4/notifications/all/markReadAll",
                                        "method": "post",
                                        "headers": {
                                          "Authorization": "Bearer ${context.tenantId},${context.authToken}"
                                        }
                                      },
                                      "messages": {
                                        "success": "已全部标记为已读"
                                      }
                                    },
                                    "actionType": "ajax"
                                  }
                                ],
                                "weight": 0
                              }
                            }
                          }
                    ],
                    "id": "u:aba521eed5b7",
                    "messages": {
                    },
                    "api": {
                      "method": "post",
                      "url": "${context.rootUrl}/graphql",
                      "data": {
                        "&": "$$",
                        "context": "${context}",
                        "userId": "${context.userId}"
                      },
                      "dataType": "json",
                      "requestAdaptor": "const { userId } = api.data;\napi.data = {\n    query: `{\n        notifications(filters: [\"owner\",\"=\",\"${userId}\"], sort: \"created desc,name\", top : 10){\n          _id,name,body,related_to,related_name,url,owner,is_read,from,created\n        },\n        unReadCount: notifications__count(filters: [[\"owner\",\"=\",\"${userId}\"], [\"is_read\", \"!=\", true]])\n    }`\n}",
                      "headers": {
                        "Authorization": "Bearer ${context.tenantId},${context.authToken}"
                      },
                      "adaptor": "console.log(payload); return payload.data"
                    },
                    "interval": 30000,
                    "silentPolling": true
                  }
            ],
            "id": "u:857e8161c96b",
            "className": "antd-Action",
            "open": false
          },
          {
            "type": "steedos-dropdown",
            "placement": "bottomRight",
            "trigger": [
              "click"
            ],
            "body": [
              {
                "type": "avatar",
                "src": avatarSrc,
                "icon": "fa fa-user",
                "id": "u:033218742221",
                "style": {
                    "background": "rgb(59 130 246 / 0.5)",
                    "color": "#FFFFFF"
                },
                size: 30
              }
            ],
            "overlay": [
              {
                "type": "wrapper",
                "className": "bg-white",
                "body": [
                  {
                    "type": "avatar",
                    "src": avatarSrc,
                    "icon": "fa fa-user",
                    "id": "u:033218742221",
                    "style": {
                        "background": "rgb(59 130 246 / 0.5)",
                        "color": "#FFFFFF"
                    },
                  },
                  {
                    "type": "tpl",
                    className: "block",
                    "tpl": "${context.user.name}",
                    "inline": true,
                  },
                  {
                    "type": "tpl",
                    className: "block",
                    "tpl": "${context.user.email}",
                    "inline": true,
                  },
                  {
                    "type": "button",
                    "label": "个人资料",
                    "onEvent": {
                      "click": {
                        "actions": [
                            {
                                "args": {
                                  "url": "/app/admin/space_users/view/${context.user.spaceUserId}",
                                  "blank": false
                                },
                                "actionType": "link"
                              }
                        ]
                      }
                    },
                    "id": "u:1e6c26ff8721",
                    "block": true,
                    "level": "link"
                  },
                  {
                    "type": "button",
                    "label": "注销",
                    "onEvent": {
                      "click": {
                        "actions": [
                            {
                                "componentId": "",
                                "args": {},
                                "actionType": "custom",
                                "script": logoutScript
                              }
                        ]
                      }
                    },
                    "id": "u:0ab9ad5a8503",
                    "block": true,
                    "level": "link"
                  },
                  {
                    "type": "button",
                    "label": "关于",
                    "onEvent": {
                      "click": {
                        "actions": [
                            {
                                "args": {
                                  "url": "/app/admin/page/creator_about",
                                  "blank": false
                                },
                                "actionType": "link"
                              }
                        ]
                      }
                    },
                    "id": "u:1e6c26ff8721",
                    "block": true,
                    "level": "link"
                  },
                  
                ],
                "id": "u:b90fbd8773aa"
              }
            ],
            "id": "u:7a8bead68a8c",
            "className": "antd-Action"
          }
        ]
      }
    
}