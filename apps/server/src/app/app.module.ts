import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from '../clients/clients.module';
import goCardlessConfig from '../configuration/go-cardless.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [goCardlessConfig] }),
    ClientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
