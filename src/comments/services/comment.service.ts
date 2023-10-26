import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/service/user.service';
import { Pagination, PaginationOptionsInterface } from 'src/utils/databases/paginate';
import { Repository } from 'typeorm';
import { CommentsEntity } from '../entities/comments.entity';

export type CommentInput = Omit<CommentsEntity, "id">;
export type ICommentOutput = Omit<CommentsEntity, "userId"> & { user: UserEntity; };
@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(CommentsEntity)
        private readonly commentRepository: Repository<CommentsEntity>,
        private readonly userService: UserService,
    ) { }

    private async getCommentOutput(results: CommentsEntity[]): Promise<ICommentOutput[]> {
        const commentOutput: ICommentOutput[] = [];

        for (const comment of results) {
            const commentToPush: ICommentOutput = {
                comment: comment.comment,
                note: Math.round(comment.note * 10) / 10,
                restaurantId: comment.restaurantId,
                user: await this.userService.findOneById(comment.userId),
                id: comment.id,
                date: comment.date
            };


            commentOutput.push(commentToPush);

        }

        return commentOutput;
    }

    public async find(
        options?: PaginationOptionsInterface
    ): Promise<Pagination<ICommentOutput>> {
        const [results, total] = await this.commentRepository.findAndCount({
            take: options?.limit ?? 20,
            skip: options?.page ?? 0, // think this needs to be page * limit
            order: {
                date: "DESC"
            }
        });


        return new Pagination<ICommentOutput>({
            results: await this.getCommentOutput(results),
            total,
        });
    }

    public findOne(id: number): Promise<CommentsEntity | null> {
        return this.commentRepository.findOneBy({ id });
    }

    public async findByRestaurantId(restaurantId: number, options: PaginationOptionsInterface): Promise<Pagination<ICommentOutput>> {
        const [results, total] = await this.commentRepository.findAndCount({
            where: { restaurantId },
            order: {
                date: "DESC"
            },
            take: 20,
            skip: options?.page ?? 0, // think this needs to be page * limit
        });

        return new Pagination<ICommentOutput>({
            results: await this.getCommentOutput(results),
            total,
        });
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