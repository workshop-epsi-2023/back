import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantController } from './controllers/restaurants.controller';
import { RestaurantEntity } from './entities/restaurant.entity';
import { RestaurantService } from './services/restaurant.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([RestaurantEntity])
    ],
    controllers: [
        RestaurantController
    ],
    providers: [
        RestaurantService
    ],
})
export class RestaurantModule { }
