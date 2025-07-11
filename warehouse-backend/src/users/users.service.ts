import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private prisma: DatabaseService) {}

  // --- CREATE A NEW USER ---
  create(createUserDto: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  // --- GET ALL USRES ---
  findAll() {
    return this.prisma.user.findMany();
  }

  // --- GET ONE SPECIFIC USER BY ID ---
  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  // --- UPDATE ONE SPECIFIC USER BY ID ---
  async update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    await this.findOne(id);
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  // --- DELETE ONE SPECIFIC USER BY ID ---
  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.user.delete({ where: { id } });
  }
}
