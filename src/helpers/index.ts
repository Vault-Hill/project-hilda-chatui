export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const classNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(' ');
};

export const objectOrString = (str: string) => {
  try {
    const parsedObject = JSON.parse(str);
    return typeof parsedObject === 'object' && parsedObject !== null && parsedObject;
  } catch (error) {
    return str;
  }
}

