export interface Tweet {
  account: Account;
  date: string;
  hashtags: string[];
  likes: number;
  replies: number;
  retweets: number;
  text: string;
}

interface Account {
  fullname: string;
  href: string;
  id: number;
}

export enum TabsId {
  hashtag = 'hashtag',
  user = 'user'
}
