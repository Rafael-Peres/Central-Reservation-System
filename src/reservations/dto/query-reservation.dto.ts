import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class QueryReservationDto {
  @ApiProperty({ required: false })
  @IsOptional()
  checkin: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  checkout: Date;
}
