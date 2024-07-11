import { DocumentRepository } from "../../../infra/repository/DocumentRepository";

export default class GetDocuments {
  constructor(readonly documentRepository: DocumentRepository) {}

  async execute() {
    const documents = await this.documentRepository.getDocuments();
    return documents;
  }
}
