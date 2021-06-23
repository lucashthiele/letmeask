//Dependências
import { ButtonHTMLAttributes } from 'react';
//Styles
import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {

  return (
    <button className="button" {...props} />
  )
}
