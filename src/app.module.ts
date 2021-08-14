import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationsModule } from './reservations/reservations.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@crs.kgew5.mongodb.net/CRS?retryWrites=true&w=majority',
    ),
    ReservationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
