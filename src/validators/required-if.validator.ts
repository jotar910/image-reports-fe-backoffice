export default <T>(cb: (value: T) => boolean) => ({
  $message: 'Value is required',
  $validator: (value: T) => !cb(value) || !!value
});
