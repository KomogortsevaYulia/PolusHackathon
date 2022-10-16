import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { resolve } from 'path';

import { DatabaseModule } from './database/database.module';
import { UserModule } from './user/user.module';
import { CarModule } from './car/car.module';
import { RequestModule } from './request/request.module';
import { WorkingShiftModule } from './working-shift/working-shift.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, 'static'),
    }),
    DatabaseModule,
    UserModule,
    CarModule,
    RequestModule,
    WorkingShiftModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
