import AccountRepositoryDatabase from "./infra/repository/AccountRepository";
import PropertyRepositoryDatabase from "./infra/repository/PropertyRepository";
import Signup from "./application/usecase/Signup";
import GetAccount from "./application/usecase/GetAccount";
import { PGPromiseAdapter } from "./infra/database/DatabaseConnection";
import { ExpressAdapter } from "./infra/http/HttpServer";
import MainController from "./infra/http/MainController";
import CreateProperty from "./application/usecase/CreateProperty";
import GetProperties from "./application/usecase/GetProperties";
import GetProperty from "./application/usecase/GetProperty";
import DeleteProperty from "./application/usecase/DeleteProperty";
import UpdateProperty from "./application/usecase/UpdateProperty";
import CreateLead from "./application/usecase/CreateLead";
import UpdateLead from "./application/usecase/UpdateLead";
import GetLeads from "./application/usecase/GetLeads";
import DeleteLead from "./application/usecase/DeleteLead";
import LeadRepositoryDatabase from "./infra/repository/LeadRepository";

const httpServer = new ExpressAdapter();
const connection = new PGPromiseAdapter();
const accountRepository = new AccountRepositoryDatabase(connection);
const propertyRepository = new PropertyRepositoryDatabase(connection);
const leadRepository = new LeadRepositoryDatabase(connection);
const signup = new Signup(accountRepository);
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
new MainController(
  httpServer,
  signup,
  getAccount,
  createProperty,
  getProperties,
  getProperty,
  deleteProperty,
  updateProperty,
  createLead,
  updateLead,
  getLeads,
  deleteLead
);

httpServer.listen(3000);
