import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { Pagination, PaginationOptionsInterface } from 'src/utils/databases/paginate';
import { CommentsEntity } from '../entities/comments.entity';
import { CommentInput, CommentsService, ICommentOutput } from '../services/comment.service';

@Controller('comments')
export class CommentsController {
    constructor(
        private readonly commentsService: CommentsService
    ) { }

    @Get()
    find(@Query() query?: PaginationOptionsInterface): Promise<Pagination<ICommentOutput>> {
        return this.commentsService.find(query);
    }

    @Post()
    create(@Body() body: CommentInput): Promise<CommentsEntity> {
        return this.commentsService.create(body);
    }

}