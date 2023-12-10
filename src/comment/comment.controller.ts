import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comment } from './schemas/comment.schema';
import { CreateCommentDto, UpdateCommentDto } from './dtos';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { User } from 'src/user/schemas/user.schema';
import { JwtGuard } from 'src/auth/guards';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  @UseGuards(JwtGuard)
  @Post()
  async create(
    @Body() commentDto: CreateCommentDto,
    @GetUser() user: User,
  ): Promise<Comment> {
    return this.commentService.createComment(commentDto, user);
  }
  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') commentId: string): Promise<Comment> {
    return this.commentService.getCommentById(commentId);
  }
  @UseGuards(JwtGuard)
  @Put(':id')
  async update(
    @Param('id') commentId: string,
    @Body() commentDto: UpdateCommentDto,
  ): Promise<Comment> {
    return this.commentService.updateComment(commentId, commentDto);
  }
  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id') commentId: string): Promise<any> {
    return this.commentService.deleteComment(commentId);
  }

  @Get('get-by-document/:document_id')
  async getCommentByDocumentId(
    @Param('document_id') document_id: string,
  ): Promise<Comment[]> {
    return this.commentService.getCommentByDocumentId(document_id);
  }
}
