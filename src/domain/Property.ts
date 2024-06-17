import crypto from "crypto";

export default class Property {
  private constructor(
    readonly propertyId: string,
    readonly title: string,
    readonly price: number,
    readonly purpose: string,
    readonly category: string,
    readonly createdAt: Date
  ) {}

  static create(
    title: string,
    price: number,
    purpose: string,
    category: string
  ) {
    const propertyId = crypto.randomUUID();
    return new Property(
      propertyId,
      title,
      price,
      purpose,
      category,
      new Date()
    );
  }

  static restore(
    propertyId: string,
    title: string,
    price: number,
    purpose: string,
    category: string,
    createAt: Date
  ) {
    return new Property(propertyId, title, price, purpose, category, createAt);
  }
}
