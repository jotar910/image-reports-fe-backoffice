import { nextTick } from 'vue';

export default { mounted: (el: HTMLElement) => nextTick(() => el.focus?.()) };
