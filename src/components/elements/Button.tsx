import { classNames } from "../../helpers";

type Props = {
  size?: 'sm' | 'md' | 'lg';
  intent?: 'primary' | 'secondary' | 'danger';
  className?: string;
  children: React.ReactNode;
} & React.ComponentProps<'button'>;

const Button: React.FC<Props> = ({
  size,
  intent,
  className = '',
  disabled,
  children,
  ...props
}) => {
  const classes = classNames(
    intent === 'primary'
      ? 'bg-primary-300'
      : intent === 'secondary'
      ? 'bg-secondary-300'
      : intent == 'danger'
      ? 'bg-danger-300'
      : '',
    size === 'sm' ? 'py-1 px-2 text-sm' : size === 'lg' ? 'py-3 px-6' : 'py-2 px-4',
    disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80',
    'border shadow-md',
    className,
  );

  return (
    <button className={classes} {...props} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
