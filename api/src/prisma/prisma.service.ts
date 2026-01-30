import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect()
      .then(() => console.log('connected to the DB'))
      .catch((error) => console.log(error));
  }

  async onModuleDestroy() {
    await this.$disconnect().then(()=>console.log('disconnected from DB'));
  }
}
