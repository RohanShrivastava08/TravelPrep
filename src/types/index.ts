export interface Item {
  id: string;
  name: string;
  isChecked: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  items: Item[];
  isExpanded?: boolean;
}

export interface ChecklistState {
  categories: Category[];
  tripInfo?: TripInfo;
  theme?: ThemeConfig;
}

export interface TripInfo {
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
}

export interface ThemeConfig {
  name: 'minimal' | 'luxury' | 'nightOwl';
  accentColor: string;
  fontStyle: 'inter' | 'dmSans' | 'poppins';
  elevation: 'low' | 'medium' | 'high';
}