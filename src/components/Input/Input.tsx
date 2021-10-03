import { FC, Dispatch, SetStateAction } from 'react';

import './index.css';

interface InputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  errorMessage?: string;
}

const Input: FC<InputProps> = ({
  value,
  setValue,
  errorMessage,
}) => {
  const classNames = ['input'];
  if (errorMessage) classNames.push('error');

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (+newValue > 0 || (newValue === '0' && newValue.length > 1) || newValue === '') {
      setValue(newValue);
    }
  };

  return (
    <div className={classNames.join(' ')}>
      <input
        className="input__item"
        type="mony"
        value={value}
        onChange={handleChangeValue}
      />
      {errorMessage && <div className="input__errorMessage">{errorMessage}</div>}
    </div>
  )
};

export default Input;
