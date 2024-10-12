interface IDiagnoses {
  id?: number;
  image?: string;
  imageName?: string;
  name?: string;
  label?: string | { status: string; color: string };
  confidence?: number;
  details?: Object;
  uuid?: string;
  created_at?: string | Date;
}

export type { IDiagnoses };
