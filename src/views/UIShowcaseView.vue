<template>
  <PageLayout>
    <template #header>
      <UIShowcaseHeader/>
    </template>
    <UIShowcase/>
  </PageLayout>
</template>

<script lang="ts" setup>
import PageLayout from '@/components/PageLayout.vue';
import UIShowcase from '@/components/UIShowcase.vue';
import UIShowcaseHeader from '@/components/UIShowcaseHeader.vue';
</script>
