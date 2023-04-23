import localeMessageBox from '@/components/message-box/locale/en-US';
import localeLogin from '@/views/backStage/login/locale/en-US';

import localeWorkplace from '@/views/backStage/dashboard/workplace/locale/en-US';
/** simple */
import localeMonitor from '@/views/backStage/dashboard/monitor/locale/en-US';



import localeBasicProfile from '@/views/backStage/profile/basic/locale/en-US';

import localeDataAnalysis from '@/views/backStage/visualization/data-analysis/locale/en-US';
import localeMultiDAnalysis from '@/views/backStage/visualization/multi-dimension-data-analysis/locale/en-US';


import localeUserInfo from '@/views/backStage/user/info/locale/en-US';
import localeUserSetting from '@/views/backStage/user/setting/locale/en-US';
/** simple end */
import localeSettings from './en-US/settings';

export default {
  'menu.dashboard': 'Dashboard',
  'menu.list': 'List',
  'menu.result': 'Result',
  'menu.personnel': 'personnel',
  'menu.form': 'Form',
  'menu.profile': 'Profile',
  'menu.visualization': 'Data Visualization',
  'menu.user': 'User Center',
  'navbar.docs': 'Docs',
  'navbar.action.locale': 'Switch to English',
  ...localeSettings,
  ...localeMessageBox,
  ...localeLogin,
  ...localeWorkplace,
  /** simple */
  ...localeMonitor,
  ...localeBasicProfile,
  ...localeDataAnalysis,
  ...localeMultiDAnalysis,
  ...localeUserInfo,
  ...localeUserSetting,
  /** simple end */
};
