import { Dispatch, SetStateAction } from 'react';
import { makeAutoObservable } from 'mobx';

import { BanknoteInformation } from '../interface';
import { ERROR_MESSAGE } from '../components/Operation/Operation';

class ATM {
  cassets = [
    {
      banknote: 5000,
      count: 4,
    },
    {
      banknote: 2000,
      count: 6,
    },
    {
      banknote: 1000,
      count: 9,
    },
    {
      banknote: 500,
      count: 8,
    },
    {
      banknote: 200,
      count: 2,
    },
    {
      banknote: 100,
      count: 5,
    }
  ]

  constructor() {
    makeAutoObservable(this)
  }

  get calculateTotal() {
    let newTotal = 0;
    this.cassets.forEach((item) => {
      newTotal += item.banknote * item.count;
    });
    return newTotal;
  }

  withdraw(value: number, setError: Dispatch<SetStateAction<string>>) {
    // Проверка возможности проведения операции
    if (value % 100 !== 0) {
      setError(ERROR_MESSAGE);
      return;
    }

    // Проверка наличия нужной суммы в банкомате
    if (this.calculateTotal < value) {
      setError(ERROR_MESSAGE);
      return;
    }

    // Проверка наличия банкнот нужного номинала в банкомате
    const banknotesForWithdrawal = this.banknotesCountingForWithdrawal(value);

    if (!banknotesForWithdrawal) {
      setError(ERROR_MESSAGE);
      return;
    }

    setError('');

    // Извлечение снимаемых купюр из кассет
    banknotesForWithdrawal.forEach((item) => {
      const index = this.cassets.findIndex(el => el.banknote === item.banknote);
      this.cassets[index].count -= item.count;
    })

    return banknotesForWithdrawal;
  }

  deposit(value: BanknoteInformation[]) {
    value.forEach(item => {
      const index = this.cassets.findIndex(el => el.banknote === item.banknote);
      this.cassets[index].count += item.count;
    })
  }

  // Подсчёт нужного кол-ва банкнот для выдачи
  private banknotesCountingForWithdrawal = (value: number) => {
    let remainingValue = value;
    const banknotes: BanknoteInformation[] = [];
  
    for (let i = 0; i < this.cassets.length; i++) {
      const currentBanknote = this.cassets[i].banknote;
      let count = Math.trunc(remainingValue / currentBanknote);
      if (this.cassets[i].count < count) {
        if (this.cassets[i].count) {
          count = this.cassets[i].count;
          remainingValue = this.changeRemainingValue(remainingValue, currentBanknote, count);
          this.changeBanknotesForWithdrawal(banknotes, currentBanknote, count);
        }
        if (i === this.cassets.length - 1) {
          return null;
        }
      } else if (count) {
        remainingValue = this.changeRemainingValue(remainingValue, currentBanknote, count);
        this.changeBanknotesForWithdrawal(banknotes, currentBanknote, count);
      }
    }
    return banknotes;
  }

  private changeRemainingValue = (
    value: number,
    banknote: number,
    count: number,
  ) => { return value -= banknote * count; }

  private changeBanknotesForWithdrawal = (
    banknotes: BanknoteInformation[],
    banknote: number,
    count: number,
  ) => {
    banknotes.push({banknote: banknote, count});
  }
}

export default new ATM()
