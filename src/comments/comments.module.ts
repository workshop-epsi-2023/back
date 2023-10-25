import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from './controllers/comments.controller';
import { CommentsEntity } from './entities/comments.entity';
import { CommentsService } from './services/comment.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([CommentsEntity])
    ],
    controllers: [
        CommentsController
    ],
    providers: [
        CommentsService
    ],
})
export class CommentsModule { }
