import Document from "../../domain/entity/Document";
import DatabaseConnection from "../database/DatabaseConnection";

export interface DocumentRepository {
  save(document: Document): Promise<void>;
  getDocuments(): Promise<{ documents: Document[] }>;
  deleteDocument(id: string): Promise<void>;
}

export default class DocumentRepositoryDatabase implements DocumentRepository {
  constructor(readonly connection: DatabaseConnection) {}

  async save(document: Document) {
    await this.connection.query(
      `insert into houzfy.documents (document_id, title, url, description, created_at) values ($1, $2, $3, $4, $5)`,
      [
        document.documentId,
        document.title,
        document.url,
        document.description,
        document.createdAt,
      ]
    );
  }

  async getDocuments() {
    const documentsData = await this.connection.query(
      "select * from houzfy.documents order by created_at desc;",
      []
    );

    const documents = documentsData.map((data: any) => {
      return Document.restore(
        data.document_id,
        data.title,
        data.description,
        data.url,
        new Date(data.created_at)
      );
    });

    return documents;
  }

  async deleteDocument(id: string) {
    await this.connection.query(
      `delete from houzfy.documents where document_id = $1;`,
      id
    );
  }
}
