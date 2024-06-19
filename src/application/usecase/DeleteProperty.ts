import { PropertyRepository } from "../../infra/repository/PropertyRepository";

export default class DeleteProperty {
  constructor(readonly propertyRepository: PropertyRepository) {}

  async execute(id: string) {
    const properties = await this.propertyRepository.deleteProperty(id);
    return properties;
  }
}
