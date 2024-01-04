import {
  IsBoolean,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateUserSettingsDto {
  @IsOptional()
  @IsBoolean()
  newsLetter: boolean;
}

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  settings?: CreateUserSettingsDto;
}
