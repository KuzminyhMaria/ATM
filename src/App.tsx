import { FC, Dispatch, SetStateAction, useState } from 'react';
import { observer } from 'mobx-react-lite';

import Authorization from './components/Authorization/Authorization';
import OperationChoice from './components/OperationChoice/OperationChoice';
import Operation from './components/Operation/Operation';
import atm from './store/atm';
import wallet from './store/wallet';
import card from './store/card';

import { Operations } from './components/Operation/Operation';

import { BanknoteInformation } from './interface';

import './app.css';

const App: FC = observer(() => {
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [currentOperation, setCurrentOperation] = useState<Operations | null>(null);

  const handleWithdrawOperation = (
    value: number,
    setError: Dispatch<SetStateAction<string>>,
  ) => {
    const isCorrect = card.hasRequiredAmount(value, setError);
    if (!isCorrect) return;
    const banknotes = atm.withdraw(value, setError) || [];
    if (!banknotes.length) return;
    card.decrease(value);
    wallet.increase(banknotes);
  };

  const handleDepositOperation = (
    value: BanknoteInformation[],
    setError: Dispatch<SetStateAction<string>>,
  ) => {
    const isCorrect = wallet.decrease(value, setError);
    if (!isCorrect) return;
    atm.deposit(value);
    const amount = atm.returnAmount(value);
    card.increase(amount);
  };

  const handleLogIn = (pin: string) => {
    const isCorrect = card.pinIsCorrect(pin);
    return isCorrect;
  };

  const handleChangeOperation = () => {
    setCurrentOperation(null);
  };

  return (
    <>
      {!isAuthorized ?
        <Authorization setIsAuthorized={setIsAuthorized} handleLogIn={handleLogIn} />
        : (
        currentOperation ? (
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
              <div className="banknotes-information__item">
                <h6>Карта</h6>
                {card.total}
              </div>
            </div>
          </>
        ) : (
          <OperationChoice setOperation={setCurrentOperation} />
        ))}
    </>
  );
})

export default App;
