import { FC, Dispatch, SetStateAction, useState } from 'react';

import Button from '../Button/Button';
import Input from '../Input/Input';

import './index.css';

interface OperationProps {
  handleOperation: (
    amount: number,
    setErrorMessage: Dispatch<SetStateAction<string>>,
    errorMessage: string
  ) => void;
}

const ERROR_MESSAGE = 'Операция не может быть выполнена';

const Operation: FC<OperationProps> = ({handleOperation}) => {
  const [amount, setAmount] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  return (
    <div className="operation">
      <h2>Снятие наличных</h2>
        <div className="operation__item">
        <Input value={amount} setValue={setAmount} errorMessage={errorMessage} />
        <Button
          title="Снять"
          onClick={() => handleOperation(+amount, setErrorMessage, ERROR_MESSAGE)}
          isDisabled={!amount}
        />
      </div>
    </div>
  )
};

export default Operation;
