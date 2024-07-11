import Document from "../../../domain/entity/Document";
import { DocumentRepository } from "../../../infra/repository/DocumentRepository";

interface CreateDocumentInput {
  title: string;
  description: string;
  url: string;
}

export default class CreateDocument {
  constructor(readonly documentRepository: DocumentRepository) {}

  async execute(input: CreateDocumentInput) {
    const document = Document.create(input.title, input.description, input.url);
    await this.documentRepository.save(document);
    return {
      documentId: document.documentId,
    };
  }
}
