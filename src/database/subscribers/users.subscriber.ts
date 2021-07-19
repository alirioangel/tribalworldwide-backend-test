import { ConfigService } from "@nestjs/config";
import { genSalt, hash } from "bcrypt";
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from "typeorm";
import { UserEntity } from "../entities/users.entity";

@EventSubscriber()
export class UsersSubscriber implements EntitySubscriberInterface<UserEntity> {
  private readonly salt: string;
  constructor(
    private readonly configService: ConfigService,
    private connection: Connection,
  ) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return UserEntity;
  }

  beforeInsert(event: InsertEvent<UserEntity>): Promise<void> {
    return this.hashPassword(event);
  }

  beforeUpdate(event: UpdateEvent<UserEntity>): Promise<void> {
    if (event.updatedColumns.find((up) => up.propertyName === 'password')) {
      return this.hashPassword(event);
    }
  }

  async hashPassword(
    event: InsertEvent<UserEntity> | UpdateEvent<UserEntity>,
  ): Promise<void> {
    if (event.entity && event.entity.password) {
      const salts = await genSalt();
      event.entity.password = await hash(event.entity.password, salts);
    }
  }
}
