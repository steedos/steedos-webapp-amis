
const config: any = {
  group: "华炎魔方-原子组件",
  componentName: "AmisComments",
  title: "Comments",
  docUrl: "",
  screenshot: "",
  npm: {
    package: "@steedos-widgets/liveblocks",
    version: "{{version}}",
    exportName: "AmisComments",
    main: "",
    destructuring: true,
    subName: ""
  },
  props: [
  ],
  preview: {
  },
  targets: ["steedos__RecordPage", "steedos__AppPage", "steedos__HomePage"],
  engines: ["amis"],
  // settings for amis.
  amis: {
    name: 'rooms-comments',
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
      usage: "renderer",//使用 renderer 会无法监听到onEvent中配置的事件
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
        className: "m-2 flex flex-col gap-y-2",
      },
      previewSchema: {
        type: config.amis.name,
      },
      panelTitle: "设置",
      panelControls: [
        {
          type: "text",
          name: "baseUrl",
          label: "Base URL",
          value: "m-2 flex flex-col gap-y-2"
        },
        {
          type: "text",
          name: "roomId",
          label: "Room Id",
          value: "m-2 flex flex-col gap-y-2"
        },
        {
          type: "text",
          name: "className",
          label: "CSS类名",
          value: "m-2 flex flex-col gap-y-2"
        },
        {
          type: "editor",
          "language": "json",
          name: "config",
          label: "配置",   
          pipeOut: (value) => {
            try {
              return value ? JSON.parse(value) : null;
            } catch (e) {
            }
            return value;
          }
        },
        {
          type: "editor",
          "language": "javascript",
          name: "dataFilter",
          label: "数据加工",
          description: "如果后端没有直接返回配置，可以自己写一段函数来包装。\
          签名：(config, env, data) => config \
          "
        },
      ],
      events: [{
        
      }],
    },
  }
};
