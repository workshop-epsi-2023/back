import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination, PaginationOptionsInterface } from 'src/utils/databases/paginate';
import { Repository } from 'typeorm';
import { RestaurantEntity } from '../entities/restaurant.entity';

@Injectable()
export class RestaurantService {
    constructor(
        @InjectRepository(RestaurantEntity)
        private readonly restaurantsRepository: Repository<RestaurantEntity>,
    ) { }

    async find(
        options?: PaginationOptionsInterface & { search?: string; }
    ): Promise<Pagination<RestaurantEntity>> {
        const [results, total] = await this.restaurantsRepository.findAndCount({
            take: options?.limit ?? 20,
            skip: options?.page ?? 0, // think this needs to be page * limit
            where: {
                libelle: options?.search ? options.search : undefined,
            }
        });

        return new Pagination<RestaurantEntity>({
            results,
            total,
        });
    }

    findOne(id: number): Promise<RestaurantEntity | null> {
        return this.restaurantsRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.restaurantsRepository.delete(id);
    }
}