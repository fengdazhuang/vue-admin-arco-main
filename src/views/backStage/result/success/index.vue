<template>
    <div class="subscribe-container">
        <Breadcrumb :items="['menu.list', 'menu.list.searchTable']" />
        <div class="subscribe-header-container">
            <div class="subscribe-header">
                <div class="subscribe-left">
                    <span>文章状态</span>
                    <a-tabs>
                        <a-tab-pane key="1">
                            <template #title>
                                <icon-subscribed /> 已发布
                            </template>

                        </a-tab-pane>
                        <a-tab-pane key="2">
                            <template #title>
                                <icon-subscribe /> 未发布
                            </template>

                        </a-tab-pane>
                        <a-tab-pane key="3">
                            <template #title>
                                <icon-undo /> 已撤回
                            </template>

                        </a-tab-pane>
                    </a-tabs>
<!--                    <router-link to="/">已发布</router-link>-->
<!--                    <router-link to="/">未发布</router-link>-->
<!--                    <router-link to="/">已撤回</router-link>-->
                </div>
                <div class="subscribe-right">
                    <a-input-search :style="{width:'320px'}" placeholder="请输入搜索内容" search-button>
                        <template #button-icon>
                            <icon-search/>
                        </template>
                        <template #button-default>
                            Search
                        </template>
                    </a-input-search>
                </div>
            </div>
            <div class="subscribe-time">
                <span>时间选择</span>
                <a-range-picker
                        style="width: 360px; margin: 0 24px 24px 0;"
                        show-time
                        :time-picker-props="{ defaultValue: ['00:00:00', '09:09:06'] }"
                        format="YYYY-MM-DD HH:mm"
                        @change="onChange"
                        @select="onSelect"
                        @ok="onOk"
                />
            </div>
        </div>
        <div class="subscribe-content">
            <div class="subscribe-content-card">
                <div class="subscribe-content-card-img">
                    <img src="@/assets/images/img1.jpg" />
                </div>
                <div class="subscribe-content-card-content">
                    <div class="title">震惊！速看......</div>
                    <div class="comment">
                        <span>阅读</span>
                        <span>评论</span>
                    </div>
                    <div class="publish">已发布</div>
                    <div class="createTime">2022-2-22</div>
                </div>
            </div>
            <div class="subscribe-content-operate">
                <a-space direction="vertical" class="btns">
                    <div>
                        <a-button  type="text" status="warning">
                            <template #icon>
                                <icon-undo />
                            </template>
                            撤回
                        </a-button>
                    </div>

                    <a-button type="text" status="danger">
                        <template #icon>
                            <icon-close />
                        </template>
                        删除
                    </a-button>
                </a-space>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
    /* eslint-disable */
    import { defineComponent, computed, ref, reactive,getCurrentInstance } from 'vue';
    import { useI18n } from 'vue-i18n';
    import useLoading from '@/hooks/loading';
    import { queryPolicyList, PolicyRecord, PolicyParams } from '@/api/list';
    import { addAdmin,listAdmins,logout,queryAdmin,resetPassword,updateStatus} from '@/api/user';
    import { Pagination, Options } from '@/types/global';

    export default defineComponent({
        // components:{tree},
        setup() {}

    });
</script>

<style scoped lang="scss">

.subscribe-container {
    width: 100%;
    height:100%;
  padding: 0 20px 20px 20px;
    .subscribe-header-container{
      background: #ffffff;
      .subscribe-header {
        height:65px;
        display:flex;
        justify-content: space-between;
        font-size: 20px;
        .subscribe-left {
          display: flex;
          padding: 20px 0 0 20px;
          span {
            display: inline-block;
            padding-right: 10px;
          }
          a {
            display: inline-block;
            text-decoration: none;
            color: #000;
            margin-left: 20px;
          }
        }
        .subscribe-right {
          padding: 40px 60px 0 0;
        }
      }
      .subscribe-time {
        span {
          display: inline-block;
          padding: 10px 50px 0 20px;
          font-size: 16px;
        }
      }
    }
    .subscribe-content {
      display: flex;
      justify-content: space-between;
      background: #ffffff;
      margin-top: 20px;
      border-bottom: 1px solid grey;
      padding: 20px 0 20px 20px;
      .subscribe-content-card {
        display: flex;

        &-img {
          img {
            display: inline-block;
            width: 150px;
            height:150px
          }
        }
        &-content {
          margin-left: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
        }
      }
      .btns {
        padding: 30px 30px 0 0;
      }
    }

}
</style>