export default Symbol('API Data configs provider identifier');

export interface IApiDataConfig {
  apiPath: string
  apiStoragePath: string
  apiVersion: string
}

export const createApiDataConfig = (): IApiDataConfig => ({
  apiPath: process.env.API_PATH || 'http://localhost:8080',
  apiStoragePath: process.env.API_STORAGE_PATH || 'http://localhost:8084',
  apiVersion: process.env.API_VERSION || 'v1',
});
