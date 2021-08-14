import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
  @Prop()
  apartnamentName: string;

  @Prop()
  dateCheckin: Date;

  @Prop()
  dateCheckout: Date;

  @Prop()
  numberGuests: number;

  @Prop([String])
  nameGuests: string[];

  @Prop()
  guestEmail: string;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
