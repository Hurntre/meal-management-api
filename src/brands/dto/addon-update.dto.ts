import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';
export class AddonUpdateDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  readonly category: string;
}
