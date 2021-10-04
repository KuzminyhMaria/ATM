import { FC, Dispatch, SetStateAction, useState } from 'react';
import { observer } from 'mobx-react-lite';

import OperationChoice from './components/OperationChoice/OperationChoice';
import Operation from './components/Operation/Operation';
import atm from './store/atm';
import wallet from './store/wallet';

import { Operations } from './components/Operation/Operation';

import { BanknoteInformation } from './interface';

import './app.css';

const App: FC = observer(() => {
  const [currentOperation, setCurrentOperation] = useState<Operations | null>(null);

  const handleWithdrawOperation = (
    value: number,
    setError: Dispatch<SetStateAction<string>>,
  ) => {
    const banknotes = atm.withdraw(value, setError) || [];
    if (!banknotes.length) return;
    wallet.increase(banknotes);
  };

  const handleDepositOperation = (
    value: BanknoteInformation[],
    setError: Dispatch<SetStateAction<string>>,
  ) => {
    const isCorrect = wallet.decrease(value, setError);
    if (!isCorrect) return;
    atm.deposit(value);
  };

  const handleChangeOperation = () => {
    setCurrentOperation(null);
  };

  return (
    <>
      {currentOperation ? (
        <>
          {currentOperation === Operations.WITHDRAW &&
            <Operation
              operation={currentOperation}
              handleNumberOperation={handleWithdrawOperation}
              handleChangeOperation={handleChangeOperation}
            />
          }
          {currentOperation === Operations.DEPOSITE &&
            <Operation
              operation={currentOperation}
              handleArrayOperation={handleDepositOperation}
              handleChangeOperation={handleChangeOperation}
            />
          }
          <div className="banknotes-information">
            <div className="banknotes-information__item">
              <h6>Банкомат</h6>
              {atm.cassets.map(item => (
                item.count > 0  && <div key={`atm-${item.banknote}`}>{item.banknote} &times;{item.count}</div>
              ))}
            </div>
            <div className="banknotes-information__item">
              <h6>Кошелёк</h6>
              {wallet.wallet.map(item => (
                item.count > 0  && <div key={`wallet-${item.banknote}`}>{item.banknote} &times;{item.count}</div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <OperationChoice setOperation={setCurrentOperation} />
      )}
    </>
  );
})

export default App;
