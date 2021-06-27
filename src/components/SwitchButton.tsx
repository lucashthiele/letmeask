import { ButtonHTMLAttributes } from 'react';
import '../styles/switch-button.scss';
import { CgSun } from 'react-icons/cg'
import { HiMoon } from 'react-icons/hi'
import { useTheme } from '../hooks/useTheme'
 

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function SwitchButton({...props}: ButtonProps){
  const { theme, toggleTheme } = useTheme();
  const icon = theme === 'light' ? <HiMoon size={30} /> : <CgSun color='#27241d' size={30} />

  return (
      <button className='switch' onClick={toggleTheme}>{icon}</button>
  )
}