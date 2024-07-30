import crypto from "crypto";

export default class Document {
  private constructor(
    readonly documentId: string,
    readonly title: string,
    readonly description: string,
    readonly url: string,
    readonly createdAt: Date
  ) {}

  static create(title: string, description: string, url: string) {
    this.validateTitle(title);
    this.validateDescription(description);

    const documentId = crypto.randomUUID();
    return new Document(documentId, title, description, url, new Date());
  }

  static restore(
    documentId: string,
    title: string,
    description: string,
    url: string,
    createdAt: Date
  ) {
    return new Document(documentId, title, description, url, createdAt);
  }

  private static validateTitle(title: string) {
    if (title.length >= 30) {
      throw new Error("Title must be less than 30 characters.");
    }

    if (title.length <= 2) {
      throw new Error("Title must be more than 2 characters.");
    }
  }

  private static validateDescription(description: string) {
    if (description.length >= 50) {
      throw new Error("Description must be less than 50 characters.");
    }

    if (description.length <= 2) {
      throw new Error("Description must be more than 2 characters.");
    }
  }
}
