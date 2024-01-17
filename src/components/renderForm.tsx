import { Form } from '../types';
import CustomerAuth from './forms/CustomerAuth';

export const renderForm = (form: Form) => {
  switch (form.title) {
    case 'Contact Information':
      return <CustomerAuth fields={form.fields} />;

    default:
      return null;
  }
};
