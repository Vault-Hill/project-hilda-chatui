import { useAtom } from 'jotai';
import { FormProvider, useForm } from 'react-hook-form';
import sendIcon from '../../assets/send-icon.svg';
import { parseFieldNames } from '../../helpers/parseFieldNames';
import { connectionAtom, formAtom } from '../../state/atoms';
import { Field } from '../../types';
import Button from '../elements/Button';
import Input from '../elements/Input';

type Props = {
  fields: Field[];
};

const CustomerAuth: React.FC<Props> = ({ fields }) => {
  const [{ timedOut, messenger }] = useAtom(connectionAtom);
  const [, setForm] = useAtom(formAtom);

  const methods = useForm({
    mode: 'onBlur',
    defaultValues: parseFieldNames(fields),
  });

  const onSubmit = methods.handleSubmit((data) => {
    messenger?.call({
      action: 'prompt',
      adhoc: 'customer-auth',
      message: JSON.stringify(data),
      ghost: true,
    });
    setForm('');
  });
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit} className='border border-white p-5 rounded-md mb-7'>
        <fieldset className='grid grid-cols-2 gap-2' disabled={timedOut}>
          {fields.map((field) => {
            switch (field.element) {
              case 'input':
                return (
                  <Input key={field.name} type={field.type} name={field.name} label={field.label} />
                );
            }
          })}
        </fieldset>
        <Button
          type='submit'
          className='w-12 md:w-24 ml-auto h-12 flex items-center justify-center gap-3 bg-yellow-300 shadow-xl rounded-md  hover:bg-yellow-400 disabled:hover:bg-yellow-300 disabled:cursor-not-allowed'
          disabled={timedOut}
        >
          <span className='text-4 hidden md:block'>Send</span>
          <img src={sendIcon} className='h-4 w-4' alt='send icon' />
        </Button>
      </form>
    </FormProvider>
  );
};

export default CustomerAuth;
