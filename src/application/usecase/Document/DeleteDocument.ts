import { DocumentRepository } from "../../../infra/repository/DocumentRepository";

export default class DeleteDocument {
  constructor(readonly documentRepository: DocumentRepository) {}

  async execute(id: string) {
    const document = await this.documentRepository.deleteDocument(id);
    return document;
  }
}
