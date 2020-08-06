import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Developer extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  gender: string

  @Prop({ required: true })
  age: number

  @Prop()
  hobby: string

  @Prop({ required: true })
  birthdate: Date
}

export const DeveloperSchema = SchemaFactory.createForClass(Developer);