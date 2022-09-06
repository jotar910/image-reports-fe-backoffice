<template>
  <div class="align-items-end md:align-items-start flex flex-wrap-reverse md:flex-nowrap justify-content-between">
    <section class="max-w-75">
      <h1 class="typ-header-sm mt-3 mb-4">Backoffice web</h1>
      <p class="typ-body-sm text-color-secondary mb-2">All release references where you act a container user are shown here. You can also
        add more references by creating an assisted request.</p>
    </section>
    <section class="flex md:block ml-auto md:py-5">
      <p-button label="Primary"/>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Button from 'primevue/button';

export default defineComponent({
  name: 'UIShowcaseHeader',
  components: {
    'p-button': Button
  }
});
</script>
