<template>
  <form @submit.prevent="submit">
    <header class="text-center mb-7">
      <span class="typ-body-md text-secondary">Before you start, please</span>
      <h1 class="typ-header-md-bold mt-2">LOGIN</h1>
    </header>
    <main class="mb-5">
      <div class="p-float-label">
        <InputText id="name" type="text" v-model="form.email" v-focus class="w-full" :class="{'p-invalid': formV.email.$error }"/>
        <label for="name">Email</label>
      </div>
      <p v-if="formV.email.$error" class="m-2 p-error">{{ formV.email.$errors[0].$message }}</p>
    </main>
    <footer>
      <Button type="submit" label="ENTER" class="p-button-secondary p-button-text typ-body-md-medium w-full mt-auto"/>
    </footer>
  </form>
</template>

<script lang="ts" setup>
import { inject, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import AuthenticationInjector, { AuthenticationService } from '@/data/authentication.data';

const service = inject(AuthenticationInjector) as AuthenticationService;
const router = useRouter();

const form = reactive({ email: '' });
const formV = useVuelidate({ email: { required, email } }, form);

function submit() {
  formV.value.$touch();
  if (formV.value.$error) {
    return;
  }
  service.login(form.email);
  router.push({ name: 'ReportsList' });
}
</script>
