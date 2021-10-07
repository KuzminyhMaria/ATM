import { Dispatch, SetStateAction } from 'react';
import { makeAutoObservable } from 'mobx';

import { BanknoteInformation } from '../interface';
import { ERROR_MESSAGE } from '../components/Operation/Operation';

class Wallet {
  wallet = [
    {
      banknote: 2000,
      count: 1,
    },
    {
      banknote: 1000,
      count: 4,
    },
    {
      banknote: 100,
      count: 2,
    }
  ]

  constructor() {
    makeAutoObservable(this)
  }

  increase(value: BanknoteInformation[]) {
    for (let i = 0; i < value.length; i++) {
      const index = this.wallet.findIndex(item => item.banknote === value[i].banknote);
      if (index !== -1) this.wallet[index].count += value[i].count;
      else {
        this.wallet.push({banknote: value[i].banknote, count: value[i].count});
      }
    }

    this.sortingBanknotes();
  }

  decrease(value: BanknoteInformation[], setError: Dispatch<SetStateAction<string>>) {
    // Проверка возможности проведения операции
    const isCorrect = this.hasRequiredBanknotes(value);

    if (!isCorrect) {
      setError(ERROR_MESSAGE);
      return;
    }

    setError('');

    value.forEach(item => {
      const index = this.wallet.findIndex(el => el.banknote === item.banknote);
      this.wallet[index].count -= item.count;
    });

    this.wallet = this.clearFromNullCountBanknotes();

    return true;
  }
  
  // Проверка наличия банкнот нужного номинала в кошельке
  private hasRequiredBanknotes (value: BanknoteInformation[]) {
    for (let i = 0; i < value.length; i++) {
      const index = this.wallet.findIndex(item => item.banknote === value[i].banknote);
      if (index === -1 || this.wallet[index].count < value[i].count) return false;
    }
    return true;
  }

  // Формирование нового wallet без банкнот в 0 кол-ве
  private clearFromNullCountBanknotes() {
    const newWallet: BanknoteInformation[] = [];
    this.wallet.forEach(item => {
      if (item.count !== 0) newWallet.push(item);
    })
    return newWallet;
  }

  // Сортировка по убыванию номинала банкнот
  private sortingBanknotes = () => {
    this.wallet.sort((prev: BanknoteInformation, next: BanknoteInformation): number => {
      if ( prev.banknote > next.banknote ) return -1;
      if ( prev.banknote < next.banknote ) return 1;
      return 0;
    });
  }
}

export default new Wallet()