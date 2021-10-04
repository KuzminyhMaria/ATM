import { FC, Dispatch, SetStateAction, useState } from 'react';

import Button from '../Button/Button';
import Input from '../Input/Input';

import { ERROR_MESSAGE } from './Operation';

import './index.css';

interface WithdrawOperationProps {
  handleOperation: (
    amount: number,
    setErrorMessage: Dispatch<SetStateAction<string>>,
    errorMessage: string
  ) => void;
}

const WithdrawOperation: FC<WithdrawOperationProps> = ({
  handleOperation,
}) => {
  const [amount, setAmount] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  return (
    <>
      <div className="operation__item">
        <Input
          value={amount}
          setValue={setAmount}
          type="money"
          placeholder="Введите сумму"
          errorMessage={errorMessage}
        />
      </div>
      <Button
        title="Снять"
        onClick={() => handleOperation(+amount, setErrorMessage, ERROR_MESSAGE)}
        isDisabled={!amount}
      />
    </>
  )
};

export default WithdrawOperation;
