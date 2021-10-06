import { FC, Dispatch, SetStateAction, useState } from 'react';

import Input from '../Input/Input';
import Button from '../Button/Button';

import './index.css';

const ERROR_MESSAGE = 'Ошибка авторизации. Повторите попытку';

interface AuthorizationProps {
  setIsAuthorized: Dispatch<SetStateAction<boolean>>;
  handleLogIn: (pin: string) => boolean;
}

const Authorization: FC<AuthorizationProps> = ({
  setIsAuthorized,
  handleLogIn,
}) => {
  const [pin, setPin] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChangePincode = (newValue: string) => {
    if (newValue.length > 4 || (newValue && /\D/g.test(newValue))) return;
    setPin(newValue);
  };

  const validatePincode = () => {
    if (!pin) {
      setErrorMessage(ERROR_MESSAGE);
      return;
    }

    const isAuthorized = handleLogIn(pin);

    if (!isAuthorized) setErrorMessage(ERROR_MESSAGE);

    setIsAuthorized(isAuthorized);
  };

  return (
    <div className="authorization">
      <h2>Авторизация</h2>
      <div className="authorization__input-wrapper">
        <Input
          type="text"
          value={pin}
          handleOnChange={handleChangePincode}
          placeholder="Введите пинкод"
        />
        <Button title="Ввод" onClick={validatePincode} />
      </div>
      <div className="authorization__error-text">{errorMessage}</div>
    </div>
  )
};

export default Authorization;
