<template>
  <form @submit.prevent="submit">
    <header class="text-center mb-7">
      <span class="typ-body-md text-secondary">Before you start, please</span>
      <h1 class="typ-header-md-bold mt-2">LOGIN</h1>
    </header>
    <main class="mb-5">
      <div class="mb-5">
        <div class="p-float-label">
          <InputText id="email" type="email" v-model="form.email" v-focus class="w-full" :class="{'p-invalid': formV.email.$error }"/>
          <label for="email">Email</label>
        </div>
        <p v-if="formV.email.$error" class="m-2 p-error">{{ formV.email.$errors[0].$message }}</p>
      </div>
      <div class="p-float-label">
        <InputText id="password" type="password" v-model="form.password" class="w-full" :class="{'p-invalid': formV.password.$error }"/>
        <label for="password">Password</label>
      </div>
      <p v-if="formV.password.$error" class="m-2 p-error">{{ formV.password.$errors[0].$message }}</p>
    </main>
    <footer>
      <Button type="submit" label="ENTER" class="p-button-secondary p-button-text typ-body-md-medium w-full mt-auto" :disabled="loading"/>
    </footer>
  </form>
</template>

<script lang="ts" setup>
import { inject, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useVuelidate } from '@vuelidate/core';
import { required, email } from '@vuelidate/validators';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import AuthenticationInjector, { AuthenticationService } from '@/data/authentication.data';
import ApiDataInjector, { IApiDataConfig } from '@/configs/apidata.config';
import { useToastService } from '@/utils/toast-service.utils';
import { useToast } from 'primevue/usetoast';

const service = inject(AuthenticationInjector) as AuthenticationService;
const router = useRouter();

const loading = ref(false);
const form = reactive({ email: '', password: '' });
const formV = useVuelidate({ email: { required, email }, password: { required } }, form);
const configs = inject(ApiDataInjector) as IApiDataConfig;
const toast = useToastService(useToast());

function submit() {
  formV.value.$touch();
  if (formV.value.$error) {
    return;
  }
  loading.value = true;
  service.login(form.email, form.password, configs)
    .then(() => router.push({ name: 'ReportsList' }))
    .catch(() => toast.reportLoginError())
    .finally(() => loading.value = false);
}
</script>
