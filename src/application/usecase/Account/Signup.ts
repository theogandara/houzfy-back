import Account from "../../../domain/entity/Account";
import { PasswordService } from "../../../domain/ds/PasswordService";
import { AccountRepository } from "../../../infra/repository/AccountRepository";

export default class Signup {
  constructor(
    readonly accountRepository: AccountRepository,
    readonly passwordService: PasswordService
  ) {}

  async execute(input: SignupInput): Promise<SignupOutput> {
    const existingAccount = await this.accountRepository.getByEmail(
      input.email
    );
    if (existingAccount) throw new Error("Email already in use");
    const account = Account.create(
      input.name,
      input.email,
      input.cpf,
      input.password
    );
    const hashedPassword = await this.passwordService.hash(input.password);
    account.setPassword(hashedPassword);
    await this.accountRepository.save(account);
    return { accountId: account.accountId };
  }
}

type SignupInput = {
  name: string;
  email: string;
  cpf: string;
  password: string;
};

type SignupOutput = {
  accountId: string;
};
