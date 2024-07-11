import crypto from "crypto";

export default class Lead {
  private constructor(
    readonly leadId: string,
    readonly name: string,
    readonly email: string,
    readonly phone: string,
    readonly message: string,
    readonly propertyId: string,
    readonly createdAt: Date
  ) {}

  static create(
    name: string,
    email: string,
    phone: string,
    message: string,
    propertyId: string
  ) {
    this.validateName(name);
    this.validateEmail(email);
    this.validatePhone(phone);
    this.validateMessage(message);

    const leadId = crypto.randomUUID();
    return new Lead(
      leadId,
      name,
      email,
      phone,
      message,
      propertyId,
      new Date()
    );
  }

  static update(
    leadId: string,
    name: string,
    email: string,
    phone: string,
    message: string,
    propertyId: string,
    createdAt: Date
  ) {
    this.validateName(name);
    this.validateEmail(email);
    this.validatePhone(phone);
    this.validateMessage(message);

    return new Lead(leadId, name, email, phone, message, propertyId, createdAt);
  }

  static restore(
    leadId: string,
    name: string,
    email: string,
    phone: string,
    message: string,
    propertyId: string,
    createdAt: Date
  ) {
    return new Lead(leadId, name, email, phone, message, propertyId, createdAt);
  }

  private static validateName(name: string) {
    if (!name) throw new Error("Name is required.");

    if (name.length >= 100) {
      throw new Error("Name must be less than 100 characters.");
    }
  }

  private static validateEmail(email: string) {
    if (!email) throw new Error("Email is required.");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email format.");
    }
    if (email.length >= 255) {
      throw new Error("Email must be less than 255 characters.");
    }
  }

  private static validatePhone(phone: string) {
    if (!phone) throw new Error("Phone is required.");
    if (phone.length >= 20) {
      throw new Error("Phone must be less than 20 characters.");
    }
  }

  private static validateMessage(message: string) {
    if (!message) throw new Error("Message is required.");
    if (message.length >= 500) {
      throw new Error("Message must be less than 500 characters.");
    }
  }
}
