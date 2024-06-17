import axios from "axios";

axios.defaults.validateStatus = function () {
  return true;
};

test("Create passegners account", async function () {
  const input = {
    name: "Théo Gandara",
    email: `john.doe.${Math.random()}@example.com`,
    cpf: "123.456.789-09",
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

test("ERROR when NAME is invalid", async function () {
  const input = {
    name: "Théo",
    email: `john.doe.${Math.random()}@example.com`,
    cpf: "123.456.789-09",
  };
  const responseSignup = await axios.post(
    "http://localhost:3000/signup",
    input
  );
  const outputSignup = responseSignup.data;
  expect(outputSignup.message).toBe("Name is invalid");
});

test("ERROR when CPF is invalid", async function () {
  const input = {
    name: "Théo Gândara",
    email: `john.doe.${Math.random()}@example.com`,
    cpf: "1234567890",
  };
  const responseSignup = await axios.post(
    "http://localhost:3000/signup",
    input
  );
  const outputSignup = responseSignup.data;
  expect(outputSignup.message).toBe("CPF is invalid");
});

test("ERROR when EMAIL is invalid", async function () {
  const input = {
    name: "Théo Gândara",
    email: `john.doe.${Math.random()}`,
    cpf: "123.456.789-09",
  };
  const responseSignup = await axios.post(
    "http://localhost:3000/signup",
    input
  );
  const outputSignup = responseSignup.data;
  expect(outputSignup.message).toBe("Email is invalid");
});

test("ERROR when is missing EMAIL field in request body", async function () {
  const input = {
    name: "Théo Gandara",
    cpf: "123.456.789-09",
  };
  const responseSignup = await axios.post(
    "http://localhost:3000/signup",
    input
  );
  const outputSignup = responseSignup.data;
  expect(outputSignup.message).toBe("The email field is missing");
});

test("ERROR when is missing NAME field in request body", async function () {
  const input = {
    email: `john.doe.${Math.random()}@example.com`,
    cpf: "123.456.789-09",
  };
  const responseSignup = await axios.post(
    "http://localhost:3000/signup",
    input
  );
  const outputSignup = responseSignup.data;
  expect(outputSignup.message).toBe("The name field is missing");
});
