const config: any = {
  componentType: 'amisSchema', // amisSchema || react 
  group: "华炎魔方",
  componentName: "AmisRecordService",
  title: "记录服务",
  docUrl: "",
  screenshot: "",
  npm: {
    package: "@steedos-widgets/amis-object",
    version: "{{version}}",
    exportName: "AmisRecordService",
    main: "",
    destructuring: true,
    subName: ""
  },
  props: [
    {
      name: "objectApiName",
      propType: "string",
      description: '对象名称',
    },
    {
      name: "recordId",
      propType: "string",
      description: '记录Id',
    }
  ],
  preview: {
  },
  targets: ["steedos__RecordPage", "steedos__AppPage", "steedos__HomePage"],
  engines: ["amis"],
  // settings for amis.
  amis: {
    name: 'steedos-record-service',
    icon: "fa-fw fa fa-list-alt"
  }
};

export default {
  ...config,
  snippets: [
    {
      title: config.title,
      screenshot: "",
      schema: {
        componentName: config.componentName,
        props: config.preview
      }
    }
  ],
  amis: {
    render: {
      type: config.amis.name,
      usage: "renderer",
      weight: 1,
      framework: "react"
    },
    plugin: {
      rendererName: config.amis.name,
      $schema: '/schemas/UnkownSchema.json',
      name: config.title,
      description: config.title,
      tags: [config.group],
      order: -9999,
      icon: config.amis.icon,
      scaffold: {
        type: config.amis.name,
        body: [],// 容器类字段
        label: config.title,
        objectApiName: "${objectName}",
        recordId: "${recordId}"
      },
      regions: [
        {
          key: 'body',
          label: '内容区'
        }
      ],
      previewSchema: {
        type: config.amis.name,
        objectApiName: 'space_users'
      },
      panelTitle: "设置",
      // panelControls: [
      //   {
      //     "type": "select",
      //     "label": "对象",
      //     "name": "objectApiName",
      //     "searchable": true,
      //     "multiple": false,
      //     "source": {
      //       "method": "get",
      //       "url": "/service/api/amis-design/objects",
      //       "requestAdaptor": "api.url = Builder.settings.rootUrl  + api.url; if(!api.headers){api.headers = {}};api.headers.Authorization='Bearer ' + Builder.settings.tenantId + ',' + Builder.settings.authToken  ;return api;",
      //       "adaptor": `
      //         let data = payload.data;
      //         payload.unshift({
      //           label: "当前对象",
      //           name: "\${objectName}"
      //         });
      //         return payload;
      //       `
      //     },
      //     "labelField": "label",
      //     "valueField": "name",
      //     "menuTpl": ""
      //   },
      // 这里不可以放开右侧面板recordId属性，因为会自动设置其值为固定的id值，造成bug，见：https://github.com/steedos/steedos-platform/issues/6846
      //   {
      //     type: "input-text",
      //     name: "recordId",
      //     label: "记录ID"
      //   }
      // ]
    }
  }
};
