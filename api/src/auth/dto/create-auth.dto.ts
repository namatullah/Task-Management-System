import { IsString } from 'class-validator';
export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export class CreateAuthDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  role: Role;
}
