import { IsNotEmpty, IsString } from 'class-validator';
export class AddonCategoryDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}
