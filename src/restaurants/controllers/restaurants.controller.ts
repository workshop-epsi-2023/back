import { Controller, Get, Param, Query } from '@nestjs/common';
import { Pagination, PaginationOptionsInterface } from 'src/utils/databases/paginate';
import { RestaurantEntity } from '../entities/restaurant.entity';
import { RestaurantService } from '../services/restaurant.service';

@Controller('restaurants')
export class RestaurantController {
    constructor(
        private readonly restaurantService: RestaurantService
    ) { }

    @Get()
    find(@Query() query?: PaginationOptionsInterface): Promise<Pagination<RestaurantEntity>> {
        return this.restaurantService.find(query);
    }

    @Get('/:id')
    findById(@Param() params: { id: number; }): Promise<RestaurantEntity> {
        return this.restaurantService.findOne(params.id);
    }

}