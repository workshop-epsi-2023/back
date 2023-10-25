import { Controller, Get, Query } from '@nestjs/common';
import { Pagination, PaginationOptionsInterface } from 'src/utils/databases/paginate';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../service/user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Get()
    find(@Query() query?: PaginationOptionsInterface): Promise<Pagination<UserEntity>> {
        return this.userService.find(query);
    }

}