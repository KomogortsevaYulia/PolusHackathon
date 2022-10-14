import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepo: Repository<User>,
    @Inject('ROLE_REPOSITORY')
    private roleRepo: Repository<Role>,
  ) {}

  async getById(id: number) {
    return this.userRepo.findOne({ where: { id }, relations: { role: true } });
  }
}
