import {
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { IsUniqueValue } from '../custom-validators/unique-value';

export class CreateUserDto {
  @IsString()
  @MinLength(8)
  @MaxLength(10)
  @Validate(IsUniqueValue, ['username'])
  username: string;

  @IsString()
  @MaxLength(12)
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;
}
