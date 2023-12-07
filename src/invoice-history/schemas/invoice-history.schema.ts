// document.schema.ts

import * as mongoose from 'mongoose';

export const InvoiceHistorySchema = new mongoose.Schema(
  {
    document_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Document',
      required: true,
    },

    createdBy: { type: mongoose.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Types.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

InvoiceHistorySchema.virtual('documentObject', {
  ref: 'Document',
  localField: 'document_id',
  foreignField: '_id',
  justOne: true,
});

export interface InvoiceHistory extends mongoose.Document {
  document_id: string;

  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
  updatedBy: string;
}
