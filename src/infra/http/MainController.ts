import HttpServer from "./HttpServer";

import UploadFile from "../../application/usecase/UploadFile";
import GetAccount from "../../application/usecase/Account/GetAccount";
import Login from "../../application/usecase/Account/Login";
import Signup from "../../application/usecase/Account/Signup";
import CreateLead from "../../application/usecase/Lead/CreateLead";
import DeleteLead from "../../application/usecase/Lead/DeleteLead";
import GetLeads from "../../application/usecase/Lead/GetLeads";
import UpdateLead from "../../application/usecase/Lead/UpdateLead";
import CreateProperty from "../../application/usecase/Property/CreateProperty";
import DeleteProperty from "../../application/usecase/Property/DeleteProperty";
import GetProperties from "../../application/usecase/Property/GetProperties";
import GetProperty from "../../application/usecase/Property/GetProperty";
import UpdateProperty from "../../application/usecase/Property/UpdateProperty";
import CreateDocument from "../../application/usecase/Document/CreateDocument";
import GetDocuments from "../../application/usecase/Document/GetDocuments";
import DeleteDocument from "../../application/usecase/Document/DeleteDocument";

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
    upload: UploadFile,
    createDocument: CreateDocument,
    getDocuments: GetDocuments,
    deleteDocument: DeleteDocument
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

    httpServer.register(
      "PROTECTED",
      "post",
      "/new-document",
      async function (params: any, body: any, query: any) {
        const output = await createDocument.execute(body);
        return output;
      }
    );

    httpServer.register(
      "PROTECTED",
      "get",
      "/documents",
      async function (params: any, body: any, query: any) {
        const output = await getDocuments.execute();
        return output;
      }
    );

    httpServer.register(
      "PROTECTED",
      "delete",
      "/document",
      async function (params: any, body: any, query: any) {
        const output = await deleteDocument.execute(query.id);
        return output;
      }
    );

    httpServer.registerUpload("post", "/upload", async function (req: any) {
      const output = upload.execute(req.file.buffer, req.file.originalname);
      return output;
    });
  }
}
