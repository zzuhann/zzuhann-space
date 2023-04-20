import create from 'zustand';

type TUser = {
  isLoggedIn: boolean;
};

export type TAuthor = {
  userName: string;
  email: string;
  userImg: string;
  userIntro: string;
};

type State = {
  user: TUser;
  author: TAuthor;
  updateUser: (user: TUser) => void;
  updateAuthor: (author: TAuthor) => void;
};

export const useStore = create<State>((set) => ({
  user: {
    isLoggedIn: false,
  },
  author: {
    userName: '',
    email: '',
    userImg: '',
    userIntro: '',
  },
  updateUser: (user) => set((state) => ({ user })),
  updateAuthor: (author) => set((state) => ({ author })),
}));
