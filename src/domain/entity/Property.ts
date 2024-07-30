import crypto from "crypto";

export default class Property {
  private constructor(
    readonly propertyId: string,
    readonly title: string,
    readonly price: number,
    readonly description: string,
    readonly purpose: string,
    readonly category: string,
    readonly address: string,
    readonly number: string,
    readonly neighborhood: string,
    readonly city: string,
    readonly state: string,
    readonly zipCode: string,
    readonly totalArea: number,
    readonly builtArea: number,
    readonly bedrooms: number,
    readonly bathrooms: number,
    readonly suites: number,
    readonly parkingSpaces: number,
    readonly pool: boolean,
    readonly gym: boolean,
    readonly elevator: boolean,
    readonly petsAllowed: boolean,
    readonly barbecueArea: boolean,
    readonly security24h: boolean,
    readonly furnished: boolean,
    readonly others: string,
    readonly images: string[],
    readonly createdAt: Date
  ) {}

  static create(
    title: string,
    price: number,
    description: string,
    purpose: string,
    category: string,
    address: string,
    number: string,
    neighborhood: string,
    city: string,
    state: string,
    zipCode: string,
    totalArea: number,
    builtArea: number,
    bedrooms: number,
    bathrooms: number,
    suites: number,
    parkingSpaces: number,
    pool: boolean,
    gym: boolean,
    elevator: boolean,
    petsAllowed: boolean,
    barbecueArea: boolean,
    security24h: boolean,
    furnished: boolean,
    others: string,
    images: string[]
  ) {
    this.validateTitle(title);
    this.validatePurpose(purpose);
    this.validateDescription(description);
    this.validateCategory(category);
    this.validateAddress(address);
    this.validateNumber(number);
    this.validateNeighborhood(neighborhood);
    this.validateCity(city);
    this.validateState(state);
    this.validateZipCode(zipCode);
    this.validateTotalArea(totalArea);
    this.validateBuiltArea(builtArea);
    this.validateBedrooms(bedrooms);
    this.validateBathrooms(bathrooms);
    this.validateSuites(suites);
    this.validateParkingSpaces(parkingSpaces);
    this.validateBooleanField(pool, "Pool");
    this.validateBooleanField(gym, "Gym");
    this.validateBooleanField(elevator, "Elevator");
    this.validateBooleanField(petsAllowed, "Pets Allowed");
    this.validateBooleanField(barbecueArea, "Barbecue Area");
    this.validateBooleanField(security24h, "Security 24h");
    this.validateBooleanField(furnished, "Furnished");
    this.validateOthers(others);

    const propertyId = crypto.randomUUID();
    return new Property(
      propertyId,
      title,
      price,
      description,
      purpose,
      category,
      address,
      number,
      neighborhood,
      city,
      state,
      zipCode,
      totalArea,
      builtArea,
      bedrooms,
      bathrooms,
      suites,
      parkingSpaces,
      pool,
      gym,
      elevator,
      petsAllowed,
      barbecueArea,
      security24h,
      furnished,
      others,
      images,
      new Date()
    );
  }

  static update(
    propertyId: string,
    title: string,
    price: number,
    description: string,
    purpose: string,
    category: string,
    address: string,
    number: string,
    neighborhood: string,
    city: string,
    state: string,
    zipCode: string,
    totalArea: number,
    builtArea: number,
    bedrooms: number,
    bathrooms: number,
    suites: number,
    parkingSpaces: number,
    pool: boolean,
    gym: boolean,
    elevator: boolean,
    petsAllowed: boolean,
    barbecueArea: boolean,
    security24h: boolean,
    furnished: boolean,
    others: string,
    images: string[],
    createdAt: Date
  ) {
    this.validateTitle(title);
    this.validatePurpose(purpose);
    this.validateDescription(description);
    this.validateCategory(category);
    this.validateAddress(address);
    this.validateNumber(number);
    this.validateNeighborhood(neighborhood);
    this.validateCity(city);
    this.validateState(state);
    this.validateZipCode(zipCode);
    this.validateTotalArea(totalArea);
    this.validateBuiltArea(builtArea);
    this.validateBedrooms(bedrooms);
    this.validateBathrooms(bathrooms);
    this.validateSuites(suites);
    this.validateParkingSpaces(parkingSpaces);
    this.validateBooleanField(pool, "Pool");
    this.validateBooleanField(gym, "Gym");
    this.validateBooleanField(elevator, "Elevator");
    this.validateBooleanField(petsAllowed, "Pets Allowed");
    this.validateBooleanField(barbecueArea, "Barbecue Area");
    this.validateBooleanField(security24h, "Security 24h");
    this.validateBooleanField(furnished, "Furnished");
    this.validateOthers(others);

    return new Property(
      propertyId,
      title,
      price,
      description,
      purpose,
      category,
      address,
      number,
      neighborhood,
      city,
      state,
      zipCode,
      totalArea,
      builtArea,
      bedrooms,
      bathrooms,
      suites,
      parkingSpaces,
      pool,
      gym,
      elevator,
      petsAllowed,
      barbecueArea,
      security24h,
      furnished,
      others,
      images,
      createdAt
    );
  }

  static restore(
    propertyId: string,
    title: string,
    price: number,
    description: string,
    purpose: string,
    category: string,
    address: string,
    number: string,
    neighborhood: string,
    city: string,
    state: string,
    zipCode: string,
    totalArea: number,
    builtArea: number,
    bedrooms: number,
    bathrooms: number,
    suites: number,
    parkingSpaces: number,
    pool: boolean,
    gym: boolean,
    elevator: boolean,
    petsAllowed: boolean,
    barbecueArea: boolean,
    security24h: boolean,
    furnished: boolean,
    others: string,
    images: string[],
    createdAt: Date
  ) {
    return new Property(
      propertyId,
      title,
      price,
      description,
      purpose,
      category,
      address,
      number,
      neighborhood,
      city,
      state,
      zipCode,
      totalArea,
      builtArea,
      bedrooms,
      bathrooms,
      suites,
      parkingSpaces,
      pool,
      gym,
      elevator,
      petsAllowed,
      barbecueArea,
      security24h,
      furnished,
      others,
      images,
      createdAt
    );
  }

  private static validateTitle(title: string) {
    if (title.length >= 100) {
      throw new Error("Title must be less than 100 characters.");
    }
  }

  private static validatePurpose(purpose: string) {
    const validPurposes = ["sale", "rent"];
    if (!validPurposes.includes(purpose)) {
      throw new Error(`Invalid purpose: ${purpose}. Must be 'sale' or 'rent'.`);
    }
  }

  private static validateDescription(description: string) {
    if (description.length >= 255) {
      throw new Error("Description must be less than 255 characters.");
    }
  }

  private static validateCategory(category: string) {
    const validCategories = ["house", "apartment", "commercial", "land"];
    if (!validCategories.includes(category)) {
      throw new Error(
        `Invalid category: ${category}. Must be 'house', 'apartment', 'commercial', or 'land'.`
      );
    }
  }

  private static validateAddress(address: string) {
    if (address.length >= 255) {
      throw new Error("Address must be less than 255 characters.");
    }
  }

  private static validateNumber(number: string) {
    if (isNaN(Number(number))) {
      throw new Error("Number must be a numeric value.");
    }
  }

  private static validateNeighborhood(neighborhood: string) {
    if (neighborhood.length >= 255) {
      throw new Error("Neighborhood must be less than 255 characters.");
    }
  }

  private static validateCity(city: string) {
    if (city.length >= 100) {
      throw new Error("City must be less than 100 characters.");
    }
  }

  private static validateState(state: string) {
    if (state.length !== 2) {
      throw new Error("State must be exactly 2 characters.");
    }
  }

  private static validateZipCode(zipCode: string) {
    if (zipCode.length >= 20) {
      throw new Error("ZipCode must be less than 20 characters.");
    }
  }

  private static validateTotalArea(totalArea: number) {
    if (isNaN(totalArea) || totalArea >= 1000000) {
      throw new Error("Total area must be a numeric value less than 1000000.");
    }
  }

  private static validateBuiltArea(builtArea: number) {
    if (isNaN(builtArea) || builtArea >= 1000000) {
      throw new Error("Built area must be a numeric value less than 1000000.");
    }
  }

  private static validateBedrooms(bedrooms: number) {
    if (isNaN(bedrooms) || bedrooms >= 100) {
      throw new Error("Bedrooms must be a numeric value less than 100.");
    }
  }

  private static validateBathrooms(bathrooms: number) {
    if (isNaN(bathrooms) || bathrooms >= 100) {
      throw new Error("Bathrooms must be a numeric value less than 100.");
    }
  }

  private static validateSuites(suites: number) {
    if (isNaN(suites) || suites >= 100) {
      throw new Error("Suites must be a numeric value less than 100.");
    }
  }

  private static validateParkingSpaces(parkingSpaces: number) {
    if (isNaN(parkingSpaces) || parkingSpaces >= 100) {
      throw new Error("Parking spaces must be a numeric value less than 100.");
    }
  }

  private static validateBooleanField(field: boolean, fieldName: string) {
    if (typeof field !== "boolean") {
      throw new Error(`${fieldName} must be a boolean value.`);
    }
  }

  private static validateOthers(others: string) {
    if (!others) return;
    if (others.length >= 255) {
      throw new Error("Others must be less than 255 characters.");
    }
  }
}
