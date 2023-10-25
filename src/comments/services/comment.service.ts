import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination, PaginationOptionsInterface } from 'src/utils/databases/paginate';
import { Repository } from 'typeorm';
import { CommentsEntity } from '../entities/comments.entity';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(CommentsEntity)
        private readonly restaurantsRepository: Repository<CommentsEntity>,
    ) { }

    async find(
        options?: PaginationOptionsInterface
    ): Promise<Pagination<CommentsEntity>> {
        const [results, total] = await this.restaurantsRepository.findAndCount({
            take: options?.limit ?? 20,
            skip: options?.page ?? 0, // think this needs to be page * limit
        });

        return new Pagination<CommentsEntity>({
            results,
            total,
        });
    }

    findOne(id: number): Promise<CommentsEntity | null> {
        return this.restaurantsRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.restaurantsRepository.delete(id);
    }
}