export interface PlanType {
  id: string;
  title: string;
  description: string;
  date: string;

  locations: string[];
  participants: string[];

  archive?: boolean;

  createdAt: string;
  updatedAt: string;
}
