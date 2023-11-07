import { Field } from '../types';

export const parseFieldNames = (fields: Field[]) => {
  const defaultValues: Record<string, string> = fields.reduce(
    (acc, field) => ({ ...acc, [field.name]: '' }),
    {},
  );

  return defaultValues;
};
