import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
  @ApiProperty()
  apartmentName: string;

  @ApiProperty()
  dateCheckin: Date;

  @ApiProperty()
  dateCheckout: Date;

  @ApiProperty()
  numberGuests: number;

  @ApiProperty()
  nameGuests: Array<string>;

  @ApiProperty()
  guestEmail: string;
}
