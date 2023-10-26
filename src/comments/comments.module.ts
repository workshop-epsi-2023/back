import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { CommentsController } from './controllers/comments.controller';
import { CommentsEntity } from './entities/comments.entity';
import { CommentsService } from './services/comment.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([CommentsEntity]),
        UserModule,
    ],
    controllers: [
        CommentsController
    ],
    providers: [
        CommentsService
    ],
    exports: [
        CommentsService
    ]
})
export class CommentsModule { }
