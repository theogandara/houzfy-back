import crypto from "crypto";
import { validateCpf } from "./validateCpf";
import Password from "./vo/Password";

export default class Account {
  private constructor(
    readonly accountId: string,
    readonly name: string,
    readonly email: string,
    readonly cpf: string,
    private password: string
  ) {
    if (!name.match(/[a-zA-Z] [a-zA-Z]+/)) throw new Error("Name is invalid");
    if (!email.match(/^(.+)@(.+)$/)) throw new Error("Email is invalid");
    if (!validateCpf(cpf)) throw new Error("CPF is invalid");
  }

  static create(name: string, email: string, cpf: string, rawPassword: string) {
    if (!name) throw new Error("The name field is missing");
    if (!email) throw new Error("The email field is missing");
    if (!cpf) throw new Error("The cpf field is missing");
    const accountId = crypto.randomUUID();
    const password = Password.create(rawPassword).getValue();
    return new Account(accountId, name, email, cpf, password);
  }

  static restore(
    accountId: string,
    name: string,
    email: string,
    cpf: string,
    password?: string
  ) {
    if (!name) throw new Error("The name field is missing");
    if (!email) throw new Error("The email field is missing");
    if (!cpf) throw new Error("The cpf field is missing");
    return new Account(accountId, name, email, cpf, password || "");
  }

  setPassword(password: string) {
    this.password = Password.create(password).getValue();
  }

  getPassword() {
    return this.password;
  }
}
