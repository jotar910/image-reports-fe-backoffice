<template>
  <div class="align-items-end md:align-items-start flex flex-wrap-reverse md:flex-nowrap justify-content-between">
    <section class="max-w-75">
      <h1 class="typ-header-sm my-3">Image report manager</h1>
      <p class="typ-body-sm text-color-secondary mb-2">Prevent offensive content by managing user generated images!<br/>You can also generate images by yourself.</p>
    </section>
    <section class="flex md:block ml-auto md:py-5">
      <Button label="Add new report" icon="pi pi-plus" @click="$emit('addReport')"/>
    </section>
  </div>
</template>

<script lang="ts" setup>
import Button from 'primevue/button';

defineEmits(['addReport']);
</script>
