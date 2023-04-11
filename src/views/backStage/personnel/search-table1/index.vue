<template>
  <div class="container">
    <Breadcrumb :items="['menu.exception', 'menu.exception.player']" />
    <!-- <div class="content">
      <a-result
        class="result"
        status="player"
        :subtitle="$t('exception.result.player.description')"
      />
      <a-button key="back" type="primary">
        {{ $t('exception.result.player.back') }}
      </a-button>
    </div> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>
