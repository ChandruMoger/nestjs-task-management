import { InjectModel } from '@nestjs/mongoose';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { User } from '../schema/auth.schema';
import { Model } from 'mongoose';

@ValidatorConstraint({ name: 'isUniqueValue', async: false })
export class IsUniqueValue implements ValidatorConstraintInterface {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async validate(value: string, args: ValidationArguments) {
    const filter = {};
    filter[args.property] = value;
    const count = await this.userModel.countDocuments(filter);
    return !count;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} (${args.value}) is already taken`;
  }
}
