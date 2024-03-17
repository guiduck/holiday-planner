export interface PlanType {
  id: string;
  title: string;
  description: string | null;
  date: string;
  locations: string[];
  participants: string[];
  archived?: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
}
