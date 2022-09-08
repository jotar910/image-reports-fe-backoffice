import { ValidationArgs } from '@vuelidate/core';
import { required, url } from '@vuelidate/validators';
import requiredIf from '@/validators/required-if.validator';
import { CreateReportModel } from '@/models/create-report.model';

export class CreateReportFactory {
  static emptyForm = (): CreateReportModel => ({
    name: '',
    callback: '',
    type: 'file',
    url: '',
    file: ''
  });

  static formValidations = (form: CreateReportModel): ValidationArgs<CreateReportModel> => ({
    name: { required },
    callback: {
      required,
      url
    },
    type: {},
    url: {
      required: requiredIf(() => form.type === 'url'),
      url
    },
    file: { requiredIf: requiredIf(() => form.type === 'file') }
  });
}
