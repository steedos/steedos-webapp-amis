/*
 * @Author: baozhoutao@steedos.com
 * @Date: 2022-08-31 16:32:35
 * @LastEditors: baozhoutao@steedos.com
 * @LastEditTime: 2023-04-07 18:23:05
 * @Description: 
 */
// import Hello from "./metas/Hello";
import AmisObjectForm from "./metas/AmisObjectForm";
import AmisObjectListview from "./metas/AmisObjectListview";
import AmisObjectCalendar from "./metas/AmisObjectCalendar";
import AmisObjectTable from "./metas/AmisObjectTable";
import AmisRecordDetailHeader from "./metas/AmisRecordDetailHeader";
import AmisRecordDetail from "./metas/AmisRecordDetail";
import AmisSelectUser from "./metas/AmisSelectUser";
import AmisRecordDetailRelatedList from "./metas/AmisRecordDetailRelatedList";
import AmisRecordDetailRelatedLists from "./metas/AmisRecordDetailRelatedLists";
import AmisProvider from "./metas/AmisProvider";

import AmisObjectFieldLookup from './metas/AmisObjectFieldLookup';

import AmisObjectButton from "./metas/AmisObjectButton";

import SteedosDropdownButton from "./metas/SteedosDropdownButton";
// import Hello from './metas/Hello';

import AmisAppLauncher from './metas/AmisAppLauncher';

import AmisLogo from './metas/AmisLogo';

import AmisAppMenu from './metas/AmisAppMenu';

import SteedosIcon from './metas/SteedosIcon';

import SteedosDropdown from "./metas/SteedosDropdown";

import FromNow from './metas/FromNow';

import AmisGlobalHeader from './metas/AmisGlobalHeader';
import SteedosLoading from './metas/SteedosLoading';

import SteedosBadge from "./metas/SteedosBadge";
import SteedosBadgeRibbon from "./metas/SteedosBadgeRibbon";

import AmisSteedosField from "./metas/AmisSteedosField";

import AmisSelectFlow from './metas/AmisSelectFlow';

import AmisInstanceDetail from './metas/AmisInstanceDetail';

import PageListViewMeta from './pages/PageListView.meta';
import PageRecordDetailMeta from './pages/PageRecordDetail.meta';
import SteedosSkeleton from './metas/SteedosSkeleton';

const components = [
  AmisRecordDetailHeader,
  AmisObjectForm, 
  AmisObjectListview, 
  AmisObjectTable,
  AmisRecordDetailRelatedList, 
  AmisRecordDetailRelatedLists,
  AmisRecordDetail, 
  AmisObjectCalendar,
  AmisObjectButton,
  AmisObjectFieldLookup,
  AmisSelectUser, 
  SteedosDropdownButton,
  AmisGlobalHeader,
  AmisAppLauncher,
  AmisProvider, 
  AmisLogo,
  AmisAppMenu,
  SteedosIcon,
  SteedosDropdown,
  FromNow,
  SteedosBadge,
  SteedosBadgeRibbon,
  AmisSteedosField,
  AmisSelectFlow,
  AmisInstanceDetail,
  SteedosLoading,
  PageListViewMeta,
  PageRecordDetailMeta,
  SteedosSkeleton
];

const componentList = [
  {
    title: "华炎魔方",
    icon: "",
    children: components
  }
];
export default {
  componentList,
  components
};
