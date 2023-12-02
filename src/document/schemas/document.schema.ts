// document.schema.ts

import * as mongoose from 'mongoose';

export const DocumentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    total_page: { type: Number, required: true },
    theme_image: { type: String, required: true },
    price: { type: Number, required: true },
    url_download: { type: String, required: true },
    total_view: { type: Number, default: 0 },
    total_download: { type: Number, default: 0 },
    description: { type: String },

    createdBy: { type: mongoose.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  },
);

export interface Document extends mongoose.Document {
  title: string;
  total_page: number;
  theme_image: string;
  price: number;
  url_download: string;
  total_view: number;
  total_download: number;
  description: string;

  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
