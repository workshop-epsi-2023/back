import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination, PaginationOptionsInterface } from 'src/utils/databases/paginate';
import { Repository } from 'typeorm';
import { CommentsEntity } from '../entities/comments.entity';

export type CommentInput = Omit<CommentsEntity, "id">;

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(CommentsEntity)
        private readonly commentRepository: Repository<CommentsEntity>,
    ) { }

    async find(
        options?: PaginationOptionsInterface
    ): Promise<Pagination<CommentsEntity>> {
        const [results, total] = await this.commentRepository.findAndCount({
            take: options?.limit ?? 20,
            skip: options?.page ?? 0, // think this needs to be page * limit
        });

        return new Pagination<CommentsEntity>({
            results,
            total,
        });
    }

    findOne(id: number): Promise<CommentsEntity | null> {
        return this.commentRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.commentRepository.delete(id);
    }

    async create(commentInput: CommentInput): Promise<CommentsEntity> {
        try {
            return this.commentRepository.save({
                comment: commentInput.comment,
                restaurant: commentInput.restaurantId,
                note: commentInput.note,
                restaurantId: commentInput.restaurantId,
                userId: commentInput.userId,
            });
        } catch (e) {
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    };
}