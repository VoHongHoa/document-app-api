import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class EPointHistory extends Document {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Document' })
  document: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  value: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  recipient: MongooseSchema.Types.ObjectId;

  @Prop({ required: true, default: 'Upload document' })
  source: string;
}

export const EPointHistorySchema = SchemaFactory.createForClass(EPointHistory);
