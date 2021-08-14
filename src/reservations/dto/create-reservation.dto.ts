export class CreateReservationDto {
  apartmentName: string;
  dateCheckin: Date;
  dateCheckout: Date;
  numberGuests: number;
  nameGuests: Array<string>;
  guestEmail: string;
}
