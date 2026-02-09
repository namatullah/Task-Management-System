import { IsBoolean, IsString } from 'class-validator';

export class UpdateStepperDto {
  @IsString()
  status: string;

  @IsString()
  notes: string;

  @IsString()
  userId: string;

  @IsBoolean()
  isForward: boolean;

  @IsBoolean()
  isFinal: boolean;
}
