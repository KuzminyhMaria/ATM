import { FC, Dispatch, SetStateAction } from 'react';

import WithdrawOperation from './WithdrawOperation';
import DepositOperation from './DepositOperation';
import Button from '../Button/Button';

import './index.css';

export enum Operations {
  WITHDRAW = 'withdraw',
  DEPOSITE = 'deposit',
}

export const ERROR_MESSAGE = 'Операция не может быть выполнена';

interface OperationProps {
  operation: Operations;
  handleOperation: (
    amount: number,
    setErrorMessage: Dispatch<SetStateAction<string>>,
    errorMessage: string
  ) => void;
  handleChangeOperation: () => void;
}

const Operation: FC<OperationProps> = ({
  operation,
  handleOperation,
  handleChangeOperation,
}) => {
  const handlePickTitle = () => {
    switch (operation) {
      case Operations.WITHDRAW:
        return 'Снятие';
      case Operations.DEPOSITE:
        return 'Внесение';
    }
  };

  const returnOperation = () => {
    switch (operation) {
      case Operations.WITHDRAW:
        return <WithdrawOperation handleOperation={handleOperation} />;
      case Operations.DEPOSITE:
        return <DepositOperation />;
    }
  };

  return (
    <div className="operation">
      <h2>{handlePickTitle()} наличных</h2>  
      <div className="operation__item">
        {returnOperation()}
        <Button title="Изменить операцию" onClick={handleChangeOperation}  />
      </div>
    </div>
  )
};

export default Operation;
