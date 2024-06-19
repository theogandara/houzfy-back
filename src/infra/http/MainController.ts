import HttpServer from "./HttpServer";
import GetAccount from "../../application/usecase/GetAccount";
import Signup from "../../application/usecase/Signup";
import CreateProperty from "../../application/usecase/CreateProperty";
import GetProperties from "../../application/usecase/GetProperties";
import GetProperty from "../../application/usecase/GetProperty";

export default class MainController {
  constructor(
    httpServer: HttpServer,
    signup: Signup,
    getAccount: GetAccount,
    createProperty: CreateProperty,
    getProperties: GetProperties,
    getProperty: GetProperty
  ) {
    httpServer.register(
      "post",
      "/signup",
      async function (params: any, body: any) {
        const output = await signup.execute(body);
        return output;
      }
    );

    httpServer.register(
      "get",
      "/accounts/:accountId",
      async function (params: any, body: any) {
        const output = await getAccount.execute(params.accountId);
        return output;
      }
    );

    httpServer.register(
      "post",
      "/new-property",
      async function (params: any, body: any) {
        const output = await createProperty.execute(body);
        return output;
      }
    );

    httpServer.register(
      "get",
      "/properties",
      async function (params: any, body: any, query: any) {
        const output = await getProperties.execute(Number(query.page));
        return output;
      }
    );

    httpServer.register(
      "get",
      "/property",
      async function (params: any, body: any, query: any) {
        const output = await getProperty.execute(query.propertyId);
        return output;
      }
    );
  }
}
