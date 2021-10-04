import { FC, Dispatch, SetStateAction } from 'react';

import Button from '../Button/Button';
import { Operations } from '../Operation/Operation';

import './index.css';

interface Operation {
  setOperation: Dispatch<SetStateAction<Operations | null>>;
}

const OperationChoice: FC<Operation> = ({setOperation}) => {
  return (
    <>
      <h2>Выберите операцию</h2>
      <div className="operation-choice">
        <Button title="Снять наличные" onClick={() => setOperation(Operations.WITHDRAW)} />
        <Button title="Внести наличные" onClick={() => setOperation(Operations.DEPOSITE)} />
      </div>
    </>
  )
};

export default OperationChoice;
