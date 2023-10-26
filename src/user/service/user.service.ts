import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pagination, PaginationOptionsInterface } from 'src/utils/databases/paginate';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

export interface ILoginInput {
    username: string;
    password: string;
}

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly restaurantsRepository: Repository<UserEntity>,
    ) { }

    public async find(
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

    public findOneById(id: number): Promise<UserEntity | null> {
        return this.restaurantsRepository.findOneBy({ id });
    }

    public async login(loginInput: ILoginInput): Promise<UserEntity | null> {
        const user = await this.restaurantsRepository.findOneBy({ pseudo: loginInput.username, password: loginInput.password });

        if (user) {
            return user;
        }

        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

}