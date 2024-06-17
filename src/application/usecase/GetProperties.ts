import { PropertyRepository } from "../../infra/repository/PropertyRepository";

export default class GetProperties {
  constructor(readonly propertyRepository: PropertyRepository) {}

  async execute(page: number) {
    const properties = await this.propertyRepository.getProperties(page || 1);
    return properties;
  }
}
