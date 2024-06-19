// import GetAccount from "../src/application/usecase/GetAccount";
// import Signup from "../src/application/usecase/Signup";
// import { PGPromiseAdapter } from "../src/infra/database/DatabaseConnection";
// import AccountRepositoryDatabase from "../src/infra/repository/AccountRepository";

// let signup: Signup;
// let getAccount: GetAccount;
// let connection: PGPromiseAdapter;

// beforeEach(() => {
//   connection = new PGPromiseAdapter();
//   const accountRepository = new AccountRepositoryDatabase(connection);
//   signup = new Signup(accountRepository);
//   getAccount = new GetAccount(accountRepository);
// });

// test("Create account", async function () {
//   const input = {
//     name: "Jhon Doe",
//     email: `john.doe.${Math.random()}@example.com`,
//     cpf: "123.456.789-09",
//   };
//   const result = await signup.execute(input);
//   expect(result).toBeDefined();

//   const outputGetAccount = await getAccount.execute(result.accountId);
//   expect(outputGetAccount.name).toBe(input.name);
//   expect(outputGetAccount.email).toBe(input.email);
//   expect(outputGetAccount.cpf).toBe(input.cpf);
// });

// test("Return error when CPF is invalid", async function () {
//   const input = {
//     name: "John Doe",
//     email: `john.doe.${Math.random()}@example.com`,
//     cpf: "09",
//   };
//   await expect(() => signup.execute(input)).rejects.toThrow(
//     new Error("CPF is invalid")
//   );
// });

// test("Return error when email is invalid", async function () {
//   const input = {
//     name: "John Doe",
//     email: `john.doe.${Math.random()}`,
//     cpf: "123.456.789-09",
//   };
//   await expect(() => signup.execute(input)).rejects.toThrow(
//     new Error("Email is invalid")
//   );
// });

// test("Return error when NAME is invalid", async function () {
//   const input = {
//     name: "",
//     email: `john.doe.${Math.random()}`,
//     cpf: "123.456.789-09",
//   };
//   await expect(() => signup.execute(input)).rejects.toThrow(
//     new Error("Name is invalid")
//   );
// });

// test("Return error when user already exists", async function () {
//   const email = `john.doe.${Math.random()}@example.com`;
//   const input = {
//     email,
//     name: "John Doe",
//     cpf: "123.456.789-09",
//   };
//   await signup.execute(input);
//   await expect(() => signup.execute(input)).rejects.toThrow(
//     new Error("Email already in use")
//   );
// });

// afterEach(async () => {
//   connection.close();
// });
