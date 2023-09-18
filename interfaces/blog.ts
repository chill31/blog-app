interface IBlog {
  title: string;
  shortContent: string;
  content: string;
  date: Date;
  author: string;
  isPublic: boolean;
}

export type {IBlog};