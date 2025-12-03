export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface NewsItem {
  title: string;
  uri: string;
}

export interface TableRow {
  sector: string;
  impactScore: number;
  description: string;
  trend: 'Up' | 'Stable' | 'Down';
}

export enum AppSection {
  HOME = 'home',
  ANALYTICS = 'analytics',
  AGENT = 'agent',
  MEDIA = 'media',
  CHAT = 'chat',
}

export type Language = 'en' | 'ru' | 'kk';
