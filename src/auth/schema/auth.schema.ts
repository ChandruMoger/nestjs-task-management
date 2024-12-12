import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Task } from 'src/tasks/schema/task.schema';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    unique: true,
  })
  username: string;

  @Prop()
  password: string;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }])
  tasks?: Task[];
}

export const UserSchema = SchemaFactory.createForClass(User);
