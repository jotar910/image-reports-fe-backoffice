import capitalize from 'lodash/capitalize';

// TODO: add type.
export default (value: any) => {
  return capitalize(value.status === 'PUBLISHED' ? value.approval.status : value.status);
};
