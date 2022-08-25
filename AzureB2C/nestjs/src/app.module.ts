import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './profile/profile.module';
import { AzureADStrategy } from './azure-ad.guard';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [ProfileModule,PassportModule],
  controllers: [AppController],
  providers: [AppService,AzureADStrategy],
})
export class AppModule {}
