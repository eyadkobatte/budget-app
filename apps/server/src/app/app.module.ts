import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from '../clients/clients.module';
import { MongooseModule } from '@nestjs/mongoose';

import goCardlessConfig from '../configuration/go-cardless.config';
import databaseConfig from '../configuration/database.config';
import { AccountSyncModule } from '../account-sync/account-sync.module';
import { ApiV1Module } from '../api/v1/v1.module';
import authConfig from '../configuration/auth.config';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, goCardlessConfig, authConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [databaseConfig.KEY],
      useFactory: async (dbConfig: ConfigType<typeof databaseConfig>) => {
        return { uri: dbConfig.url };
      },
    }),
    ClientsModule,
    AccountSyncModule,
    ApiV1Module,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
// implements OnApplicationBootstrap
export class AppModule {
  // constructor(private goCardless: GocardlessService) {}
  // onApplicationBootstrap() {
  //   this.goCardless.setupBank();
  // }
}
