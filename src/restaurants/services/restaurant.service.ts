import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentsService, ICommentOutput } from 'src/comments/services/comment.service';
import { Pagination, PaginationOptionsInterface } from 'src/utils/databases/paginate';
import { Like, Repository } from 'typeorm';
import { RestaurantEntity } from '../entities/restaurant.entity';

export type IRestaurantOuput = RestaurantEntity & { comments: Pagination<ICommentOutput>; };


@Injectable()
export class RestaurantService {
    constructor(
        @InjectRepository(RestaurantEntity)
        private readonly restaurantsRepository: Repository<RestaurantEntity>,
        private readonly commentService: CommentsService,
    ) { }

    async find(
        options?: PaginationOptionsInterface & { search?: string; }
    ): Promise<Pagination<RestaurantEntity>> {
        const [results, total] = await this.restaurantsRepository.findAndCount({
            take: options?.limit ?? 20,
            skip: options?.page ?? 0, // think this needs to be page * limit
            where: {
                libelle: options?.search ? Like(`%${options.search}%`) : undefined,
            }
        });

        for (const restaurant of results) {
            restaurant.rating = Math.round(restaurant.rating * 10) / 10;
        }

        return new Pagination<RestaurantEntity>({
            results,
            total,
        });
    }

    async findOne(id: number, options?: PaginationOptionsInterface): Promise<IRestaurantOuput | null> {
        const restaurant = await this.restaurantsRepository.findOneBy({ id });
        restaurant.rating = Math.round(restaurant.rating * 10) / 10;

        const restaurantOutput: IRestaurantOuput = {
            ...restaurant,
            comments: await this.commentService.findByRestaurantId(restaurant.id, options),
        };

        return restaurantOutput;
    }

    async remove(id: number): Promise<void> {
        await this.restaurantsRepository.delete(id);
    }
}