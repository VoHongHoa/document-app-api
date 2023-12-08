// src/documents/document.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  Document as MongooseDocument,
  Schema as MongooseSchema,
} from 'mongoose';

@Schema({ timestamps: true })
export class Document extends MongooseDocument {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  total_page: number;

  @Prop({ required: true })
  theme_image: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  url_download: string;

  @Prop({ default: 0 })
  total_view: number;

  @Prop({ default: 0 })
  total_download: number;

  @Prop()
  description: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category' })
  category_id: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Collection' })
  collection_id: MongooseSchema.Types.ObjectId;

  @Prop({ enum: ['Active', 'Inactive'], default: 'Active' })
  status: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  createdBy: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  updatedBy: MongooseSchema.Types.ObjectId;
}

export const DocumentSchema = SchemaFactory.createForClass(Document);
