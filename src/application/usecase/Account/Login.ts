import { PasswordService } from "../../../domain/ds/PasswordService";
import { AccountRepository } from "../../../infra/repository/AccountRepository";
import jwt from "jsonwebtoken";

export default class Login {
  constructor(
    readonly accountRepository: AccountRepository,
    readonly passwordService: PasswordService
  ) {}

  async execute(input: LoginInput): Promise<LoginOutput> {
    const existingAccount = await this.accountRepository.getByEmailWithPassword(
      input.email
    );
    if (!existingAccount) throw new Error("Invalid credentials");
    const passwordMatch = await this.passwordService.compare(
      input.password,
      existingAccount.getPassword()
    );
    if (!passwordMatch) throw new Error("Invalid credentials");
    const token = jwt.sign({ email: existingAccount.email }, "SECRET_KEY", {
      expiresIn: "24h",
    });

    return { jwt: token };
  }
}

type LoginInput = {
  email: string;
  password: string;
};

type LoginOutput = {
  jwt: string;
};
