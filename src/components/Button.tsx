//Dependências
import { ButtonHTMLAttributes } from 'react';
import { useTheme } from '../hooks/useTheme';
//Styles
import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export function Button({ isOutlined = false, ...props }: ButtonProps) {
  const { theme } = useTheme();

  return (
    <button className={`button ${isOutlined ? 'outlined' : ''} ${theme === 'dark' && 'dark'}`} {...props} />
  )
}
