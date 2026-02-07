import { IsBoolean, IsString } from 'class-validator';

export class CreateMemberDto {
  @IsString()
  userId: string;

  @IsString()
  projectId: string;

  @IsBoolean()
  isAdmin: string;
}

export class UpdateMemberDto {
  @IsBoolean()
  isAdmin?: string;
}
