export default class Password {
  private constructor(readonly value: string) {
    if (value.length < 8) throw new Error("Password is invalid");
  }

  static create(value: string) {
    return new Password(value);
  }

  getValue() {
    return this.value;
  }
}
