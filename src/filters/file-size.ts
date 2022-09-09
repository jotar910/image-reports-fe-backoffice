const interval = 1000;
const units = ['B', 'KB', 'MB', 'GB'];
const maxUnitIndex = units.length - 1;

function resolveSizeLabel(value: number, index = 0): string {
  if (index >= maxUnitIndex) {
    return `${value} ${units[maxUnitIndex]}`;
  }
  if (value < interval) {
    return `${value} ${units[index]}`;
  }
  return resolveSizeLabel(Math.floor(value / interval), index + 1);
}

export default (size: number) => {
  return resolveSizeLabel(size);
};
