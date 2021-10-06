import { Dispatch, SetStateAction } from 'react';
import { makeAutoObservable } from 'mobx';

import { ERROR_MESSAGE } from '../components/Operation/Operation';

class Card {
  private pin = '1234'
  total = 7400;

  constructor() {
    makeAutoObservable(this)
  }

  // Проверка возможности проведения операции
  hasRequiredAmount(value: number, setError: Dispatch<SetStateAction<string>>) {
    const isCorrect = this.total >= value;

    if (!isCorrect) {
      setError(ERROR_MESSAGE);
      return;
    }

    setError('');

    return isCorrect;
  }

  decrease(value: number) { 
    this.total -= value;
  }

  increase(value: number) {
    this.total += value;
  }

  pinIsCorrect(value: string) {
    if (value === this.pin) return true;
    else return false;
  }
}

export default new Card()