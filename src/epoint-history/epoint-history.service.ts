import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EPointHistory } from './schemas/epoint-history.schema';
import { Model } from 'mongoose';

@Injectable()
export class EpointHistoryService {
  constructor(
    @InjectModel(EPointHistory.name)
    private readonly model: Model<EPointHistory>,
  ) {}
}
