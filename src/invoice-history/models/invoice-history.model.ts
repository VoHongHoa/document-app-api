import { model } from 'mongoose';
import {
  InvoiceHistory,
  InvoiceHistorySchema,
} from '../schemas/invoice-history.schema';

export const DocumentModel = model<InvoiceHistory>(
  'InvoiceHistory',
  InvoiceHistorySchema,
);
