import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TaskStatus } from '../task.model';
import mongoose from 'mongoose';
import { User } from '../../auth/schema/auth.schema';
import { Exclude } from 'class-transformer';
// import { Exclude } from 'class-transformer';

@Schema({
  timestamps: true,
})
export class Task {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  status: TaskStatus;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  @Exclude()
  user: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
