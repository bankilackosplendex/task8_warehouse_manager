import { Module } from '@nestjs/common';
import { StockmovementsService } from './stockmovements.service';
import { StockmovementsController } from './stockmovements.controller';

@Module({
  controllers: [StockmovementsController],
  providers: [StockmovementsService],
})
export class StockmovementsModule {}
