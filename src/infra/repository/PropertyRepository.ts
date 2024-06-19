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
  getProperty(
    id: string
  ): Promise<{ property: Property } | { message: string }>;
  deleteProperty(id: string): Promise<void>;
}

export default class PropertyRepositoryDatabase implements PropertyRepository {
  constructor(readonly connection: DatabaseConnection) {}

  async save(property: Property) {
    await this.connection.query(
      `insert into houzfy.property (
        property_id, title, price, description, purpose, category, address, number, 
        neighborhood, city, state, zip_code, total_area, built_area, bedrooms, 
        bathrooms, suites, parking_spaces, pool, gym, elevator, pets_allowed, 
        barbecue_area, security_24h, furnished, others, created_at
      ) values (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, 
        $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27
      )`,
      [
        property.propertyId,
        property.title,
        property.price,
        property.description,
        property.purpose,
        property.category,
        property.address,
        property.number,
        property.neighborhood,
        property.city,
        property.state,
        property.zipCode,
        property.totalArea,
        property.builtArea,
        property.bedrooms,
        property.bathrooms,
        property.suites,
        property.parkingSpaces,
        property.pool,
        property.gym,
        property.elevator,
        property.petsAllowed,
        property.barbecueArea,
        property.security24h,
        property.furnished,
        property.others,
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
    const propertiesData = await this.connection.query(
      `select * from houzfy.property order by created_at DESC limit ${limit} offset ${start}`,
      ""
    );

    const properties = propertiesData.map((data: any) => {
      return Property.restore(
        data.property_id,
        data.title,
        data.price,
        data.description,
        data.purpose,
        data.category,
        data.address,
        data.number,
        data.neighborhood,
        data.city,
        data.state,
        data.zip_code,
        data.total_area,
        data.built_area,
        data.bedrooms,
        data.bathrooms,
        data.suites,
        data.parking_spaces,
        data.pool,
        data.gym,
        data.elevator,
        data.pets_allowed,
        data.barbecue_area,
        data.security_24h,
        data.furnished,
        data.others,
        new Date(data.created_at)
      );
    });

    return {
      pages: Math.ceil(total.count / limit),
      pageNumber: page,
      perPage: limit,
      pageSize: properties.length,
      properties,
    };
  }

  async getProperty(id: string) {
    const [data] = await this.connection.query(
      `select * from houzfy.property where property_id = $1;`,
      id
    );

    if (!data) {
      return {
        message: "property not found",
      };
    }

    const property = Property.restore(
      data.property_id,
      data.title,
      data.price,
      data.description,
      data.purpose,
      data.category,
      data.address,
      data.number,
      data.neighborhood,
      data.city,
      data.state,
      data.zip_code,
      data.total_area,
      data.built_area,
      data.bedrooms,
      data.bathrooms,
      data.suites,
      data.parking_spaces,
      data.pool,
      data.gym,
      data.elevator,
      data.pets_allowed,
      data.barbecue_area,
      data.security_24h,
      data.furnished,
      data.others,
      data.created_at
    );

    return {
      property,
    };
  }

  async deleteProperty(id: string) {
    const response = await this.connection.query(
      `delete from houzfy.property where property_id = $1;`,
      id
    );

    console.log(response);
  }
}
