import { Module } from '@nestjs/common';
import { StockmovementsService } from './stockmovements.service';
import { StockmovementsController } from './stockmovements.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [StockmovementsController],
  providers: [StockmovementsService],
})
export class StockmovementsModule {}
