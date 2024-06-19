import Property from "../../domain/Property";
import { PropertyRepository } from "../../infra/repository/PropertyRepository";

export default class UpdateProperty {
  constructor(readonly propertyRepository: PropertyRepository) {}

  async execute(id: string, property: Partial<Property>) {
    const properties = await this.propertyRepository.updateProperty(
      id,
      property
    );
    return properties;
  }
}
