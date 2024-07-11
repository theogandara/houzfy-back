import { LeadRepository } from "../../../infra/repository/LeadRepository";

export default class DeleteLead {
  constructor(readonly leadRepository: LeadRepository) {}

  async execute(id: string) {
    await this.leadRepository.deleteLead(id);
  }
}
