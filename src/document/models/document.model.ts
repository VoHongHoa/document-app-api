// src/users/models/document.model.ts

import { model } from 'mongoose';
import { Document, DocumentSchema } from '../schemas/document.schema';

export const DocumentModel = model<Document>('User', DocumentSchema);
