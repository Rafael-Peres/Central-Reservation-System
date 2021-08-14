import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReservationModule } from './reservations/reservations.module';
@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@crs.kgew5.mongodb.net/CRS?retryWrites=true&w=majority',
    ),
    ReservationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
