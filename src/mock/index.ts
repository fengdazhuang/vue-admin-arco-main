import Mock from 'mockjs';

import './user';
import './message-box';

import '@/views/backStage/dashboard/workplace/mock';
/** simple */
import '@/views/backStage/dashboard/monitor/mock';

import '@/views/backStage/list/card/mock';
import '@/views/backStage/list/search-table/mock';

import '@/views/backStage/form/step/mock';

import '@/views/backStage/profile/basic/mock';

import '@/views/backStage/visualization/data-analysis/mock';
import '@/views/backStage/visualization/multi-dimension-data-analysis/mock';

import '@/views/backStage/user/info/mock';
import '@/views/backStage/user/setting/mock';
/** simple end */

Mock.setup({
  timeout: '600-1000',
});
