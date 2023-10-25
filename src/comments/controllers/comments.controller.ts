import { Controller, Get, Query } from '@nestjs/common';
import { Pagination, PaginationOptionsInterface } from 'src/utils/databases/paginate';
import { CommentsEntity } from '../entities/comments.entity';
import { CommentsService } from '../services/comment.service';

@Controller('comments')
export class CommentsController {
    constructor(
        private readonly commentsService: CommentsService
    ) { }

    @Get()
    find(@Query() query?: PaginationOptionsInterface): Promise<Pagination<CommentsEntity>> {
        return this.commentsService.find(query);
    }

}