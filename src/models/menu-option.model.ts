import { MenuItem } from 'primevue/menuitem';

export interface MenuOption<TOption extends string = string> extends MenuItem {
  key: TOption;
  label: string;
}
