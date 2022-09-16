import { App } from 'vue';
import ApiDataInjector, { createApiDataConfig } from '@/configs/apidata.config';
import DataTableInjector, { createDataTableConfig } from '@/configs/datatable.config';
import FileUploadInjector, { createFileUploadConfig } from '@/configs/fileupload.config';
import ToastInjector, { createToastConfig } from '@/configs/toast.config';

export default {
  install: (app: App) => {
    app.provide(ApiDataInjector, createApiDataConfig());
    app.provide(DataTableInjector, createDataTableConfig());
    app.provide(FileUploadInjector, createFileUploadConfig());
    app.provide(ToastInjector, createToastConfig());
  }
}
