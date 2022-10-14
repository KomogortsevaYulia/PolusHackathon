import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';

import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { CarModule } from './car/car.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    DatabaseModule,
    UserModule,
    CarModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
