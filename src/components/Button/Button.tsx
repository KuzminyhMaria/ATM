import { FC } from 'react';

import './index.css';

interface ButtonProps {
  title: string;
  onClick: () => void;
  isDisabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  title,
  onClick,
  isDisabled = false,
}) => {
  const classNames = ['button'];
  if (isDisabled) classNames.push('disabled');

  return (
    <button
      className={classNames.join(' ')}
      onClick={onClick}
      disabled={isDisabled}
    >
      {title}
    </button>
  )
};

export default Button;
