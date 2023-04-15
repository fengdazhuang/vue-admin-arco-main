import localeMessageBox from '@/components/message-box/locale/zh-CN';
import localeLogin from '@/views/backStage/login/locale/zh-CN';

import localeWorkplace from '@/views/backStage/dashboard/workplace/locale/zh-CN';
/** simple */
import localeMonitor from '@/views/backStage/dashboard/monitor/locale/zh-CN';

import localeSearchTable from '@/views/backStage/list/search-table/locale/zh-CN';
import localeCardList from '@/views/backStage/list/card/locale/zh-CN';

import localeStepForm from '@/views/backStage/form/step/locale/zh-CN';
import localeGroupForm from '@/views/backStage/form/group/locale/zh-CN';

import localeBasicProfile from '@/views/backStage/profile/basic/locale/zh-CN';

import localeDataAnalysis from '@/views/backStage/visualization/data-analysis/locale/zh-CN';
import localeMultiDAnalysis from '@/views/backStage/visualization/multi-dimension-data-analysis/locale/zh-CN';

import localeSuccess from '@/views/backStage/result/success/locale/zh-CN';
import localeError from '@/views/backStage/result/error/locale/zh-CN';

import localeplayer from '@/views/backStage/personnel/player/locale/zh-CN';
import localejudge from '@/views/backStage/personnel/judge/locale/zh-CN';
import localeadmin from '@/views/backStage/personnel/admin/locale/zh-CN';

import localeUserInfo from '@/views/backStage/user/info/locale/zh-CN';
import localeUserSetting from '@/views/backStage/user/setting/locale/zh-CN';
/** simple end */
import localeSettings from './zh-CN/settings';

export default {
  'menu.dashboard': '仪表盘',
  'menu.list': '赛事管理',
  'menu.result':'资讯管理',
  'menu.person': '人员管理',
  'menu.personnel': '人员管理',
  'menu.form': '表单页',
  'menu.profile': '详情页',
  'menu.visualization': '数据可视化',
  'menu.user': '个人中心',
  'navbar.docs': '文档中心',
  'navbar.action.locale': '切换为中文',
  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
  ...localeWorkplace,
  /** simple */
  ...localeMonitor,
  ...localeSearchTable,
  ...localeCardList,
  ...localeStepForm,
  ...localeGroupForm,
  ...localeBasicProfile,
  ...localeDataAnalysis,
  ...localeMultiDAnalysis,
  ...localeSuccess,
  ...localeError,
  ...localeplayer,
  ...localejudge,
  ...localeadmin,
  ...localeUserInfo,
  ...localeUserSetting,
  /** simple end */
};
