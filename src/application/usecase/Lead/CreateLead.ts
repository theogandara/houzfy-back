import Lead from "../../../domain/entity/Lead";
import { LeadRepository } from "../../../infra/repository/LeadRepository";

interface CreateLeadInput {
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyId: string;
}

export default class CreateLead {
  constructor(readonly leadRepository: LeadRepository) {}

  async execute(input: CreateLeadInput) {
    const lead = Lead.create(
      input.name,
      input.email,
      input.phone,
      input.message,
      input.propertyId
    );
    await this.leadRepository.save(lead);
    return {
      leadId: lead.leadId,
    };
  }
}
