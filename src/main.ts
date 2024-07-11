import GetAccount from "./application/usecase/Account/GetAccount";
import Login from "./application/usecase/Account/Login";
import Signup from "./application/usecase/Account/Signup";
import CreateDocument from "./application/usecase/Document/CreateDocument";
import DeleteDocument from "./application/usecase/Document/DeleteDocument";
import GetDocuments from "./application/usecase/Document/GetDocuments";
import CreateLead from "./application/usecase/Lead/CreateLead";
import DeleteLead from "./application/usecase/Lead/DeleteLead";
import GetLeads from "./application/usecase/Lead/GetLeads";
import UpdateLead from "./application/usecase/Lead/UpdateLead";
import CreateProperty from "./application/usecase/Property/CreateProperty";
import DeleteProperty from "./application/usecase/Property/DeleteProperty";
import GetProperties from "./application/usecase/Property/GetProperties";
import GetProperty from "./application/usecase/Property/GetProperty";
import UpdateProperty from "./application/usecase/Property/UpdateProperty";
import UploadFile from "./application/usecase/UploadFile";
import { PGPromiseAdapter } from "./infra/database/DatabaseConnection";
import { ExpressAdapter } from "./infra/http/HttpServer";
import MainController from "./infra/http/MainController";
import AccountRepositoryDatabase from "./infra/repository/AccountRepository";
import DocumentRepositoryDatabase from "./infra/repository/DocumentRepository";
import LeadRepositoryDatabase from "./infra/repository/LeadRepository";
import PropertyRepositoryDatabase from "./infra/repository/PropertyRepository";
import PasswordServiceBCrypt from "./infra/service/PasswordServiceBCrypt";

const httpServer = new ExpressAdapter();
const connection = new PGPromiseAdapter();
const passwordService = new PasswordServiceBCrypt();
const accountRepository = new AccountRepositoryDatabase(connection);
const propertyRepository = new PropertyRepositoryDatabase(connection);
const leadRepository = new LeadRepositoryDatabase(connection);
const signup = new Signup(accountRepository, passwordService);
const login = new Login(accountRepository, passwordService);
const getAccount = new GetAccount(accountRepository);
const createProperty = new CreateProperty(propertyRepository);
const getProperties = new GetProperties(propertyRepository);
const getProperty = new GetProperty(propertyRepository);
const deleteProperty = new DeleteProperty(propertyRepository);
const updateProperty = new UpdateProperty(propertyRepository);
const createLead = new CreateLead(leadRepository);
const updateLead = new UpdateLead(leadRepository);
const getLeads = new GetLeads(leadRepository);
const deleteLead = new DeleteLead(leadRepository);
const upload = new UploadFile();
const documentRepository = new DocumentRepositoryDatabase(connection);
const createDocument = new CreateDocument(documentRepository);
const getDocuments = new GetDocuments(documentRepository);
const deleteDocument = new DeleteDocument(documentRepository);

new MainController(
  httpServer,
  signup,
  login,
  getAccount,
  createProperty,
  getProperties,
  getProperty,
  deleteProperty,
  updateProperty,
  createLead,
  updateLead,
  getLeads,
  deleteLead,
  upload,
  createDocument,
  getDocuments,
  deleteDocument
);

httpServer.listen(3000);
