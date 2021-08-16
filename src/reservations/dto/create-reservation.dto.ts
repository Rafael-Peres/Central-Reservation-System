import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
  @ApiProperty()
  apartmentName: string;

  @ApiProperty()
  checkin: Date;

  @ApiProperty()
  checkout: Date;

  @ApiProperty()
  numberGuests: number;

  @ApiProperty()
  nameGuests: Array<string>;

  @ApiProperty()
  guestEmail: string;
}
