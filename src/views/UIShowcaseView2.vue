<template>
  <PageLayout>
    <template #header>
      <UIShowcaseHeader/>
    </template>
    <router-link to="/" class="mr-3">Go to Previous</router-link>
    <router-link to="/next">Go to Next</router-link>
  </PageLayout>
</template>

<script lang="ts" setup>
import PageLayout from "@/components/PageLayout.vue";
import UIShowcaseHeader from '@/components/UIShowcaseHeader.vue';
</script>
