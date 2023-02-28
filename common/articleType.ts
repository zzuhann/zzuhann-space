export interface IArticle {
  title: string;
  content: string;
  createTime: Date;
  updateTime: Date;
  author: string;
  tag: string;
  cover?: string;
  url?: string;
}

export interface ITimeFirestore {
  seconds: number;
  nanoseconds: number;
}

export interface IArticleFirestore {
  title: string;
  content: string;
  createTime: ITimeFirestore;
  updateTime: ITimeFirestore;
  author: string;
  tag: string;
  id?: string;
}

export interface IAddFireStore {
  target: string;
  data: IArticle;
}

export type Count = {
  [key: string]: number;
};
