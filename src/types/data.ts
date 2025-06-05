export interface Empolyee {
   id: string;
  name: string;
  is_active: boolean;
  created_at: string;
  phone: string;
  expiry_date: string;
  department: {
    id: string;
    name_ar: string;
    name_en: string;
    created_at: string;
    updated_at: string;
  };
entity: {
    id: string;
    name: string;
 
  };
  division: {
    id: string;
    name: string;
    created_at: string;
    updated_at: string;
  };
}

export interface Entity {
  id: number;
  name: string;
}

export interface Department {
  id: number;
  name: string;
}

export interface Division {
  id: number;
  name: string;
}

export type EmployeeShow= {
  id: number;
  name: string;
  phone: string;
  is_active: boolean;
  expiry_date: string;
  created_at: string;
  entity: Entity;
  departmen: Department | null;
  division: Division | null;
};
