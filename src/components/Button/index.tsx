import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
}

export const Button = ({ className = '', children, ...props }: ButtonProps) => {
  return (
    <button
      className={className}
      {...props}
    >
      {children}
    </button>
  );
};
