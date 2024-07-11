import { PropertyRepository } from "../../../infra/repository/PropertyRepository";

export default class GetProperty {
  constructor(readonly propertyRepository: PropertyRepository) {}

  async execute(id: string) {
    const properties = await this.propertyRepository.getProperty(id);
    return properties;
  }
}
