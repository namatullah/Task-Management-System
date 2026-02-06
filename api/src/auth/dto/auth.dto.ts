import { IsEmail, IsString, MinLength } from 'class-validator';
export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

export class SignUpDto {
  @IsString()
  name: string;

  @IsString()
  @IsEmail()
  email: string;

  @MinLength(6)
  @IsString()
  password: string;

  @IsString()
  role: Role;

  @IsString()
  adminToken: string;
}

export class SignInDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
