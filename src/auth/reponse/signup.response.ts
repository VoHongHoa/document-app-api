import { User } from 'src/user/schemas/user.schema';

export interface SignUpReponse {
  access_token: string;
  user: User;
}
