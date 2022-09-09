export default Symbol('Toast configs provider identifier');

export interface IToastConfig {
  error: IConfig;
  warning: IConfig;
  success: IConfig;
}

interface IConfig {
  severity: string;
  closable: boolean;
  life?: number;
}

export const createToastConfig = (): IToastConfig => ({
  error: {
    severity: 'error',
    life: 15000,
    closable: true
  },
  warning: {
    severity: 'warning',
    closable: true
  },
  success: {
    severity: 'success',
    life: 5000,
    closable: true
  },
});
