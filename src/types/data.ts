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
  department: Department | null;
  division: Division | null;
};
export type AssetItem = {
 
  id: number;
  label: string;
  status: string;
  asset: {
    id: number;
    name: string;
    image: string;
    note: string | null;
    created_at: string;


  };
  room: {
    id: number;
    name: string;
    asset_items_count: number;
    division: {
      id: number;
      name: string;
      assets_count: number;
      created_at: string;
      department: {
        id: number;
        name: string;
        created_at: string;
        entity: {
          id: number;
          name: string;
        };
      };
    };
  };
};


export type Client = {
  id: number;
  name: string;
  phone: string;
  is_active: boolean;
  expiry_date: string;
  created_at: string;
  entity: {
    id: number;
    name: string;
  };
  departmen: {
    id: number;
    name: string;
  } | null;
  division: {
    id: number;
    name: string;
  } | null;
};

type ClientResponse = {
  data: Client[];
};
export type NotificationItem = {
  id: string; // UUID
  notification: {
    title: string;
    body: string;
    report_id: number;
  };
  created_at: string; 
  read_at: string | null;
};


export type DepartmentItems = {
  id: number;
  name: string;
  entity: {
    id: number;
    name: string;
  };
  created_at: string;
};

export type Asset = {
  id: number;
  name: string;
  image: string;
  note: string | null;
  created_at: string;
};
