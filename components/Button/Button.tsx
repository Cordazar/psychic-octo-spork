import React from 'react';

export enum ButtonType {
  'Primary' = 'PRIMARY',
  'Secondary' = 'SECONDARY',
}

interface Props {
  children?: React.ReactNode;
  onClick?: () => void;
  variant?: ButtonType;
}

const Button: React.FC<Props> = ({
  children,
  onClick,
  variant = ButtonType.Secondary,
}) => {
  const baseClasses =
    'inline-flex items-center justify-center px-5 py-2 border border-transparent text-base font-medium rounded-md';
  const typesClasses = {
    [ButtonType.Primary]: `${baseClasses} text-white bg-violet-600 hover:bg-violet-700`,
    [ButtonType.Secondary]: `${baseClasses} text-violet-600 bg-white hover:bg-violet-50 hover:border-violet-600`,
  };

  return (
    <button onClick={onClick} className={typesClasses[variant]}>
      {children}
    </button>
  );
};

export default Button;
