import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemoriesModule } from './memories/memories.module';
import { AppConfigurationModule } from './config/config.module';

@Module({
  imports: [MemoriesModule, AppConfigurationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
