import Property from "../../domain/Property";
import DatabaseConnection from "../database/DatabaseConnection";

export interface PropertyRepository {
  save(property: Property): Promise<void>;
  getProperties(page: number): Promise<{
    pages: number;
    pageNumber: number;
    perPage: number;
    pageSize: number;
    properties: Property[];
  }>;
}

export default class PropertyRepositoryDatabase implements PropertyRepository {
  constructor(readonly connection: DatabaseConnection) {}

  async save(property: Property) {
    await this.connection.query(
      "insert into houzfy.property (property_id, title, price, purpose, category, created_at) values ($1, $2, $3, $4, $5, $6)",
      [
        property.propertyId,
        property.title,
        property.price,
        property.purpose,
        property.category,
        property.createdAt,
      ]
    );
  }

  async getProperties(page: number) {
    const [total] = await this.connection.query(
      "SELECT COUNT(*) FROM houzfy.property",
      ""
    );

    const limit = 10;
    const start = page * limit - limit;
    const properties = await this.connection.query(
      `select * from houzfy.property order by created_at DESC limit ${limit} offset ${start}`,
      ""
    );

    return {
      pages: Math.ceil(total.count / limit),
      pageNumber: page,
      perPage: limit,
      pageSize: properties.length,
      properties,
    };
  }
}
