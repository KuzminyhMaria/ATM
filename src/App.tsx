import { FC, Dispatch, SetStateAction } from 'react';
import { observer } from 'mobx-react-lite';

import Operation from './components/Operation/Operation';
import atm from './store/atm';
import wallet from './store/wallet';

import './app.css';

const App: FC = observer(() => {
  const handleWithdrawOperation = (
    value: number, setError: Dispatch<SetStateAction<string>>, errorMessage: string
  ) => {
    const banknotes = atm.withdraw(value, setError, errorMessage) || [];
    if (!banknotes.length) return;
    wallet.increase(banknotes);
  };

  return (
    <>
      <Operation handleOperation={handleWithdrawOperation} />
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
  );
})

export default App;
