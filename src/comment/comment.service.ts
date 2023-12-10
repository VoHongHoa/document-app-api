import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Comment } from './schemas/comment.schema';
import { CreateCommentDto, UpdateCommentDto } from './dtos';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
  ) {}

  async createComment(
    commentDto: CreateCommentDto,
    user: User,
  ): Promise<Comment> {
    const createdComment = new this.commentModel(commentDto);
    createdComment.createdBy = user._id;
    return createdComment.save();
  }

  async getCommentByDocumentId(document_id: string): Promise<Comment[]> {
    return this.commentModel
      .find({
        document_id: new mongoose.Types.ObjectId(document_id),
      })
      .sort({ createdAt: -1 })
      .populate('createdBy', '-password')
      .exec();
  }

  async getCommentById(commentId: string): Promise<Comment> {
    const comment = await this.commentModel.findById(commentId).exec();
    if (!comment) {
      throw new NotFoundException('Comment not found');
    }
    return comment;
  }

  async updateComment(
    commentId: string,
    commentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const updatedComment = await this.commentModel
      .findByIdAndUpdate(commentId, commentDto, { new: true })
      .exec();

    if (!updatedComment) {
      throw new NotFoundException('Comment not found');
    }

    return updatedComment;
  }

  async deleteComment(commentId: string): Promise<any> {
    const result = await this.commentModel.findByIdAndDelete(commentId).exec();
    if (!result) {
      throw new NotFoundException('Comment not found');
    }
    return result;
  }
}
