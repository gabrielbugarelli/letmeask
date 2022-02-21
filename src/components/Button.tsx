import {ButtonHTMLAttributes} from 'react' 

import './button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = (props: ButtonProps) => {
  return (
    <button className="button" {...props} />
  )
}
