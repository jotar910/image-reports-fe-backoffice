import { MenuOption } from '@/models/menu-option.model';

export type MenuOptionType = 'Details' | 'Approve' | 'Reject';

export type ReportMenuOption = MenuOption<MenuOptionType>;
