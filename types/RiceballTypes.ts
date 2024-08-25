export interface UserType {
  id: number;
  username: string;
  email: string | null;
  password: string | null;
  bio: string | null;
  create_at: Date;
  updated_at: Date;
}

export interface TweetType {
  id: number;
  tweet: string;
  create_at: Date;
  userId: number;
  user: UserType;
}

export interface UserProfileType {
  id: number;
  username: string;
  email: string | null;
  bio: string | null;
}
