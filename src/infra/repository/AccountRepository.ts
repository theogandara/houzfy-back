import Account from "../../domain/Account";
import DatabaseConnection from "../database/DatabaseConnection";

export interface AccountRepository {
  save(account: Account): Promise<void>;
  getByEmail(email: string): Promise<Account | undefined>;
  getById(accountId: string): Promise<Account | undefined>;
}

export default class AccountRepositoryDatabase implements AccountRepository {
  constructor(readonly connection: DatabaseConnection) {}

  async save(account: Account) {
    await this.connection.query(
      "insert into houzfy.account (account_id, name, email, cpf) values ($1, $2, $3, $4)",
      [account.accountId, account.name, account.email, account.cpf]
    );
  }
  async getByEmail(email: string) {
    const [account] = await this.connection.query(
      "select * from houzfy.account where email = $1",
      [email]
    );
    if (!account) return;
    return Account.restore(
      account.account_id,
      account.name,
      account.email,
      account.cpf
    );
  }
  async getById(accountId: string) {
    const [account] = await this.connection.query(
      "select * from houzfy.account where account_id = $1",
      [accountId]
    );
    if (!account) return;
    return Account.restore(
      account.account_id,
      account.name,
      account.email,
      account.cpf
    );
  }
}
