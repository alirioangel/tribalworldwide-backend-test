import { UserEntity } from '../../database/entities/users.entity';

export interface UserIsRequestOwnerInterface {
  params: {
    userId: string;
  };
  user: UserEntity;
}
