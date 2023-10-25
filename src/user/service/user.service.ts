import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination, PaginationOptionsInterface } from 'src/utils/databases/paginate';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly restaurantsRepository: Repository<UserEntity>,
    ) { }

    async find(
        options?: PaginationOptionsInterface
    ): Promise<Pagination<UserEntity>> {
        const [results, total] = await this.restaurantsRepository.findAndCount({
            take: options?.limit ?? 20,
            skip: options?.page ?? 0, // think this needs to be page * limit
        });

        return new Pagination<UserEntity>({
            results,
            total,
        });
    }

    findOne(id: number): Promise<UserEntity | null> {
        return this.restaurantsRepository.findOneBy({ id });
    }
}