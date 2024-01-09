import { IsObject, IsOptional } from 'class-validator';

interface address {
  houseNumber: number;
  street: string;
  city: string;
  country: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsObject()
  address?: address;
}
