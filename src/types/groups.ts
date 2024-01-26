export interface AppGroup {
  name: string;
  icon?: string;
  id?: string;
  index: number;
}

export interface CompiledAppGroup {
  apps: string[];
  name: string;
  icon?: string;
  id: string;
  index: number;
}

export type CompiledAppGroupStore = { [key: string]: CompiledAppGroup };
export type AppGroupStore = { [key: string]: AppGroup & { id: string } };
