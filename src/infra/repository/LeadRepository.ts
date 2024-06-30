import Lead from "../../domain/Lead";
import DatabaseConnection from "../database/DatabaseConnection";

export interface LeadRepository {
  save(lead: Lead): Promise<void>;
  getLead(id: string): Promise<Lead | undefined>;
  deleteLead(id: string): Promise<void>;
  updateLead(lead: Lead): Promise<void>;
  listLeads(page: number): Promise<Lead[]>;
  countLeads(): Promise<{ count: number }>;
}

export default class LeadRepositoryDatabase implements LeadRepository {
  constructor(readonly connection: DatabaseConnection) {}

  async save(lead: Lead) {
    await this.connection.query(
      `INSERT INTO houzfy.leads (
        lead_id, name, email, phone, message, property_id, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        lead.leadId,
        lead.name,
        lead.email,
        lead.phone,
        lead.message,
        lead.propertyId,
        lead.createdAt,
      ]
    );
  }

  async getLead(id: string): Promise<Lead | undefined> {
    const [data] = await this.connection.query(
      `SELECT * FROM houzfy.leads WHERE lead_id = $1`,
      [id]
    );

    if (!data) return undefined;

    return Lead.restore(
      data.lead_id,
      data.name,
      data.email,
      data.phone,
      data.message,
      data.property_id,
      new Date(data.created_at)
    );
  }

  async deleteLead(id: string): Promise<void> {
    await this.connection.query(`DELETE FROM houzfy.leads WHERE lead_id = $1`, [
      id,
    ]);
  }

  async updateLead(lead: Lead): Promise<void> {
    await this.connection.query(
      `UPDATE houzfy.leads SET 
        name = $1,
        email = $2,
        phone = $3,
        message = $4,
        property_id = $5,
        created_at = $6
      WHERE lead_id = $7`,
      [
        lead.name,
        lead.email,
        lead.phone,
        lead.message,
        lead.propertyId,
        lead.createdAt,
        lead.leadId,
      ]
    );
  }

  async listLeads(page: number): Promise<Lead[]> {
    const limit = 10;
    const offset = Number(page) * limit - limit;

    const data = await this.connection.query(
      `select * from houzfy.leads order by created_at DESC limit $1 offset $2`,
      [limit, offset]
    );

    return data.map((item: any) =>
      Lead.restore(
        item.lead_id,
        item.name,
        item.email,
        item.phone,
        item.message,
        item.property_id,
        new Date(item.created_at)
      )
    );
  }

  async countLeads(): Promise<{ count: number }> {
    const [data] = await this.connection.query(
      `SELECT COUNT(*) AS count FROM houzfy.leads`,
      ""
    );
    return { count: Number(data.count) };
  }
}
