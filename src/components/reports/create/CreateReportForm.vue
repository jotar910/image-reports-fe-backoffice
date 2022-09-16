<template>
  <form id="create-report" class="flex flex-column h-full" @submit.prevent="submit">
    <div class="grid py-5">
      <div class="col-12 sm:col-6 field-group sm:mb-5">
        <div class="p-float-label">
          <InputText id="name" type="text" v-model="form.name" v-focus :class="{'p-invalid': formV.name.$error }"/>
          <label for="name">Report name</label>
        </div>
        <p v-if="formV.name.$error" class="m-2 p-error">{{ formV.name.$errors[0].$message }}</p>
      </div>
      <div class="col-12 sm:col-6 field-group mb-5">
        <div class="p-float-label">
          <InputText id="callback" type="text" v-model="form.callback" :class="{'p-invalid': formV.callback.$error }"/>
          <label for="callback">Callback URL</label>
        </div>
        <p v-if="formV.callback.$error" class="m-2 p-error">{{ formV.callback.$errors[0].$message }}</p>
      </div>
      <div class="col-12 flex column-gap-4 mb-2">
        <div class="flex column-gap-2">
          <RadioButton inputId="fileType" name="type" value="file" v-model="form.type"
                       :class="{'p-invalid': formV.file.$error || formV.url.$error}"/>
          <label for="fileType">File</label>
        </div>
        <div class="flex column-gap-2">
          <RadioButton inputId="urlType" name="type" value="url" v-model="form.type"
                       :class="{'p-invalid': formV.file.$error || formV.url.$error}"/>
          <label for="urlType">Image URL</label>
        </div>
      </div>
      <div class="col field-group">
        <div v-if="form.type === 'file'" class="file-upload__container"
             :class="{'file-upload__container--invalid': formV.file.$error }">
          <FileUpload ref="uploader" accept="image/*" :showUploadButton="false" :showCancelButton="false" :customUpload="false"
                      :multiple="fileUploadConfigs.multiple" :maxFileSize="fileUploadConfigs.maxFileSize"
                      :disabled="hasFiles" :class="{'p-button-danger p-button-outlined': formV.file.$error}"
                      @select="selectFile($refs.uploader, $refs.uploader.hasFiles)"
                      @remove="removeFile($refs.uploader.hasFiles)">
            <template #empty>
              Drag and drop files to here to upload.
            </template>
          </FileUpload>
          <p v-if="formV.file.$error" class="m-2 p-error">{{ formV.file.$errors[0].$message }}</p>
        </div>
        <div v-else class="field-group">
          <div class="p-float-label">
            <label for="url" v-if="!form.url">Image URL</label>
            <InputText id="url" type="text" v-model="form.url" placholder="Image URL" :class="{'p-invalid': formV.url.$error }"/>
          </div>
          <p v-if="formV.url.$error" class="m-2 p-error">{{ formV.url.$errors[0].$message }}</p>
        </div>
      </div>
    </div>
    <Button type="submit" label="Submit" class="typ-body-md-medium w-full mt-auto"
            :disabled="submitting || formV.$anyDirty && formV.$error"/>
  </form>
</template>

<script lang="ts" setup>
import { inject, reactive, ref, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import Button from 'primevue/button';
import FileUpload, { FileUploadSelectEvent } from 'primevue/fileupload';
import InputText from 'primevue/inputtext';
import RadioButton from 'primevue/radiobutton';
import { useToast } from 'primevue/usetoast';
import FileUploadInjector, { IFileUploadConfig } from '@/configs/fileupload.config';
import ReportsInjector, { IReportsService } from '@/data/reports.data';
import { CreateReportFactory } from '@/factories/create-report.factory';
import { useToastService } from '@/utils/toast-service.utils';
import { CreateReportModel } from '@/models/create-report.model';
import ApiDataInjector, { IApiDataConfig } from '@/configs/apidata.config';

const service = inject(ReportsInjector) as IReportsService;
const fileUploadConfigs = inject(FileUploadInjector) as IFileUploadConfig;
const apiConfigs = inject(ApiDataInjector) as IApiDataConfig;

const form: CreateReportModel = reactive(CreateReportFactory.emptyForm());
const hasFiles = ref(false);
const submitting = ref(false);

const formV = useVuelidate(CreateReportFactory.formValidations(form), form);
const toast = useToastService(useToast());

const emit = defineEmits(['submitted']);

watch(() => form.type, () => handleFormTypeChanges());

function submit() {
  formV.value.$touch();
  if (formV.value.$error) {
    return;
  }
  submitting.value = true;
  service.add(form, apiConfigs)
    .then(() => handleSubmitSuccess())
    .catch(() => handleSubmitError());
}

function handleSubmitSuccess() {
  emit('submitted');
  toast.createReportSuccess();
  submitting.value = false;
}

function handleSubmitError() {
  toast.createReportError();
  submitting.value = false;
}

function selectFile(event: FileUploadSelectEvent, hasAnyFile: boolean) {
  form.file = event.files[0];
  hasFiles.value = hasAnyFile;
}

function removeFile(hasAnyFile: boolean) {
  form.file = '';
  hasFiles.value = hasAnyFile;
}

function handleFormTypeChanges() {
  Object.assign(form, {
    url: null,
    file: null
  });
  hasFiles.value = false;

  formV.value.url.$reset();
  formV.value.file.$reset();

  if (formV.value.$anyDirty) {
    formV.value.url.$touch();
    formV.value.file.$touch();
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/abstracts/variables';

.field-group {
  margin-bottom: $spacer-xl;

  input {
    width: 100%;
  }
}
</style>
