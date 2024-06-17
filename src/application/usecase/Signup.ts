import Account from "../../domain/Account";
import { AccountRepository } from "../../infra/repository/AccountRepository";

export default class Signup {
  constructor(readonly accountRepository: AccountRepository) {}

  async execute(input: Omit<Account, "accountId">) {
    const existingAccount = await this.accountRepository.getByEmail(
      input.email
    );
    if (existingAccount) throw new Error("Email already in use");
    const account = Account.create(input.name, input.email, input.cpf);
    await this.accountRepository.save(account);
    return {
      accountId: account.accountId,
    };
  }
}
