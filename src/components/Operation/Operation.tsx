import { FC, Dispatch, SetStateAction } from 'react';

import WithdrawOperation from './WithdrawOperation';
import DepositOperation from './DepositOperation';
import Button from '../Button/Button';

import { BanknoteInformation } from '../../interface';

import './index.css';

export enum Operations {
  WITHDRAW = 'withdraw',
  DEPOSITE = 'deposit',
}

export const ERROR_MESSAGE = 'Операция не может быть выполнена';

interface OperationProps {
  operation: Operations;
  handleNumberOperation?: (
    amount: number,
    setErrorMessage: Dispatch<SetStateAction<string>>,
  ) => void;
  handleArrayOperation?: (
    value: BanknoteInformation[],
    setErrorMessage: Dispatch<SetStateAction<string>>,
  ) => void;
  handleChangeOperation: () => void;
}

const Operation: FC<OperationProps> = ({
  operation,
  handleNumberOperation,
  handleArrayOperation,
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
        if (handleNumberOperation)
          return <WithdrawOperation handleOperation={handleNumberOperation} />;
        else break;
      case Operations.DEPOSITE:
        if (handleArrayOperation)
          return <DepositOperation handleOperation={handleArrayOperation} />;
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
