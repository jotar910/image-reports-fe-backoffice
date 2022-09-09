<template>
  <div class="py-5">
    <section class="image__container">
      <template v-if="!loading && !error && report.image">
        <Image :src="report.image.src" :alt="report.name" class="h-full" :preview="true"/>
        <LazyTeleport to=".image__container .p-image-preview-indicator">
          <dl class="mb-2">
            <dt>Dimensions:</dt>
            <dd>{{ imageDimensionsFilter(report.image.width, report.image.height) }}</dd>
            <dt>Size:</dt>
            <dd>{{ fileSizeFilter(report.image.size) }}</dd>
          </dl>
        </LazyTeleport>
      </template>
      <template v-else>
        <Skeleton :animation="error || !report.image ? 'none' : 'wave'" class="h-full max-w-75"/>
      </template>
    </section>
    <section class="details__container card-spacer card-spacer-md">
      <slot name="header"></slot>
      <main class="py-0">
        <dl class="info__container">
          <dt>Created at:</dt>
          <dd>
            <TableField :loading="loading" :error="error" loadingHeight="19px" loadingWidth="min(50%, 160px)">
              {{ dateFilter(report.creationDate) }}
            </TableField>
          </dd>
          <dt>Created by:</dt>
          <dd>
            <TableField :loading="loading" :error="error" loadingHeight="19px" loadingWidth="min(55%, 192px)">
              {{ report.user }}
            </TableField>
          </dd>
          <dt>Status:</dt>
          <dd>
            <ReportStatus v-if="!loading && !error" :report="report" class="mr-3"
                          :title="reportStatusFilter(report)" :showLabel="true"/>
            <div v-else class="flex justify-content-start column-gap-3">
              <Skeleton :animation="error ? 'none' : 'wave'" size="19px"/>
              <Skeleton :animation="error ? 'none' : 'wave'" height="19px" width="min(30%, 80px)"/>
            </div>
          </dd>
          <template v-if="!loading && !error && (report.status === 'PENDING' || report.status === 'PUBLISHED')">
            <dt class="evaluation__label">Evaluation</dt>
            <dd class="evaluation__data">
              <dl class="info__container">
                <dt>Grade:</dt>
                <dd>{{ report.evaluation?.grade || 0 }}%</dd>
                <dt>Categories:</dt>
                <dd>
                  <ul v-if="report.evaluation?.categories?.length">
                    <li v-for="category in report.evaluation.categories" :key="category">{{ category.toLowerCase() }}</li>
                  </ul>
                  <template v-else>No categories</template>
                </dd>
              </dl>
            </dd>
          </template>
        </dl>
      </main>
    </section>
    <Overlay class="loading-overlay" v-if="error">
      <Button icon="pi pi-refresh" class="text-white p-button-text" :disabled="loading" @click="$emit('refresh')"/>
    </Overlay>
  </div>
</template>

<script lang="ts" setup>
import Button from 'primevue/button';
import Image from 'primevue/image';
import Skeleton from 'primevue/skeleton';
import { PropType } from 'vue';
import Overlay from '@/components/Overlay.vue';
import TableField from '@/components/TableField.vue';
import LazyTeleport from '@/components/LazyTeleport.vue';
import ReportStatus from '@/components/reports/ReportStatus.vue';
import dateFilter from '@/filters/date';
import fileSizeFilter from '@/filters/file-size';
import imageDimensionsFilter from '@/filters/image-dimensions';
import reportStatusFilter from '@/filters/report-status';
import { ReportDetailsModel } from '@/models/report-details.model';

defineProps({
  report: {
    type: Object as PropType<ReportDetailsModel>,
    required: true
  },
  loading: {
    type: Boolean,
    required: false,
    default: false
  },
  error: {
    type: Boolean,
    required: false,
    default: false
  }
});
defineEmits(['refresh']);
</script>

<style lang="scss" scoped>
@import '@/styles/abstracts/typography';
@import '@/styles/abstracts/variables';

.image__container {
  aspect-ratio: 16 / 9;
  display: flex;
  height: min(max(50vw, 100px), 300px);
  justify-content: center;
  margin: 0 auto $spacer-lg;
  max-width: 100%;
  position: relative;

  :deep(img) {
    height: 100%;
    max-width: 100%;
    object-fit: cover;
  }

  :deep(img, .p-image-preview-indicator) {
    border-radius: 8px;
  }

  dl {
    position: absolute;
    bottom: -0;
    margin: 0;
    display: flex;
    right: $spacer-sm;

    dt {
      margin-left: $spacer-xl;
    }

    dd {
      margin-inline-start: $spacer-xs;
    }

    dt, dd {
      @extend %typ-body-xs;
    }
  }
}

.info__container {
  align-items: center;
  display: grid;
  gap: $spacer-sm;
  grid-template-columns: auto 1fr;

  .evaluation__label,
  .evaluation__data {
    grid-column: 1 / 3;
  }

  .evaluation__data {
    .info__container {
      margin: $spacer-xs 0 0 $spacer-md;
    }
  }

  dt {
    @extend %typ-body-md-medium;
    color: var(--body-color);
  }

  dd {
    @extend %typ-body-md-regular;
    color: var(--gray-600);
    margin-inline-start: 0;
  }
}

.loading-overlay {
  border-radius: 8px;

  :deep(.p-button) {
    width: auto;

    .pi {
      @extend %typ-header-lg;
    }
  }
}

main {
  padding: $spacer-lg;
}

ul {
  list-style-type: none;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0px;

  li {
    display: inline;
    text-transform: capitalize;

    &:not(:last-child) {
      &::after {
        content: ',';
        margin-right: $spacer-xs;
      }
    }
  }
}
</style>
