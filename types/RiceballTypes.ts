export interface UserType {
  id: number;
  username: string;
  email: string | null;
  password: string | null;
  bio: string | null;
  create_at: Date;
  updated_at: Date;
}
