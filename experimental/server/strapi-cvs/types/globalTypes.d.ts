export type Drug = {
  id?: number;
  documentId?: string;
  name: string;
  brand: string;
  type: string;
  active_ingredient: string;
  dose_form: string;
  strength: string;
  route_of_administration: string;
  manufacturer: string;
  approval_date: string;
  category: string;
  side_effects: string;
  storage_instructions: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  locale?: null | string;
};