"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[83],{8930:function(e,t,n){n.d(t,{L:function(){return a}});var i=n(5893),o=n(7294);function a(e){var t=e.date,n=(0,o.useState)(),a=n[0],s=n[1],r=(0,o.useState)(""),l=r[0],c=r[1],d=function(e){return amisRequire("moment")(e).fromNow()};return(0,o.useEffect)((function(){a&&clearInterval(a),c(d(t)),s(setInterval((function(){c(d(t))}),6e4))}),[t]),(0,i.jsx)(i.Fragment,{children:l})}},2767:function(e,t,n){n.d(t,{z:function(){return l}});var i=n(6042),o=n(5893),a=n(3796),s=n(4413),r=n(1163);function l(e){var t=(0,r.useRouter)(),n=e.button,l=e.data,c=e.className,d=e.scopeClassName,u=e.inMore,p=l.dataComponentId;if("amis_action"===n.type){var f={type:"service",bodyClassName:"p-0",body:[{type:"button",label:n.label,className:"".concat(u?"flex w-full items-center border-0 px-2 py-1":"bg-white"," ").concat(c||""),onEvent:{click:{actions:JSON.parse(n.amis_actions)}}}],regions:["body"],data:(0,i.Z)({},l)};return(0,o.jsx)(a.k,{id:SteedosUI.getRefId({type:"button",appId:l.app_id,name:n.name}),schema:f,router:t,className:d})}return(0,o.jsx)("button",{onClick:function(){return(0,s.ht)(n,Object.assign({},l,{scope:SteedosUI.getRef(p)}))},className:"antd-Button antd-Button--default ".concat(c||""),children:n.label})}},5083:function(e,t,n){n.d(t,{z:function(){return g}});var i=n(5893),o=n(8876),a=n(1355),s=n(1013),r=n(8057),l=n(6486),c=n(1163),d=n(7294),u=n(4413),p=n(2767);function f(e){var t,n,o,a,s=e.app_id,r=e.tab_id,l=e.schema,f=e.formFactor,m=(0,d.useState)(null),v=m[0],b=m[1],h=(0,c.useRouter)();return(0,d.useEffect)((function(){l&&l.uiSchema&&b((0,u.Iv)(l.uiSchema,{app_id:s,tab_id:r,router:h}))}),[l]),(0,i.jsx)(i.Fragment,{children:(null===l||void 0===l?void 0:l.uiSchema)&&(0,i.jsxs)(i.Fragment,{children:[(null===l||void 0===l||null===(t=l.uiSchema)||void 0===t||null===(n=t.permissions)||void 0===n?void 0:n.allowCreate)&&(0,i.jsx)("button",{onClick:function(e){var t,n=SteedosUI.getRefId({type:"listview",appId:s,name:null===l||void 0===l||null===(t=l.uiSchema)||void 0===t?void 0:t.name});u.QU.standard_new.call({},e,{listViewId:n,appId:s,uiSchema:l.uiSchema,formFactor:f,router:h})},className:"antd-Button antd-Button--default",children:"\u65b0\u5efa"}),null===v||void 0===v?void 0:v.map((function(e){return(0,i.jsx)(p.z,{button:e,data:{app_id:s,tab_id:r,object_name:l.uiSchema.name,dataComponentId:SteedosUI.getRefId({type:"listview",appId:s,name:l.uiSchema.name})},scopeClassName:"inline-block"},e.name)})),(null===l||void 0===l||null===(o=l.uiSchema)||void 0===o||null===(a=o.permissions)||void 0===a?void 0:a.allowDelete)&&(0,i.jsx)("button",{onClick:function(e){var t,n=SteedosUI.getRefId({type:"listview",appId:s,name:null===l||void 0===l||null===(t=l.uiSchema)||void 0===t?void 0:t.name});u.QU.batch_delete.call({},e,{listViewId:n,uiSchema:l.uiSchema})},className:"antd-Button antd-Button--default",children:"\u5220\u9664"})]})})}var m=n(8930),v=n(3796),b=n(6195);function h(e){var t=e.schema,n=e.listViewId,o=e.appId,a=(e.onClose,(0,d.useState)((0,l.map)((0,l.filter)((0,l.values)(t.uiSchema.fields),(function(e){return e.searchable})),"name"))),s=a[0],r=a[1],u=(0,d.useState)(),p=u[0],f=u[1],m=(0,c.useRouter)();(0,d.useEffect)((function(){(0,l.isEmpty)(s)||(0,b.mp)((0,l.sortBy)((0,l.compact)((0,l.map)(s,(function(e){return t.uiSchema.fields[e]}))),"sort_no")).then((function(e){f(e)}))}),[s]);return(0,i.jsx)("div",{className:"mt-4 border-gray slds-grid slds-grid_vertical slds-nowrap ",children:(0,i.jsxs)("div",{className:"slds-filters",children:[(0,i.jsx)("div",{className:"slds-filters__body p-0",children:p&&(0,i.jsx)(v.k,{id:SteedosUI.getRefId({type:"fieldsSearch",appId:o,name:t.uiSchema.name}),schema:p,router:m})}),(0,i.jsx)("div",{className:"slds-filters__footer slds-grid slds-shrink-none flex justify-between p-0",children:(0,i.jsxs)("div",{className:"space-x-4",children:[(0,i.jsxs)("button",{className:"slds-button slds-button_neutral",type:"button",onClick:function(e){var i=SteedosUI.getRef(SteedosUI.getRefId({type:"fieldsSearch",appId:o,name:t.uiSchema.name})).getComponentByName("listview-filter-form").getValues();SteedosUI.getRef(n).getComponentByName("page.listview_".concat(t.uiSchema.name)).handleFilterSubmit(i)},children:[(0,i.jsx)("svg",{className:"slds-button__icon slds-button__icon_left","aria-hidden":"true",children:(0,i.jsx)("use",{xlinkHref:"/assets/icons/utility-sprite/svg/symbols.svg#search"})}),"\u641c\u7d22"]}),(0,i.jsx)("button",{className:"slds-button_reset slds-text-link slds-col_bump-left",type:"button",onClick:function(){return SteedosUI.Field.showFieldsTransfer(t.uiSchema.name,{fields:s},(function(e){r(e.fields)}),(function(){}))},children:"\u8bbe\u7f6e\u641c\u7d22\u9879"})]})})]})})}function g(e){var t,n,u,p,v,b=e.schema,g=e.onListviewChange,x=e.formFactor,y=(0,d.useState)(!1),S=y[0],_=y[1],R=(0,d.useState)(),w=R[0],I=R[1],j=(0,d.useState)(),N=j[0],O=j[1],C=(0,c.useRouter)(),k=C.query,T=k.app_id,U=k.tab_id,L=k.listview_id,E=b.uiSchema.list_views[L],F=SteedosUI.getRefId({type:"listview",appId:T,name:null===b||void 0===b||null===(t=b.uiSchema)||void 0===t?void 0:t.name});(0,d.useEffect)((function(){b&&window.addEventListener("message",(function(e){"listview.loaded"===e.data.type&&b&&setTimeout((function(){if(SteedosUI.getRef(F)&&SteedosUI.getRef(F).getComponentByName){var e=SteedosUI.getRef(F).getComponentByName("page.listview_".concat(b.uiSchema.name));I({count:e.props.data.count,dataUpdatedAt:e.props.dataUpdatedAt})}}),300)}))}),[b]);var P=function(e){SteedosUI.getRef(F).getComponentByName("page.listview_".concat(b.uiSchema.name)).handleAction({},{actionType:"reload"})};(0,d.useEffect)((function(){!(0,l.isEmpty)(L)&&(0,l.isFunction)(g)&&(O(null),g(E))}),[L]);return(0,i.jsxs)("div",{className:"slds-page-header bg-slate-50 shadow-none rounded-none border-none",children:[(0,i.jsxs)("div",{className:"slds-page-header__row",children:[(0,i.jsx)("div",{className:"slds-page-header__col-title",children:(0,i.jsxs)("div",{className:"slds-media",children:[(0,i.jsx)("div",{className:"slds-media__figure",children:(0,i.jsx)("span",{className:"slds-icon_container slds-icon-standard-opportunity",children:(0,i.jsx)("svg",{className:"slds-icon slds-page-header__icon","aria-hidden":"true",children:(0,i.jsx)("use",{xlinkHref:"/assets/icons/standard-sprite/svg/symbols.svg#".concat(b.uiSchema.icon)})})})}),(0,i.jsx)("div",{className:"slds-media__body",children:(0,i.jsx)("div",{className:"slds-page-header__name",children:(0,i.jsx)("div",{className:"slds-page-header__name-title",children:(0,i.jsxs)("div",{children:[(0,i.jsx)("span",{children:null===b||void 0===b||null===(n=b.uiSchema)||void 0===n?void 0:n.label}),(0,i.jsx)(o.R,{value:E,onChange:function(e){C.push("/app/".concat(T,"/").concat(U,"/grid/").concat(e.name))},children:(0,i.jsxs)("div",{className:"relative w-[1/2]",children:[(0,i.jsxs)(o.R.Button,{className:"relative w-full cursor-default pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm",children:[(0,i.jsx)("span",{className:"slds-page-header__title slds-truncate",children:(null===E||void 0===E?void 0:E.label)||(null===(p=null===b||void 0===b||null===(u=b.uiSchema)||void 0===u?void 0:u.list_views.all)||void 0===p?void 0:p.label)}),(0,i.jsx)("span",{className:"pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2",children:(0,i.jsx)(s.Z,{className:"h-5 w-5 text-gray-400","aria-hidden":"true"})})]}),(0,i.jsx)(a.u,{as:d.Fragment,leave:"transition ease-in duration-100",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:(0,i.jsx)(o.R.Options,{className:"absolute z-50 mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm",children:(0,l.values)(null===b||void 0===b||null===(v=b.uiSchema)||void 0===v?void 0:v.list_views).map((function(e,t){return(0,i.jsxs)(o.R.Option,{value:e,className:function(e){var t=e.active;return"relative cursor-default select-none py-2 pl-10 pr-4 ".concat(t?"bg-sky-100 text-sky-900":"text-gray-900")},children:[(0,i.jsx)("span",{className:"block truncate ".concat(((null===E||void 0===E?void 0:E.name)?E.name:"all")===e.name?"font-medium":"font-normal"),children:e.label}),((null===E||void 0===E?void 0:E.name)?E.name:"all")===e.name?(0,i.jsx)("span",{className:"absolute inset-y-0 left-0 flex items-center pl-3 text-sky-600",children:(0,i.jsx)(r.Z,{className:"h-5 w-5","aria-hidden":"true"})}):null]},t)}))})})]})})]})})})})]})}),(0,i.jsx)("div",{className:"slds-page-header__col-actions",children:(0,i.jsx)("div",{className:"slds-page-header__controls",children:(0,i.jsx)("div",{className:"slds-page-header__control space-x-1",children:(0,i.jsx)(f,{app_id:T,tab_id:U,schema:b,formFactor:x})})})})]}),(0,i.jsxs)("div",{className:"slds-page-header__row",children:[(0,i.jsx)("div",{className:"slds-page-header__col-meta",children:w&&(0,i.jsxs)("p",{className:"slds-page-header__meta-text mb-0",children:[w.count," \u9879 \u2022"," ",(0,i.jsx)(m.L,{date:w.dataUpdatedAt})]})}),(0,i.jsx)("div",{className:"slds-page-header__col-controls",children:(0,i.jsxs)("div",{className:"slds-page-header__controls",children:[(0,i.jsx)("div",{className:"slds-page-header__control",children:(0,i.jsxs)("button",{onClick:function(){_(!S)},className:"slds-button slds-button_icon slds-button_icon-border-filled",title:"Quick Search",children:[(0,i.jsx)("svg",{className:"slds-button__icon","aria-hidden":"true",children:(0,i.jsx)("use",{xlinkHref:"/assets/icons/utility-sprite/svg/symbols.svg#search"})}),(0,i.jsx)("span",{className:"slds-assistive-text",children:"Quick Search"})]})}),(0,i.jsx)("div",{className:"slds-page-header__control",children:(0,i.jsxs)("button",{className:"slds-button slds-button_icon slds-button_icon-border-filled",title:"Refresh List",onClick:P,children:[(0,i.jsx)("svg",{className:"slds-button__icon","aria-hidden":"true",children:(0,i.jsx)("use",{xlinkHref:"/assets/icons/utility-sprite/svg/symbols.svg#refresh"})}),(0,i.jsx)("span",{className:"slds-assistive-text",children:"Refresh List"})]})}),(0,i.jsx)("div",{className:"slds-page-header__control",children:(0,i.jsx)("ul",{className:"slds-button-group-list mb-0",children:(0,i.jsx)("li",{children:(0,i.jsxs)("button",{className:"slds-button slds-button_icon slds-button_icon-border-filled",onClick:function(){SteedosUI.ListView.showFilter(b.uiSchema.name,{listView:E,data:{filters:SteedosUI.ListView.getVisibleFilter(E,N)},onFilterChange:function(e){SteedosUI.getRef(F).updateProps({data:(0,l.defaultsDeep)({filter:SteedosUI.ListView.getQueryFilter(E,e)},b.amisSchema.data)},(function(){P(),O(e)})),setTimeout((function(){P(),O(e)}),300)}})},children:[(0,i.jsx)("svg",{className:"slds-button__icon","aria-hidden":"true",children:(0,i.jsx)("use",{xlinkHref:"/assets/icons/utility-sprite/svg/symbols.svg#filterList"})}),(0,i.jsx)("span",{className:"slds-assistive-text",children:"\u8fc7\u6ee4\u5668"}),!(0,l.isEmpty)(N)&&(0,i.jsx)("span",{className:"slds-notification-badge slds-incoming-notification slds-show-notification min-h-[0.5rem] min-w-[0.5rem]"})]})})})})]})})]}),(0,i.jsx)(a.u,{as:d.Fragment,show:S,leave:"transition ease-in duration-100",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:(0,i.jsx)("div",{className:"w-full",children:(0,i.jsx)(h,{schema:b,listViewId:F,onClose:function(){S&&(SteedosUI.getRef(F).getComponentByName("page.listview_".concat(b.uiSchema.name)).handleFilterReset(),_(!1))}})})})]})}},4413:function(e,t,n){n.d(t,{ht:function(){return v},Iv:function(){return p},vU:function(){return f},ud:function(){return m},QU:function(){return d}});var i=n(6486),o=n.n(i),a="__G_L_O_B_A_L__",s=function(e){var t;return"string"===typeof e?1===(t=e.split(".")).length?"#":(t.pop(),t.join(".")):"#"},r=function(e,t){return"#"!==t&&t?"string"===typeof t?i.get(e,t):void console.error("path has to be a string"):e||{}},l=n(7733),c=function(e,t){if(e._visible&&(o().startsWith(o().trim(e._visible),"function")?(window.eval("var fun = "+e._visible),e.visible=fun):function(e){var t,n,i;return"string"===typeof e&&(t=/^{{(.+)}}$/,n=/^{{(function.+)}}$/,i=/^{{(.+=>.+)}}$/,!("string"!==typeof e||!e.match(t)||e.match(n)||e.match(i)))}(e._visible)&&(e.visible=function(t){!function(e,t,n,i){var o,l,c,d,u,p=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{};if(void 0===t&&(t={}),d=s(n),c=r(t,d)||{},"string"!==typeof e)return e;l=e.substring(2,e.length-2),u="\n  var $user=".concat(JSON.stringify(p),";   return ")+l.replace(/\bformData\b/g,JSON.stringify(t).replace(/\bglobal\b/g,a)).replace(/\bglobal\b/g,JSON.stringify(i)).replace(new RegExp("\\b"+a+"\\b","g"),"global").replace(/rootValue/g,JSON.stringify(c));try{Function(u)()}catch(f){return o=f,console.log(o,e,n),e}}(e._visible,t.record,"#",{now:new Date},t.userSession)})),!o().isFunction(e.visible))return e.visible;try{return e.visible(t)}catch(n){}},d={standard_new:function(e,t){var n=t.appId,i=t.listViewId,o=t.uiSchema,a=t.formFactor,s=t.data,r=t.router,c=t.options,d=void 0===c?{}:c,u=l.Z.listView.newRecordMode;SteedosUI.Object.newRecord({onSubmitted:function(){SteedosUI.getRef(i).getComponentByName("page.listview_".concat(o.name)).handleAction({},{actionType:"reload"})},onCancel:function(){SteedosUI.getRef(i).getComponentByName("page.listview_".concat(o.name)).handleAction({},{actionType:"reload"})},appId:n,formFactor:a,name:SteedosUI.getRefId({type:"".concat(u,"-form")}),title:"\u65b0\u5efa ".concat(o.label),objectName:o.name,data:s,recordId:"new",type:u,options:d,router:r})},standard_edit:function(e,t){var n=l.Z.listView.newRecordMode,i=t.appId,o=t.recordId,a=t.uiSchema,s=t.formFactor,r=t.router,c=t.options,d=void 0===c?{}:c;SteedosUI.Object.editRecord({appId:i,name:SteedosUI.getRefId({type:"".concat(n,"-form")}),title:"\u7f16\u8f91 ".concat(a.label),objectName:a.name,recordId:o,type:n,options:d,router:r,formFactor:s,onSubmitted:function(){SteedosUI.getRef(SteedosUI.getRefId({type:"detail",appId:i,name:a.name})).getComponentById("detail_".concat(o)).reload()}})},standard_delete:function(e,t){},batch_delete:function(e,t){var n=t.listViewId,i=t.uiSchema,a=SteedosUI.getRef(n).getComponentByName("page.listview_".concat(i.name));o().isEmpty(a.props.store.toJSON().selectedItems)?a.handleAction({},{actionType:"toast",toast:{items:[{position:"top-right",body:"\u8bf7\u9009\u62e9\u8981\u5220\u9664\u7684\u9879"}]}}):a.handleBulkAction(a.props.store.toJSON().selectedItems,[],{},a.props.bulkActions[0])}},u=function(e,t){var n=e.permissions.disabled_actions,i=o().sortBy(o().values(e.actions),"sort");return o().has(e,"allow_customActions")&&(i=o().filter(i,(function(t){return o().include(e.allow_customActions,t.name)}))),o().has(e,"exclude_actions")&&(i=o().filter(i,(function(t){return!o().include(e.exclude_actions,t.name)}))),o().each(i,(function(e){t.isMobile&&["record","record_only"].indexOf(e.on)>-1&&"standard_edit"!=e.name&&("record_only"==e.on?e.on="record_only_more":e.on="record_more")})),t.isMobile&&["cms_files","cfs.files.filerecord"].indexOf(e.name)>-1&&o().map(i,(function(e){"standard_edit"===e.name&&(e.on="record_more"),"download"===e.name&&(e.on="record")})),o().filter(i,(function(e){return o().indexOf(n,e.name)<0}))},p=function(e,t){var n=u(e,t);return o().filter(n,(function(e){return"list"==e.on&&c(e,t)}))},f=function(e,t){var n=u(e,t);return o().filter(n,(function(e){return("record"==e.on||"record_only"==e.on)&&c(e,t)}))},m=function(e,t){var n=u(e,t);return o().filter(n,(function(e){return("record_more"==e.on||"record_only_more"==e.on)&&c(e,t)}))},v=function(e,t){if(e.todo)return o().isString(e.todo)&&o().startsWith(o().trim(e.todo),"function")&&(window.eval("var fun = "+e.todo),e.todo=fun),o().isFunction(e.todo)?e.todo.apply({},[t]):void 0}},8876:function(e,t,n){n.d(t,{R:function(){return Z}});var i=n(7294),o=n(4192),a=n(9946),s=n(6723),r=n(3855);function l(e,t){let[n,o]=(0,i.useState)(e),a=(0,r.E)(e);return(0,s.e)((()=>o(a.current)),[a,o,...t]),n}var c=n(3784),d=n(2351),u=n(2984),p=n(9362),f=n(1363),m=n(1497),v=n(4103),b=n(4575),h=n(6567),g=n(4157),x=n(292),y=n(6045);function S(e={},t=null,n=[]){for(let[i,o]of Object.entries(e))R(n,_(t,i),o);return n}function _(e,t){return e?e+"["+t+"]":t}function R(e,t,n){if(Array.isArray(n))for(let[i,o]of n.entries())R(e,_(t,i.toString()),o);else n instanceof Date?e.push([t,n.toISOString()]):"boolean"==typeof n?e.push([t,n?"1":"0"]):"string"==typeof n?e.push([t,n]):"number"==typeof n?e.push([t,`${n}`]):null==n?e.push([t,""]):S(n,t,e)}var w,I,j=n(5466),N=n(3781),O=((I=O||{})[I.Open=0]="Open",I[I.Closed=1]="Closed",I),C=(e=>(e[e.Single=0]="Single",e[e.Multi=1]="Multi",e))(C||{}),k=(e=>(e[e.Pointer=0]="Pointer",e[e.Other=1]="Other",e))(k||{}),T=((w=T||{})[w.OpenListbox=0]="OpenListbox",w[w.CloseListbox=1]="CloseListbox",w[w.SetDisabled=2]="SetDisabled",w[w.SetOrientation=3]="SetOrientation",w[w.GoToOption=4]="GoToOption",w[w.Search=5]="Search",w[w.ClearSearch=6]="ClearSearch",w[w.RegisterOption=7]="RegisterOption",w[w.UnregisterOption=8]="UnregisterOption",w);function U(e,t=(e=>e)){let n=null!==e.activeOptionIndex?e.options[e.activeOptionIndex]:null,i=(0,b.z2)(t(e.options.slice()),(e=>e.dataRef.current.domRef.current)),o=n?i.indexOf(n):null;return-1===o&&(o=null),{options:i,activeOptionIndex:o}}let L={1:e=>e.disabled||1===e.listboxState?e:{...e,activeOptionIndex:null,listboxState:1},0(e){if(e.disabled||0===e.listboxState)return e;let t=e.activeOptionIndex,{value:n,mode:i,compare:o}=e.propsRef.current,a=e.options.findIndex((e=>{let t=e.dataRef.current.value;return(0,u.E)(i,{1:()=>n.some((e=>o(e,t))),0:()=>o(n,t)})}));return-1!==a&&(t=a),{...e,listboxState:0,activeOptionIndex:t}},2:(e,t)=>e.disabled===t.disabled?e:{...e,disabled:t.disabled},3:(e,t)=>e.orientation===t.orientation?e:{...e,orientation:t.orientation},4(e,t){var n;if(e.disabled||1===e.listboxState)return e;let i=U(e),o=(0,m.d)(t,{resolveItems:()=>i.options,resolveActiveIndex:()=>i.activeOptionIndex,resolveId:e=>e.id,resolveDisabled:e=>e.dataRef.current.disabled});return{...e,...i,searchQuery:"",activeOptionIndex:o,activationTrigger:null!=(n=t.trigger)?n:1}},5:(e,t)=>{if(e.disabled||1===e.listboxState)return e;let n=""!==e.searchQuery?0:1,i=e.searchQuery+t.value.toLowerCase(),o=(null!==e.activeOptionIndex?e.options.slice(e.activeOptionIndex+n).concat(e.options.slice(0,e.activeOptionIndex+n)):e.options).find((e=>{var t;return!e.dataRef.current.disabled&&(null==(t=e.dataRef.current.textValue)?void 0:t.startsWith(i))})),a=o?e.options.indexOf(o):-1;return-1===a||a===e.activeOptionIndex?{...e,searchQuery:i}:{...e,searchQuery:i,activeOptionIndex:a,activationTrigger:1}},6:e=>e.disabled||1===e.listboxState||""===e.searchQuery?e:{...e,searchQuery:""},7:(e,t)=>{let n={id:t.id,dataRef:t.dataRef},i=U(e,(e=>[...e,n]));if(null===e.activeOptionIndex){let{value:o,mode:a,compare:s}=e.propsRef.current,r=t.dataRef.current.value;(0,u.E)(a,{1:()=>o.some((e=>s(e,r))),0:()=>s(o,r)})&&(i.activeOptionIndex=i.options.indexOf(n))}return{...e,...i}},8:(e,t)=>{let n=U(e,(e=>{let n=e.findIndex((e=>e.id===t.id));return-1!==n&&e.splice(n,1),e}));return{...e,...n,activationTrigger:1}}},E=(0,i.createContext)(null);function F(e){let t=(0,i.useContext)(E);if(null===t){let t=new Error(`<${e} /> is missing a parent <Listbox /> component.`);throw Error.captureStackTrace&&Error.captureStackTrace(t,F),t}return t}function P(e,t){return(0,u.E)(t.type,L,e,t)}E.displayName="ListboxContext";let D=i.Fragment,A=(0,d.yV)((function(e,t){let{value:n,name:o,onChange:a,disabled:r=!1,horizontal:l=!1,multiple:p=!1,...f}=e;const m=l?"horizontal":"vertical";let v=(0,c.T)(t),g=(0,i.useReducer)(P,{listboxState:1,propsRef:{current:{value:n,onChange:a,mode:p?1:0,compare:(0,N.z)(((e,t)=>e===t))}},labelRef:(0,i.createRef)(),buttonRef:(0,i.createRef)(),optionsRef:(0,i.createRef)(),disabled:r,orientation:m,options:[],searchQuery:"",activeOptionIndex:null,activationTrigger:1}),[{listboxState:_,propsRef:R,optionsRef:w,buttonRef:I},j]=g;R.current.value=n,R.current.mode=p?1:0,(0,s.e)((()=>{R.current.onChange=e=>(0,u.E)(R.current.mode,{0:()=>a(e),1(){let t=R.current.value.slice(),n=t.indexOf(e);return-1===n?t.push(e):t.splice(n,1),a(t)}})}),[a,R]),(0,s.e)((()=>j({type:2,disabled:r})),[r]),(0,s.e)((()=>j({type:3,orientation:m})),[m]),(0,x.O)([I,w],((e,t)=>{var n;j({type:1}),(0,b.sP)(t,b.tJ.Loose)||(e.preventDefault(),null==(n=I.current)||n.focus())}),0===_);let O=(0,i.useMemo)((()=>({open:0===_,disabled:r})),[_,r]),C={ref:v};return i.createElement(E.Provider,{value:g},i.createElement(h.up,{value:(0,u.E)(_,{0:h.ZM.Open,1:h.ZM.Closed})},null!=o&&null!=n&&S({[o]:n}).map((([e,t])=>i.createElement(y._,{features:y.A.Hidden,...(0,d.oA)({key:e,as:"input",type:"hidden",hidden:!0,readOnly:!0,name:e,value:t})}))),(0,d.sY)({ourProps:C,theirProps:f,slot:O,defaultTag:D,name:"Listbox"})))})),B=(0,d.yV)((function(e,t){var n;let[s,r]=F("Listbox.Button"),u=(0,c.T)(s.buttonRef,t),p=`headlessui-listbox-button-${(0,a.M)()}`,b=(0,o.G)(),h=(0,N.z)((e=>{switch(e.key){case f.R.Space:case f.R.Enter:case f.R.ArrowDown:e.preventDefault(),r({type:0}),b.nextFrame((()=>{s.propsRef.current.value||r({type:4,focus:m.T.First})}));break;case f.R.ArrowUp:e.preventDefault(),r({type:0}),b.nextFrame((()=>{s.propsRef.current.value||r({type:4,focus:m.T.Last})}))}})),x=(0,N.z)((e=>{if(e.key===f.R.Space)e.preventDefault()})),y=(0,N.z)((e=>{if((0,v.P)(e.currentTarget))return e.preventDefault();0===s.listboxState?(r({type:1}),b.nextFrame((()=>{var e;return null==(e=s.buttonRef.current)?void 0:e.focus({preventScroll:!0})}))):(e.preventDefault(),r({type:0}))})),S=l((()=>{if(s.labelRef.current)return[s.labelRef.current.id,p].join(" ")}),[s.labelRef.current,p]),_=(0,i.useMemo)((()=>({open:0===s.listboxState,disabled:s.disabled})),[s]),R=e,w={ref:u,id:p,type:(0,g.f)(e,s.buttonRef),"aria-haspopup":!0,"aria-controls":null==(n=s.optionsRef.current)?void 0:n.id,"aria-expanded":s.disabled?void 0:0===s.listboxState,"aria-labelledby":S,disabled:s.disabled,onKeyDown:h,onKeyUp:x,onClick:y};return(0,d.sY)({ourProps:w,theirProps:R,slot:_,defaultTag:"button",name:"Listbox.Button"})})),M=(0,d.yV)((function(e,t){let[n]=F("Listbox.Label"),o=`headlessui-listbox-label-${(0,a.M)()}`,s=(0,c.T)(n.labelRef,t),r=(0,N.z)((()=>{var e;return null==(e=n.buttonRef.current)?void 0:e.focus({preventScroll:!0})})),l=(0,i.useMemo)((()=>({open:0===n.listboxState,disabled:n.disabled})),[n]);return(0,d.sY)({ourProps:{ref:s,id:o,onClick:r},theirProps:e,slot:l,defaultTag:"label",name:"Listbox.Label"})})),z=d.AN.RenderStrategy|d.AN.Static,V=(0,d.yV)((function(e,t){var n;let[s,r]=F("Listbox.Options"),v=(0,c.T)(s.optionsRef,t),b=`headlessui-listbox-options-${(0,a.M)()}`,g=(0,o.G)(),x=(0,o.G)(),y=(0,h.oJ)(),S=null!==y?y===h.ZM.Open:0===s.listboxState;(0,i.useEffect)((()=>{var e;let t=s.optionsRef.current;!t||0===s.listboxState&&t!==(null==(e=(0,j.r)(t))?void 0:e.activeElement)&&t.focus({preventScroll:!0})}),[s.listboxState,s.optionsRef]);let _=(0,N.z)((e=>{switch(x.dispose(),e.key){case f.R.Space:if(""!==s.searchQuery)return e.preventDefault(),e.stopPropagation(),r({type:5,value:e.key});case f.R.Enter:if(e.preventDefault(),e.stopPropagation(),null!==s.activeOptionIndex){let{dataRef:e}=s.options[s.activeOptionIndex];s.propsRef.current.onChange(e.current.value)}0===s.propsRef.current.mode&&(r({type:1}),(0,p.k)().nextFrame((()=>{var e;return null==(e=s.buttonRef.current)?void 0:e.focus({preventScroll:!0})})));break;case(0,u.E)(s.orientation,{vertical:f.R.ArrowDown,horizontal:f.R.ArrowRight}):return e.preventDefault(),e.stopPropagation(),r({type:4,focus:m.T.Next});case(0,u.E)(s.orientation,{vertical:f.R.ArrowUp,horizontal:f.R.ArrowLeft}):return e.preventDefault(),e.stopPropagation(),r({type:4,focus:m.T.Previous});case f.R.Home:case f.R.PageUp:return e.preventDefault(),e.stopPropagation(),r({type:4,focus:m.T.First});case f.R.End:case f.R.PageDown:return e.preventDefault(),e.stopPropagation(),r({type:4,focus:m.T.Last});case f.R.Escape:return e.preventDefault(),e.stopPropagation(),r({type:1}),g.nextFrame((()=>{var e;return null==(e=s.buttonRef.current)?void 0:e.focus({preventScroll:!0})}));case f.R.Tab:e.preventDefault(),e.stopPropagation();break;default:1===e.key.length&&(r({type:5,value:e.key}),x.setTimeout((()=>r({type:6})),350))}})),R=l((()=>{var e,t,n;return null!=(n=null==(e=s.labelRef.current)?void 0:e.id)?n:null==(t=s.buttonRef.current)?void 0:t.id}),[s.labelRef.current,s.buttonRef.current]),w=(0,i.useMemo)((()=>({open:0===s.listboxState})),[s]),I=e,O={"aria-activedescendant":null===s.activeOptionIndex||null==(n=s.options[s.activeOptionIndex])?void 0:n.id,"aria-multiselectable":1===s.propsRef.current.mode||void 0,"aria-labelledby":R,"aria-orientation":s.orientation,id:b,onKeyDown:_,role:"listbox",tabIndex:0,ref:v};return(0,d.sY)({ourProps:O,theirProps:I,slot:w,defaultTag:"ul",features:z,visible:S,name:"Listbox.Options"})})),Q=(0,d.yV)((function(e,t){let{disabled:n=!1,value:o,...r}=e,[l,f]=F("Listbox.Option"),v=`headlessui-listbox-option-${(0,a.M)()}`,b=null!==l.activeOptionIndex&&l.options[l.activeOptionIndex].id===v,{value:h,compare:g}=l.propsRef.current,x=(0,u.E)(l.propsRef.current.mode,{1:()=>h.some((e=>g(e,o))),0:()=>g(h,o)}),y=(0,i.useRef)(null),S=(0,c.T)(t,y);(0,s.e)((()=>{if(0!==l.listboxState||!b||0===l.activationTrigger)return;let e=(0,p.k)();return e.requestAnimationFrame((()=>{var e,t;null==(t=null==(e=y.current)?void 0:e.scrollIntoView)||t.call(e,{block:"nearest"})})),e.dispose}),[y,b,l.listboxState,l.activationTrigger,l.activeOptionIndex]);let _=(0,i.useRef)({disabled:n,value:o,domRef:y});(0,s.e)((()=>{_.current.disabled=n}),[_,n]),(0,s.e)((()=>{_.current.value=o}),[_,o]),(0,s.e)((()=>{var e,t;_.current.textValue=null==(t=null==(e=y.current)?void 0:e.textContent)?void 0:t.toLowerCase()}),[_,y]);let R=(0,N.z)((()=>l.propsRef.current.onChange(o)));(0,s.e)((()=>(f({type:7,id:v,dataRef:_}),()=>f({type:8,id:v}))),[_,v]);let w=(0,N.z)((e=>{if(n)return e.preventDefault();R(),0===l.propsRef.current.mode&&(f({type:1}),(0,p.k)().nextFrame((()=>{var e;return null==(e=l.buttonRef.current)?void 0:e.focus({preventScroll:!0})})))})),I=(0,N.z)((()=>{if(n)return f({type:4,focus:m.T.Nothing});f({type:4,focus:m.T.Specific,id:v})})),j=(0,N.z)((()=>{n||b||f({type:4,focus:m.T.Specific,id:v,trigger:0})})),O=(0,N.z)((()=>{n||!b||f({type:4,focus:m.T.Nothing})})),C=(0,i.useMemo)((()=>({active:b,selected:x,disabled:n})),[b,x,n]);return(0,d.sY)({ourProps:{id:v,ref:S,role:"option",tabIndex:!0===n?void 0:-1,"aria-disabled":!0===n||void 0,"aria-selected":!0===x||void 0,disabled:void 0,onClick:w,onFocus:I,onPointerMove:j,onMouseMove:j,onPointerLeave:O,onMouseLeave:O},theirProps:r,slot:C,defaultTag:"li",name:"Listbox.Option"})})),Z=Object.assign(A,{Button:B,Label:M,Options:V,Option:Q})},8057:function(e,t,n){var i=n(7294);const o=i.forwardRef((function(e,t){return i.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true",ref:t},e),i.createElement("path",{fillRule:"evenodd",d:"M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z",clipRule:"evenodd"}))}));t.Z=o},1013:function(e,t,n){var i=n(7294);const o=i.forwardRef((function(e,t){return i.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor","aria-hidden":"true",ref:t},e),i.createElement("path",{fillRule:"evenodd",d:"M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z",clipRule:"evenodd"}))}));t.Z=o}}]);