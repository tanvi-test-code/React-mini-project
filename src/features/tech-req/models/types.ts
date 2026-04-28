export type TabCategory = 'frontend' | 'backend';

export interface TechReqTask {
  id: string;
  name: string;
  specification: string;
  category: TabCategory;
  isActive: boolean;
  createdAt: string;
}

export interface TechReqState {
  tasks: TechReqTask[];
  activeTab: TabCategory;
}
