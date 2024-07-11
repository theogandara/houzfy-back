import Property from "../../../domain/entity/Property";
import { PropertyRepository } from "../../../infra/repository/PropertyRepository";

interface CreatePropertyInput {
  title: string;
  price: number;
  description: string;
  purpose: string;
  category: string;
  address: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  totalArea: number;
  builtArea: number;
  bedrooms: number;
  bathrooms: number;
  suites: number;
  parkingSpaces: number;
  pool: boolean;
  gym: boolean;
  elevator: boolean;
  petsAllowed: boolean;
  barbecueArea: boolean;
  security24h: boolean;
  furnished: boolean;
  others: string;
}

export default class CreateProperty {
  constructor(readonly propertyRepository: PropertyRepository) {}

  async execute(input: CreatePropertyInput) {
    const property = Property.create(
      input.title,
      input.price,
      input.description,
      input.purpose,
      input.category,
      input.address,
      input.number,
      input.neighborhood,
      input.city,
      input.state,
      input.zipCode,
      input.totalArea,
      input.builtArea,
      input.bedrooms,
      input.bathrooms,
      input.suites,
      input.parkingSpaces,
      input.pool,
      input.gym,
      input.elevator,
      input.petsAllowed,
      input.barbecueArea,
      input.security24h,
      input.furnished,
      input.others
    );
    await this.propertyRepository.save(property);
    return {
      propertyId: property.propertyId,
    };
  }
}
