export interface TicketResponse {
  id: number,
  subject: string,
  description: string,
  status_id: number,
  priority_id: number,
  assigned_to: number,
  status_name: string | null,
  priority_name: string | null,
  created_by: number,
  created_by_name: string | null,
  assigned_to_name: string | null,
  created_at: string,
  updated_at: string
}


export interface NewTicket {
  subject: string,
  description: string,
  priority_id: number,
  assigned_to: number
}
