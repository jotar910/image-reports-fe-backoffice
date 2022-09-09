<template>
  <AuthenticationPage>
    <section class="text-center mb-7">
      <span class="typ-body-md text-secondary">You're logged out.</span>
      <h1 class="typ-header-md-bold mt-2">Thank you!</h1>
    </section>
    <router-link class="p-button p-button-text p-button-secondary typ-body-md-medium no-underline w-full justify-content-center"
                 to="/login">
      Go to login
    </router-link>
  </AuthenticationPage>
</template>

<script lang="ts" setup>
import { inject, onMounted } from 'vue';
import AuthenticationInjector, { AuthenticationService } from '@/data/authentication.data';
import AuthenticationPage from '@/components/authentication/AuthenticationPage.vue';

const service = inject(AuthenticationInjector) as AuthenticationService;

onMounted(() => {
  service.logout();
});
</script>
