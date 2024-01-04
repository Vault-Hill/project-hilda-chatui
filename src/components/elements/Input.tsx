import { RegisterOptions, useFormContext } from 'react-hook-form';
import { classNames } from '../../helpers';
import Label from './Label';

type Props = {
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  type?: 'text' | 'password' | 'number' | 'time' | 'email' | 'hidden' | 'date' | 'tel';
  validation?: RegisterOptions;
  detached?: boolean;
} & React.ComponentProps<'input'>;

const Input: React.FC<Props> = ({
  detached,
  name,
  type,
  validation,
  label,
  className = '',
  required,
  ...props
}) => {
  const { register, formState } = useFormContext() ?? {};
  const { errors, touchedFields } = formState ?? {};
  const isTouched = touchedFields?.[name];
  const hasError = !!errors?.[name] && isTouched;

  return (
    <div className='text-sm'>
      {label && <Label required={required}>{label}</Label>}
      <input
        name={name}
        type={type}
        {...(detached ? {} : register(name, validation))}
        className={classNames(
          'w-full border rounded-lg overflow-hidden border-white border-opacity-10 focus:ring-0 bg-white bg-opacity-10  focus:outline-none px-4 py-2 disabled:text-neutral-500 disabled:bg-slate-100 disabled:hover:cursor-not-allowed',
          className,
        )}
        {...props}
      />
      {hasError && (
        <div className='mb-1 text-sm text-red-400'>{errors[name]?.message as string}</div>
      )}
    </div>
  );
};

export default Input;
