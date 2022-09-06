export default (value: number) => {
  const date = new Date(value);
  return date.toLocaleString(['en-US'], {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    minute: '2-digit',
    hour: '2-digit',
    hour12: true
  });
};
