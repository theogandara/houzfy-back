import Lead from "../../domain/Lead";
import { LeadRepository } from "../../infra/repository/LeadRepository";

export default class UpdateLead {
  constructor(readonly leadRepository: LeadRepository) {}

  async execute(id: string, input: Partial<Lead>) {
    const existingLead = await this.leadRepository.getLead(id);
    if (!existingLead) {
      throw new Error("Lead not found");
    }

    const updatedLead = Lead.update(
      existingLead.leadId,
      input.name ?? existingLead.name,
      input.email ?? existingLead.email,
      input.phone ?? existingLead.phone,
      input.message ?? existingLead.message,
      input.propertyId ?? existingLead.propertyId,
      existingLead.createdAt
    );

    await this.leadRepository.updateLead(updatedLead);
    return {
      leadId: updatedLead.leadId,
    };
  }
}
