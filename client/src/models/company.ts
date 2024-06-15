import { Document } from "./document";

export interface Company {
  id: string;
  name: string;
  logo_url: string;
  general_manager_name: string;
  company_number: string;
  tin_number: string;
  vat_reg_number: string;
  house_number: string;
  po_box: string;
  fax: string;
  email: string;
  tel1: string;
  tel2: string;
  country: string;
  region: string;
  city: string;
  subcity: string;
  woreda: string;
  kebele: string;
  users: [];
  documents: Document[];
}
