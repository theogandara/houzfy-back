import HttpServer from "./HttpServer";
import GetAccount from "../../application/usecase/GetAccount";
import Signup from "../../application/usecase/Signup";
import CreateProperty from "../../application/usecase/CreateProperty";
import GetProperties from "../../application/usecase/GetProperties";
import GetProperty from "../../application/usecase/GetProperty";
import DeleteProperty from "../../application/usecase/DeleteProperty";
import UpdateProperty from "../../application/usecase/UpdateProperty";
import CreateLead from "../../application/usecase/CreateLead";
import UpdateLead from "../../application/usecase/UpdateLead";
import GetLeads from "../../application/usecase/GetLeads";
import DeleteLead from "../../application/usecase/DeleteLead";
import Login from "../../application/usecase/Login";
import UploadFile from "../../application/usecase/UploadFile";

export default class MainController {
  constructor(
    httpServer: HttpServer,
    signup: Signup,
    login: Login,
    getAccount: GetAccount,
    createProperty: CreateProperty,
    getProperties: GetProperties,
    getProperty: GetProperty,
    deleteProperty: DeleteProperty,
    updateProperty: UpdateProperty,
    createLead: CreateLead,
    updateLead: UpdateLead,
    getLeads: GetLeads,
    deleteLead: DeleteLead,
    upload: UploadFile
  ) {
    httpServer.register(
      "PUBLIC",
      "post",
      "/signup",
      async function (params: any, body: any) {
        const output = await signup.execute(body);
        return output;
      }
    );

    httpServer.register(
      "PUBLIC",
      "post",
      "/login",
      async function (params: any, body: any) {
        const output = await login.execute(body);
        return output;
      }
    );

    httpServer.register(
      "PROTECTED",
      "get",
      "/accounts/:accountId",
      async function (params: any, body: any) {
        const output = await getAccount.execute(params.accountId);
        return output;
      }
    );

    httpServer.register(
      "PROTECTED",
      "post",
      "/new-property",
      async function (params: any, body: any) {
        const output = await createProperty.execute(body);
        return output;
      }
    );

    httpServer.register(
      "PROTECTED",
      "get",
      "/properties",
      async function (params: any, body: any, query: any) {
        const output = await getProperties.execute(Number(query.page));
        return output;
      }
    );

    httpServer.register(
      "PROTECTED",
      "get",
      "/property",
      async function (params: any, body: any, query: any) {
        const output = await getProperty.execute(query.propertyId);
        return output;
      }
    );

    httpServer.register(
      "PROTECTED",
      "delete",
      "/property",
      async function (params: any, body: any, query: any) {
        const output = await deleteProperty.execute(query.propertyId);
        return output;
      }
    );

    httpServer.register(
      "PROTECTED",
      "post",
      "/update-property",
      async function (params: any, body: any, query: any) {
        const output = await updateProperty.execute(query.propertyId, body);
        return output;
      }
    );

    httpServer.register(
      "PROTECTED",
      "post",
      "/new-lead",
      async function (params: any, body: any) {
        const output = await createLead.execute(body);
        return output;
      }
    );

    httpServer.register(
      "PROTECTED",
      "post",
      "/update-lead",
      async function (params: any, body: any, query: any) {
        const output = await updateLead.execute(query.leadId, body);
        return output;
      }
    );

    httpServer.register(
      "PROTECTED",
      "get",
      "/leads",
      async function (params: any, body: any, query: any) {
        const output = await getLeads.execute(query.page);
        return output;
      }
    );

    httpServer.register(
      "PROTECTED",
      "delete",
      "/lead",
      async function (params: any, body: any, query: any) {
        const output = await deleteLead.execute(query.leadId);
        return output;
      }
    );

    httpServer.registerUpload("post", "/upload", async function (req: any) {
      const output = upload.execute(req.file.buffer, req.file.originalname);
      return output;
    });
  }
}
