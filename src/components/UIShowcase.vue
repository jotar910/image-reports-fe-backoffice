<template>
  <div class="container col-12">
    <p-toast/>
    <p-button label="Success" class="p-button-success" @click="showSuccess"/>
    <p-button label="Info" class="p-button-info ml-2" @click="showInfo"/>
    <p-button label="Warn" class="p-button-warning ml-2" @click="showWarn"/>
    <p-button label="Error" class="p-button-danger ml-2" @click="showError"/>
  </div>
  <br/>
  <div class="container col-12">
    <router-link to="/" class="mr-3">Go to Previous</router-link>
    <router-link to="/next">Go to Next</router-link>
  </div>
  <br/>
  <div class="flex container col-12">
    <div class="p-float-label mt-2">
      <p-input id="username" type="text" v-model="inputText" class="p-filled"/>
      <label for="username">Username</label>
    </div>
    <span class="p-float-label ml-2 mt-2">
        <p-input id="password" type="password" v-model="inputText2" class="p-filled"/>
        <label for="password">Password</label>
      </span>
  </div>
  <br/>
  <div class="flex container col-12">
    <div class="flex gap-2 mb-2 mr-4">
      <p-radio inputId="rb1" name="number" value="one" v-model="radioInput"/>
      <label for="rb1">One</label>
    </div>
    <div class="flex gap-2 mb-2 mr-4">
      <p-radio inputId="rb2" name="number" value="two" v-model="radioInput"/>
      <label for="rb2">Two</label>
    </div>
  </div>
  <br/>
  <div class="container col-12">
    <p-button label="Primary Small" class="mb-3" @click="log($refs.uploader.files)"/>
    <p-file-upload ref="uploader" accept="image/*" :maxFileSize="1000000"
                   :showUploadButton="false" :showCancelButton="false"
                   @select="updateHasFileState($refs.uploader.hasFiles)"
                   @remove="updateHasFileState($refs.uploader.hasFiles)"
                   :multiple="false" :customUpload="false" :disabled="hasFiles">
      <template #empty>
        Drag and drop files to here to upload.
      </template>
    </p-file-upload>
  </div>
  <br/>
  <div class="container col-12">
    <p-image src="https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?cs=srgb&dl=pexels-pixabay-60597.jpg&fm=jpg"
             alt="Image Text" class="mr-3 image-md"/>
    <p-image src="https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?cs=srgb&dl=pexels-pixabay-60597.jpg&fm=jpg"
             alt="Image Text" class="image-xs" :preview="true"/>
  </div>
  <br/>
  <div class="container col-12">
    <p-sidebar v-model:visible="sidebarVisible" position="right" class="p-sidebar-lg">Content</p-sidebar>
    <p-button label="Toggle Sidebar" @click="sidebarVisible = true"/>
  </div>
  <br/>
  <div class="container col-12">
    <p-card>
      <template #content>
        <ReportsTable :list="tableItems" :options="tableOptions" :loading="false"/>
      </template>
    </p-card>
  </div>
  <div class="container col-12">
    <p-card>
      <template #content>
        <ReportsTable :list="tableItems" :options="tableOptions" :loading="true"/>
      </template>
    </p-card>
  </div>
  <div class="container col-12">
    <p-card>
      <template #content>
        <ReportsTable :list="[]" :options="tableOptions" :error="true"/>
      </template>
    </p-card>
  </div>
  <div class="container col-12">
    <p-card>
      <template #content>
        <ReportsTable :list="[]" :options="tableOptions"/>
      </template>
    </p-card>
  </div>
  <br/>
  <div class="container col-12">
    <div class="col-12">
      <p-button label="Primary Small"/>
      <p-button label="Primary Small" class="ml-3" icon="pi pi-plus"/>
      <p-button label="Primary" class="ml-3" icon="pi pi-plus"/>
      <p-button label="Primary Large" class="ml-3" icon="pi pi-plus"/>
      <p-button class="ml-3" icon="pi pi-plus"/>
      <p-button class="p-button-rounded p-button-raised p-button-outlined ml-3" icon="pi pi-plus"/>
      <p-button label="Primary Disabled" icon="pi pi-plus" disabled="disabled" class="ml-3"/>
      <p-button label="Primary Outlined" icon="pi pi-plus" class="p-button-outlined ml-3"/>
    </div>
    <div class="col-12">
      <p-button label="Secondary Small" class="p-button-secondary"/>
      <p-button label="Secondary Small" class="p-button-secondary ml-3" icon="pi pi-plus"/>
      <p-button label="Secondary" class="p-button-secondary ml-3" icon="pi pi-plus"/>
      <p-button label="Secondary Large" class="p-button-secondary ml-3" icon="pi pi-plus"/>
      <p-button class="p-button-secondary ml-3" icon="pi pi-plus"/>
      <p-button class="p-button-secondary p-button-rounded p-button-raised p-button-outlined ml-3" icon="pi pi-plus"/>
      <p-button label="Secondary Disabled" icon="pi pi-plus" disabled="disabled" class="p-button-secondary ml-3"/>
      <p-button label="Secondary Outlined" icon="pi pi-plus" class="p-button-outlined p-button-secondary ml-3"/>
    </div>
    <div class="col-12">
      <p-button label="Success Small" class="p-button-success"/>
      <p-button label="Success Small" class="p-button-success ml-3" icon="pi pi-plus"/>
      <p-button label="Success" class="p-button-success ml-3" icon="pi pi-plus"/>
      <p-button label="Success Large" class="p-button-success ml-3" icon="pi pi-plus"/>
      <p-button class="p-button-success ml-3" icon="pi pi-plus"/>
      <p-button class="p-button-success p-button-rounded p-button-raised p-button-outlined ml-3" icon="pi pi-plus"/>
      <p-button label="Success Disabled" icon="pi pi-plus" disabled="disabled" class="p-button-success ml-3"/>
      <p-button label="Success Outlined" icon="pi pi-plus" class="p-button-outlined p-button-success ml-3"/>
    </div>
    <div class="col-12">
      <p-button label="Info Small" class="p-button-info"/>
      <p-button label="Info Small" class="p-button-info ml-3" icon="pi pi-plus"/>
      <p-button label="Info" class="p-button-info ml-3" icon="pi pi-plus"/>
      <p-button label="Info Large" class="p-button-info ml-3" icon="pi pi-plus"/>
      <p-button class="p-button-info ml-3" icon="pi pi-plus"/>
      <p-button class="p-button-info p-button-rounded p-button-raised p-button-outlined ml-3" icon="pi pi-plus"/>
      <p-button label="Info Disabled" icon="pi pi-plus" disabled="disabled" class="p-button-info ml-3"/>
      <p-button label="Info Outlined" icon="pi pi-plus" class="p-button-outlined p-button-info ml-3"/>
    </div>
    <div class="col-12">
      <p-button label="Warning Small" class="p-button-warning"/>
      <p-button label="Warning Small" class="p-button-warning ml-3" icon="pi pi-plus"/>
      <p-button label="Warning" class="p-button-warning ml-3" icon="pi pi-plus"/>
      <p-button label="Warning Large" class="p-button-warning ml-3" icon="pi pi-plus"/>
      <p-button class="p-button-warning ml-3" icon="pi pi-plus"/>
      <p-button class="p-button-warning p-button-rounded p-button-raised p-button-outlined ml-3" icon="pi pi-plus"/>
      <p-button label="Warning Disabled" icon="pi pi-plus" disabled="disabled" class="p-button-warning ml-3"/>
      <p-button label="Warning Outlined" icon="pi pi-plus" class="p-button-outlined p-button-warning ml-3"/>
    </div>
    <div class="col-12">
      <p-button label="Help Small" class="p-button-help"/>
      <p-button label="Help Small" class="p-button-help ml-3" icon="pi pi-plus"/>
      <p-button label="Help" class="p-button-help ml-3" icon="pi pi-plus"/>
      <p-button label="Help Large" class="p-button-help ml-3" icon="pi pi-plus"/>
      <p-button class="p-button-help ml-3" icon="pi pi-plus"/>
      <p-button class="p-button-help p-button-rounded p-button-raised p-button-outlined ml-3" icon="pi pi-plus"/>
      <p-button label="Help Disabled" icon="pi pi-plus" disabled="disabled" class="p-button-help ml-3"/>
      <p-button label="Help Outlined" icon="pi pi-plus" class="p-button-outlined p-button-help ml-3"/>
    </div>
    <div class="col-12">
      <p-button label="Danger Small" class="p-button-danger"/>
      <p-button label="Danger Small" class="p-button-danger ml-3" icon="pi pi-plus"/>
      <p-button label="Danger" class="p-button-danger ml-3" icon="pi pi-plus"/>
      <p-button label="Danger Large" class="p-button-danger ml-3" icon="pi pi-plus"/>
      <p-button class="p-button-danger ml-3" icon="pi pi-plus"/>
      <p-button class="p-button-danger p-button-rounded p-button-raised p-button-outlined ml-3" icon="pi pi-plus"/>
      <p-button label="Danger Disabled" icon="pi pi-plus" disabled="disabled" class="p-button-danger ml-3"/>
      <p-button label="Danger Outlined" icon="pi pi-plus" class="p-button-outlined p-button-danger ml-3"/>
    </div>
  </div>
  <br/>
  <div class="container col-12">
    <h1>h1: {{ msg }}</h1>
    <h2>h2: {{ msg }}</h2>
    <h3>h3: {{ msg }}</h3>
    <h4>h4: {{ msg }}</h4>
    <h5>h5: {{ msg }}</h5>
    <p>p: {{ msg }}</p>
    <span>span: {{ msg }}</span><br/>
    <strong>strong: {{ msg }}</strong><br/>
    <em>em: {{ msg }}</em>
  </div>
  <div class="container col-12">
    <div class="typ-header-xs">The future is in our hands to shape. (typ-header-xs)</div>
    <div class="typ-header-xs-thin">The future is in our hands to shape. (typ-header-xs-thin)</div>
    <div class="typ-header-xs-regular">The future is in our hands to shape. (typ-header-xs-regular)</div>
    <div class="typ-header-xs-medium">The future is in our hands to shape. (typ-header-xs-medium)</div>
    <div class="typ-header-xs-bold">The future is in our hands to shape. (typ-header-xs-bold)</div>
    <div class="typ-header-thin">The future is in our hands to shape. (typ-header-thin)</div>
    <div class="typ-header-regular">The future is in our hands to shape. (typ-header-regular)</div>
    <div class="typ-header-medium">The future is in our hands to shape. (typ-header-medium)</div>
    <div class="typ-header-bold">The future is in our hands to shape. (typ-header-bold)</div>
    <div class="typ-header-sm">The future is in our hands to shape. (typ-header-sm)</div>
    <div class="typ-header-sm-thin">The future is in our hands to shape. (typ-header-sm-thin)</div>
    <div class="typ-header-sm-regular">The future is in our hands to shape. (typ-header-sm-regular)</div>
    <div class="typ-header-sm-medium">The future is in our hands to shape. (typ-header-sm-medium)</div>
    <div class="typ-header-sm-bold">The future is in our hands to shape. (typ-header-sm-bold)</div>
    <div class="typ-header-thin">The future is in our hands to shape. (typ-header-thin)</div>
    <div class="typ-header-regular">The future is in our hands to shape. (typ-header-regular)</div>
    <div class="typ-header-medium">The future is in our hands to shape. (typ-header-medium)</div>
    <div class="typ-header-bold">The future is in our hands to shape. (typ-header-bold)</div>
    <div class="typ-header-md">The future is in our hands to shape. (typ-header-md)</div>
    <div class="typ-header-md-thin">The future is in our hands to shape. (typ-header-md-thin)</div>
    <div class="typ-header-md-regular">The future is in our hands to shape. (typ-header-md-regular)</div>
    <div class="typ-header-md-medium">The future is in our hands to shape. (typ-header-md-medium)</div>
    <div class="typ-header-md-bold">The future is in our hands to shape. (typ-header-md-bold)</div>
    <div class="typ-header-thin">The future is in our hands to shape. (typ-header-thin)</div>
    <div class="typ-header-regular">The future is in our hands to shape. (typ-header-regular)</div>
    <div class="typ-header-medium">The future is in our hands to shape. (typ-header-medium)</div>
    <div class="typ-header-bold">The future is in our hands to shape. (typ-header-bold)</div>
    <div class="typ-header-lg">The future is in our hands to shape. (typ-header-lg)</div>
    <div class="typ-header-lg-thin">The future is in our hands to shape. (typ-header-lg-thin)</div>
    <div class="typ-header-lg-regular">The future is in our hands to shape. (typ-header-lg-regular)</div>
    <div class="typ-header-lg-medium">The future is in our hands to shape. (typ-header-lg-medium)</div>
    <div class="typ-header-lg-bold">The future is in our hands to shape. (typ-header-lg-bold)</div>
    <div class="typ-header-thin">The future is in our hands to shape. (typ-header-thin)</div>
    <div class="typ-header-regular">The future is in our hands to shape. (typ-header-regular)</div>
    <div class="typ-header-medium">The future is in our hands to shape. (typ-header-medium)</div>
    <div class="typ-header-bold">The future is in our hands to shape. (typ-header-bold)</div>
    <div class="typ-body-xs">The future is in our hands to shape. (typ-body-xs)</div>
    <div class="typ-body-xs-thin">The future is in our hands to shape. (typ-body-xs-thin)</div>
    <div class="typ-body-xs-regular">The future is in our hands to shape. (typ-body-xs-regular)</div>
    <div class="typ-body-xs-medium">The future is in our hands to shape. (typ-body-xs-medium)</div>
    <div class="typ-body-xs-bold">The future is in our hands to shape. (typ-body-xs-bold)</div>
    <div class="typ-body-thin">The future is in our hands to shape. (typ-body-thin)</div>
    <div class="typ-body-regular">The future is in our hands to shape. (typ-body-regular)</div>
    <div class="typ-body-medium">The future is in our hands to shape. (typ-body-medium)</div>
    <div class="typ-body-bold">The future is in our hands to shape. (typ-body-bold)</div>
    <div class="typ-body-sm">The future is in our hands to shape. (typ-body-sm)</div>
    <div class="typ-body-sm-thin">The future is in our hands to shape. (typ-body-sm-thin)</div>
    <div class="typ-body-sm-regular">The future is in our hands to shape. (typ-body-sm-regular)</div>
    <div class="typ-body-sm-medium">The future is in our hands to shape. (typ-body-sm-medium)</div>
    <div class="typ-body-sm-bold">The future is in our hands to shape. (typ-body-sm-bold)</div>
    <div class="typ-body-thin">The future is in our hands to shape. (typ-body-thin)</div>
    <div class="typ-body-regular">The future is in our hands to shape. (typ-body-regular)</div>
    <div class="typ-body-medium">The future is in our hands to shape. (typ-body-medium)</div>
    <div class="typ-body-bold">The future is in our hands to shape. (typ-body-bold)</div>
    <div class="typ-body-md">The future is in our hands to shape. (typ-body-md)</div>
    <div class="typ-body-md-thin">The future is in our hands to shape. (typ-body-md-thin)</div>
    <div class="typ-body-md-regular">The future is in our hands to shape. (typ-body-md-regular)</div>
    <div class="typ-body-md-medium">The future is in our hands to shape. (typ-body-md-medium)</div>
    <div class="typ-body-md-bold">The future is in our hands to shape. (typ-body-md-bold)</div>
    <div class="typ-body-thin">The future is in our hands to shape. (typ-body-thin)</div>
    <div class="typ-body-regular">The future is in our hands to shape. (typ-body-regular)</div>
    <div class="typ-body-medium">The future is in our hands to shape. (typ-body-medium)</div>
    <div class="typ-body-bold">The future is in our hands to shape. (typ-body-bold)</div>
    <div class="typ-body-lg">The future is in our hands to shape. (typ-body-lg)</div>
    <div class="typ-body-lg-thin">The future is in our hands to shape. (typ-body-lg-thin)</div>
    <div class="typ-body-lg-regular">The future is in our hands to shape. (typ-body-lg-regular)</div>
    <div class="typ-body-lg-medium">The future is in our hands to shape. (typ-body-lg-medium)</div>
    <div class="typ-body-lg-bold">The future is in our hands to shape. (typ-body-lg-bold)</div>
    <div class="typ-body-thin">The future is in our hands to shape. (typ-body-thin)</div>
    <div class="typ-body-regular">The future is in our hands to shape. (typ-body-regular)</div>
    <div class="typ-body-medium">The future is in our hands to shape. (typ-body-medium)</div>
    <div class="typ-body-bold">The future is in our hands to shape. (typ-body-bold)</div>
    <div class="typ">The future is in our hands to shape. (typ)</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Radio from 'primevue/radiobutton';
import dateFilter from '@/filters/date';
import reportStatusFilter from '@/filters/report-status';
import ReportsTable from '@/components/reports/ReportsTable.vue';
import Card from 'primevue/card';
import Sidebar from 'primevue/sidebar';
import Image from 'primevue/image';
import FileUpload from 'primevue/fileupload';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';

export default defineComponent({
  name: 'UIShowcase',
  components: {
    ReportsTable,
    'p-button': Button,
    'p-card': Card,
    'p-file-upload': FileUpload,
    'p-image': Image,
    'p-input': InputText,
    'p-sidebar': Sidebar,
    'p-radio': Radio,
    'p-toast': Toast
  },
  setup() {
    let styles: Ref<string[]> = ref(['regular', 'success', 'warning', 'error']);

    let labelStyles: Ref<{ [key: string]: string }> = ref({
      regular: 'regular-placeholder',
      success: 'success',
      warning: 'warning',
      error: 'error'
    });

    let msg = ref('PASSE+ app! ABC abc 123');

    let inputText = ref('');
    let inputText2 = ref('');

    let passwordText = ref('');

    let selectedCity: Ref<string | null> = ref(null);

    let selectedDate: Ref<Date | null> = ref(null);

    let cities: Ref<{ name: string; code: string | null }[]> = ref([
      {
        name: 'None',
        code: null
      },
      {
        name: 'New York',
        code: 'NY'
      },
      {
        name: 'Rome',
        code: 'RM'
      },
      {
        name: 'London',
        code: 'LDN'
      },
      {
        name: 'Istanbul',
        code: 'IST'
      },
      {
        name: 'Paris',
        code: 'PRS'
      }
    ]);

    let radio = ref('radio');

    let radioSelected = ref('radioSelected');

    let tableItems = ref([
      {
        name: 'Report',
        user: 'joao@mail.com',
        image: 'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?cs=srgb&dl=pexels-pixabay-60597.jpg&fm=jpg',
        creationDate: 0,
        status: 'NEW',
        evaluation: null,
        approval: null
      },
      {
        name: 'Report',
        user: 'joao@mail.com',
        image: 'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?cs=srgb&dl=pexels-pixabay-60597.jpg&fm=jpg',
        creationDate: 0,
        status: 'EVALUATING',
        evaluation: null,
        approval: null
      },
      {
        name: 'Report',
        user: 'joao@mail.com',
        image: 'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?cs=srgb&dl=pexels-pixabay-60597.jpg&fm=jpg',
        creationDate: 0,
        status: 'ERROR',
        evaluation: null,
        approval: null
      },
      {
        name: 'Report',
        user: 'joao@mail.com',
        image: 'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?cs=srgb&dl=pexels-pixabay-60597.jpg&fm=jpg',
        creationDate: 0,
        status: 'PENDING',
        evaluation: {
          grade: 15,
          categories: ['violence', 'drugs', 'weapons']
        },
        approval: null
      },
      {
        name: 'Report',
        user: 'joao@mail.com',
        image: 'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?cs=srgb&dl=pexels-pixabay-60597.jpg&fm=jpg',
        creationDate: 0,
        status: 'PENDING',
        evaluation: {
          grade: 15,
          categories: ['violence', 'drugs', 'weapons']
        },
        approval: null
      },
      {
        name: 'Report',
        user: 'joao@mail.com',
        image: 'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?cs=srgb&dl=pexels-pixabay-60597.jpg&fm=jpg',
        creationDate: 0,
        status: 'PENDING',
        evaluation: {
          grade: 50,
          categories: ['weapons']
        },
        approval: null
      },
      {
        name: 'Report',
        user: 'joao@mail.com',
        image: 'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?cs=srgb&dl=pexels-pixabay-60597.jpg&fm=jpg',
        creationDate: 0,
        status: 'PENDING',
        evaluation: {
          grade: 85,
          categories: []
        },
        approval: null
      },
      {
        name: 'Report',
        user: 'joao@mail.com',
        image: 'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?cs=srgb&dl=pexels-pixabay-60597.jpg&fm=jpg',
        creationDate: 0,
        status: 'PUBLISHED',
        evaluation: {
          grade: 85,
          categories: []
        },
        approval: {
          user: 'You',
          status: 'APPROVED',
          date: 1
        }
      },
      {
        name: 'Report',
        user: 'joao@mail.com',
        image: 'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?cs=srgb&dl=pexels-pixabay-60597.jpg&fm=jpg',
        creationDate: 0,
        status: 'PUBLISHED',
        evaluation: {
          grade: 15,
          categories: []
        },
        approval: {
          user: 'other@email.com',
          status: 'REJECTED',
          date: 2
        }
      },
      {
        name: 'Report',
        user: 'joao@mail.com',
        image: null,
        creationDate: 0,
        status: 'New',
        evaluation: null,
        approval: null
      },
      {
        name: 'Loading',
        user: 'joao@mail.com',
        image: null,
        creationDate: 0,
        status: 'New',
        evaluation: null,
        approval: null
      }
    ]);

    let tableOptions = [
      {
        label: 'Update',
        icon: 'pi pi-refresh',
        command: () => {
          console.log('refresh');
        }
      },
      {
        label: 'Delete',
        icon: 'pi pi-times',
        command: () => {
          console.log('delete');
        }
      },
      {
        label: 'Vue Website',
        icon: 'pi pi-external-link',
        url: 'https://vuejs.org/'
      },
      {
        label: 'Router',
        icon: 'pi pi-upload',
        to: '/fileupload'
      }
    ];

    return {
      styles,
      labelStyles,
      tableItems,
      tableOptions,
      sidebarVisible: ref(false),
      hasFiles: ref(false),
      radioInput: ref('two'),
      toast: useToast(),
      msg,
      inputText,
      inputText2,
      passwordText,
      selectedCity,
      selectedDate,
      cities,
      radio,
      radioSelected
    };
  },
  methods: {
    dateFilter,
    reportStatusFilter,
    showSuccess() {
      this.toast.add({
        severity: 'success',
        summary: 'Success Message',
        detail: 'Message Content',
        life: 3000
      });
    },
    showInfo() {
      this.toast.add({
        severity: 'info',
        summary: 'Info Message',
        detail: 'Message Content',
        life: 3000
      });
    },
    showWarn() {
      this.toast.add({
        severity: 'warn',
        summary: 'Warn Message',
        detail: 'Message Content',
        life: 3000
      });
    },
    showError() {
      this.toast.add({
        severity: 'error',
        summary: 'Error Message',
        detail: 'Message Content',
        life: 3000
      });
    },
    updateHasFileState(value: boolean) {
      this.hasFiles = value;
    },
    log: console.log
  }
});
</script>
