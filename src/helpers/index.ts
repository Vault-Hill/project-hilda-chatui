export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const classNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(' ');
};
