import { Timestamp } from 'firebase/firestore';

export interface IArticle {
  title: string;
  content: string;
  createTime: Date;
  updateTime: Date;
  author: string;
  tag: string;
  cover?: string;
  url?: string;
  description: string;
}

export interface ITimeFirestore {
  seconds: number;
  nanoseconds: number;
}

export interface IArticleSSG {
  title: string;
  content: string;
  createTime: Timestamp;
  updateTime: Timestamp;
  author: string;
  tag: string;
  id?: string;
  description: string;
}

export interface IArticleFirestore {
  title: string;
  content: string;
  createTime: string;
  updateTime: string;
  author: string;
  tag: string;
  id?: string;
  description: string;
}

export interface IAddFireStore {
  target: string;
  data: IArticle;
}

export type Count = {
  [key: string]: number;
};
