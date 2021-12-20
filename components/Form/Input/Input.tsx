import React, { InputHTMLAttributes } from 'react';

export type InputProps = {
  id: string;
  label: string;
  placeholder: string;
  required?: boolean;
  type?: string;
  pattern?: string;
};

const classes = {
  input:
    'w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4',
};

const Input: React.FC<InputProps & InputHTMLAttributes<HTMLInputElement>> = ({
  id,
  label,
  placeholder,
  type,
  pattern,
  required,
  ...rest
}): JSX.Element => {
  return (
    <div
      style={{
        width: 'calc(50% - 1em)',
        marginRight: '.5em',
        marginLeft: '.5em',
      }}
    >
      <label htmlFor={id}>{label}</label>
      <input
        type={type || 'text'}
        className={classes.input}
        id={id}
        placeholder={placeholder}
        required={required || false}
        pattern={pattern}
        {...rest}
      />
    </div>
  );
};

export default Input;
