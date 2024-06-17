import Property from "../../domain/Property";
import { PropertyRepository } from "../../infra/repository/PropertyRepository";

export default class CreateProperty {
  constructor(readonly propertyRepository: PropertyRepository) {}

  async execute(input: Omit<Property, "propertyId">) {
    const property = Property.create(
      input.title,
      input.price,
      input.purpose,
      input.category
    );
    await this.propertyRepository.save(property);
    return {
      propertyId: property.propertyId,
    };
  }
}
