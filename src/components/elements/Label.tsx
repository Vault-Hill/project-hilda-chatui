type LabelProps = {
  required?: boolean;
} & React.ComponentProps<'label'>;

export const Label: React.FC<LabelProps> = ({ required, children }) => {
  return (
    <label className='mb-2 flex'>
      {children}:{required && <span className='text-red-400'>*</span>}
    </label>
  );
};

export default Label;
