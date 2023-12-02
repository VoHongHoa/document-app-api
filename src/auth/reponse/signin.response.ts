import { User } from 'src/user/schemas/user.schema';

export interface SignInReponse {
  access_token: string;
  user: User;
}
