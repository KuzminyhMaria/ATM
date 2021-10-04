import { FC, Dispatch, SetStateAction, useState } from 'react';

import Button from '../Button/Button';
import Input from '../Input/Input';

import atm from '../../store/atm';
import { BanknoteInformation } from '../../interface';

import { ERROR_MESSAGE } from './Operation';

import './index.css';

interface DepositOperationProps {

}

const DepositOperation: FC<DepositOperationProps> = () => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [banknotesCount, setBanknotesCount] = useState<BanknoteInformation[]>(atm.cassets.map(item => (
    {banknote: item.banknote, count: 0}
  )));

  const handleChangeBanknotes = (newValue: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const banknote = +e?.target.name;
    const index = banknotesCount.findIndex(item => item.banknote === banknote);
    setBanknotesCount([
      ...banknotesCount.slice(0, index),
      {banknote, count: newValue },
      ...banknotesCount.slice(index + 1),
    ]);
  };

  const handleOperation = (setErrorMessage: Dispatch<SetStateAction<string>>, errorMessageText: string) => {
    const banknotesForDeposit: BanknoteInformation[] = [];
    banknotesCount.forEach(item => {
      if (item.count) banknotesForDeposit.push(item);
    });

    console.log(banknotesForDeposit)
  };

  return (
    <>
      <div className="operation__item">
        <div className="operation__inputs operation__inputs_deposit">
          {atm.cassets.map((item, index) => {
            return (
              <div className="operation__input-box operation__input-box_deposit" key={`operation-${item.banknote}`}>
                <div>{item.banknote}</div>
                <Input
                  name={banknotesCount[index].banknote.toString()}
                  value={banknotesCount[index].count.toString()}
                  minValue={0}
                  type="number"
                  placeholder="Введите кол-во"
                  errorMessage={errorMessage}
                  styleClassName="operation__input"
                  handleOnChange={handleChangeBanknotes}
                />
              </div>
            );
          })}
        </div>
        <Button
          title="Внести"
          onClick={() => handleOperation(setErrorMessage, ERROR_MESSAGE)}
        />
      </div>
    </>
  )
};

export default DepositOperation;
