export interface IFileUploadConfig {
  maxFileSize: number;
  multiple: boolean;
}

export const createFileUploadConfig = (): IFileUploadConfig => ({
  maxFileSize: 10_000_000,
  multiple: false
});

export default Symbol('File upload configs provider identifier');
