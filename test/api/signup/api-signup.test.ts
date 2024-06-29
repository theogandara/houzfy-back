import axios from "axios";

axios.defaults.validateStatus = function () {
  return true;
};

test("Create passegners account", async function () {
  const input = {
    name: "Théo Gandara",
    email: `john.doe.${Math.random()}@example.com`,
    cpf: "123.456.789-09",
    password: "12345678",
  };
  const responseSignup = await axios.post(
    "http://localhost:3000/signup",
    input
  );
  const outputSignup = responseSignup.data;
  expect(outputSignup.accountId).toBeDefined();
  const responseGetAccount = await axios.get(
    `http://localhost:3000/accounts/${outputSignup.accountId}`
  );
  const outputGetAccount = responseGetAccount.data;
  expect(outputGetAccount.name).toBe(input.name);
  expect(outputGetAccount.email).toBe(input.email);
  expect(outputGetAccount.cpf).toBe(input.cpf);
});
