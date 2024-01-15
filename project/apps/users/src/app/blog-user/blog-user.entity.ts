import { AuthUser } from '@project/shared/app/types';
import { Entity } from '@project/shared/core';

export class BlogUserEntity implements AuthUser, Entity<string> {
  public id?: string;
  public email: string;
  public name: string;
  public avatarUrl: string;
  public passwordHash: string;

  constructor(user: AuthUser) {
    this.populate(user);
  }

  public populate(data: AuthUser): void {
    this.email = data.email;
    this.name = data.name;
    this.avatarUrl = data.avatarUrl;
  }

  public toPOJO() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      avatarUrl: this.avatarUrl,
      passwordHash: this.passwordHash,
    };
  }
}
