import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EPointHistory } from './schemas/epoint-history.schema';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class EpointHistoryService {
  constructor(
    @InjectModel(EPointHistory.name)
    private readonly model: Model<EPointHistory>,
  ) {}

  async getUserEpoint(user: User): Promise<EPointHistory[]> {
    return this.model
      .find({
        recipient: user._id,
      })
      .populate('document')
      .exec();
  }
}
