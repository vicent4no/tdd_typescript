interface IAgeCalculator {
  calculate: (birthDate: Date, targetDate: Date) => number;
  hasBirthdayAlreadyPassed: (birthDate: Date, targetDate: Date) => boolean;
}

export class AgeCalculator implements IAgeCalculator {
  private _hasBirthdayAlreadyPassed: (
    birthDate: Date,
    targetDate: Date,
  ) => boolean;

  constructor() {
    this._hasBirthdayAlreadyPassed = (birthDate: Date, targetDate: Date) => {
      if (targetDate.getMonth() - birthDate.getMonth() > 0) return true;
      if (targetDate.getMonth() - birthDate.getMonth() < 0) return false;
      if (targetDate.getDate() - birthDate.getDate() >= 0) return true;
      return false;
    };
  }

  get hasBirthdayAlreadyPassed() {
    return this._hasBirthdayAlreadyPassed;
  }

  public calculate(birthDate: Date, targetDate: Date) {
    return this.hasBirthdayAlreadyPassed(birthDate, targetDate)
      ? targetDate.getFullYear() - birthDate.getFullYear()
      : targetDate.getFullYear() - birthDate.getFullYear() - 1;
  }
}
