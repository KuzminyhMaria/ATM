import { FC, Dispatch, SetStateAction } from 'react';

import './index.css';

interface InputProps {
  value: number | string;
  minValue?: number;
  setValue?: Dispatch<SetStateAction<string>>;
  type?: string;
  name?: string;
  placeholder?: string;
  errorMessage?: string;
  styleClassName?: string;
  handleOnChange?: (newValue: string, e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: FC<InputProps> = ({
  value,
  minValue,
  setValue,
  type,
  name,
  placeholder,
  errorMessage,
  styleClassName,
  handleOnChange,
}) => {
  const classNames = ['input'];
  if (styleClassName) classNames.push(styleClassName);
  if (errorMessage) classNames.push('error');

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    switch(type) {
      case 'money':
        if (+newValue > 0 || (newValue === '0' && newValue.length > 1) || newValue === '') {
          setValue && setValue(newValue);
        }
        break;
      case 'number':
        handleOnChange && handleOnChange(newValue, e);
        break;
      default:
        setValue && setValue(newValue);
        handleOnChange && handleOnChange(newValue, e);
    }
  };

  return (
    <div className={classNames.join(' ')}>
      {type === 'money' &&
      <input
        className="input__item"
        type={type}
        placeholder={placeholder || ''}
        value={value}
        onChange={handleChangeValue}
      />
      }
      {type === 'number' &&
        <input
          className="input__item"
          type={type}
          min={minValue}
          name={name || ''}
          placeholder={placeholder || ''}
          value={value}
          onChange={handleChangeValue}
        />
      }
      {type === 'text' &&
        <input
          className="input__item"
          type={type}
          placeholder={placeholder || ''}
          value={value}
          onChange={handleChangeValue}
        />
      }
      {errorMessage && <div className="input__errorMessage">{errorMessage}</div>}
    </div>
  )
};

export default Input;
