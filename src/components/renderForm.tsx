import { Form } from '../types';
import CustomerAuth from './forms/CustomerAuth';

export const renderForm = (form: Form) => {
  switch (form.type) {
    case 'customer-auth':
      return <CustomerAuth fields={form.fields} />;

    default:
      return null;
  }
};
