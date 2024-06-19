import Lead from "../../domain/Lead";
import { LeadRepository } from "../../infra/repository/LeadRepository";

export default class ListLeads {
  constructor(readonly leadRepository: LeadRepository) {}

  async execute(page: number) {
    const [leads, totalCountData] = await Promise.all([
      this.leadRepository.listLeads(page || 1),
      this.leadRepository.countLeads(),
    ]);

    const totalLeads = totalCountData.count;
    const totalPages = Math.ceil(totalLeads / 10);

    return {
      leads,
      totalLeads,
      totalPages,
      currentPage: page,
    };
  }
}
