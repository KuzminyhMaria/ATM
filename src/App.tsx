import { FC, Dispatch, SetStateAction, useState } from 'react';
import { observer } from 'mobx-react-lite';

import OperationChoice from './components/OperationChoice/OperationChoice';
import Operation from './components/Operation/Operation';
import atm from './store/atm';
import wallet from './store/wallet';

import { Operations } from './components/Operation/Operation';

import './app.css';

const App: FC = observer(() => {
  const [currentOperation, setCurrentOperation] = useState<Operations | null>(Operations.DEPOSITE);

  const handleWithdrawOperation = (
    value: number, setError: Dispatch<SetStateAction<string>>, errorMessage: string
  ) => {
    const banknotes = atm.withdraw(value, setError, errorMessage) || [];
    if (!banknotes.length) return;
    wallet.increase(banknotes);
  };

  const handleDepositOperation = (
    value: number, setError: Dispatch<SetStateAction<string>>, errorMessage: string
  ) => {
    
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
              handleOperation={handleWithdrawOperation}
              handleChangeOperation={handleChangeOperation}
            />
          }
          {currentOperation === Operations.DEPOSITE &&
            <Operation
              operation={currentOperation}
              handleOperation={handleDepositOperation}
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
