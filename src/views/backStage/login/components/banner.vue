<template>
  <div class="banner">
    <div class="banner-inner">
      <a-carousel class="carousel" animation-name="fade">
        <a-carousel-item v-for="item in carouselItem" :key="item.slogan">
          <div :key="item.slogan" class="carousel-item">
            <div class="carousel-title">{{ item.slogan }}</div>
            <div class="carousel-sub-title">{{ item.subSlogan }}</div>
            <img class="carousel-image" :src="item.image" />
          </div>
        </a-carousel-item>
      </a-carousel>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useI18n } from 'vue-i18n';
// import bannerImage from '@/assets/images/login-banner.png';
import lb1 from '@/assets/images/lb1.jpg'
import lb2 from '@/assets/images/lb2.jpg'
import lb3 from '@/assets/images/lb3.jpg'

export default defineComponent({
  setup() {
    const { t } = useI18n();
    const carouselItem = computed(() => [
      {
        slogan: '象山风云“甬”动，亚运精彩同行',
        subSlogan: '扬帆万象山海，逐梦杭州亚运',
        image: lb1,
      },
      {
        slogan: '相约锦绣潇湘,共筑亚运辉煌',
        subSlogan: '搏亚运荣光，“象”梦想起“杭”',
        image: lb2,
      },
      {
        slogan: '一城亚运风，千年渔港梦',
        subSlogan: '一幅山海画卷，万般亚运风彩',
        image: lb3,
      },
    ]);
    return {
      carouselItem,
    };
  },
});
</script>

<style lang="less" scoped>
.banner {
  display: flex;
  align-items: center;
  justify-content: center;

  &-inner {
    flex: 1;
    height: 100%;
  }
}

.carousel {
  height: 100%;

  &-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  &-title {
    color: var(--color-fill-1);
    font-weight: admin;
    font-size: 20px;
    line-height: 28px;
  }

  &-sub-title {
    margin-top: 8px;
    color: var(--color-text-3);
    font-size: 14px;
    line-height: 22px;
  }

  &-image {
    width: 320px;
    margin-top: 30px;
  }
}
</style>
