import { makeAutoObservable } from 'mobx';

import { BanknoteInformation } from '../interface';

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

  decrease() {
    
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