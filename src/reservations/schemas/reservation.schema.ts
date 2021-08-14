import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
  @Prop()
  apartmentName: string;

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

  constructor(reservation?: Partial<Reservation>) {
    this.apartmentName = reservation?.apartmentName;
    this.dateCheckin = reservation?.dateCheckin;
    this.dateCheckout = reservation?.dateCheckout;
    this.numberGuests = reservation?.numberGuests;
    this.nameGuests = reservation?.nameGuests;
    this.guestEmail = reservation?.guestEmail;
  }
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
