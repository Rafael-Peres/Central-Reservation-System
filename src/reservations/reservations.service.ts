import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';
import { Model } from 'mongoose';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Reservation, ReservationDocument } from './schemas/reservation.schema';

@Injectable()
export class ReservationService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
  ) {}

  queryAnd = async (checkin, checkout) => {
    return {
      $and: [
        {
          checkin: {
            $gte: dayjs(checkin).toDate(),
            $lte: dayjs(checkin).endOf('day').toDate(),
          },
        },
        {
          checkout: {
            $gte: dayjs(checkout).toDate(),
            $lte: dayjs(checkout).endOf('day').toDate(),
          },
        },
      ],
    };
  };

  queryOr = async (checkin, checkout) => {
    return {
      $or: [
        {
          checkin: {
            $gte: dayjs(checkin).toDate(),
            $lte: dayjs(checkin).endOf('day').toDate(),
          },
        },
        {
          checkout: {
            $gte: dayjs(checkout).toDate(),
            $lte: dayjs(checkout).endOf('day').toDate(),
          },
        },
      ],
    };
  };

  create(createReservationDto: CreateReservationDto) {
    return this.reservationModel.create(createReservationDto);
  }

  findAll() {
    return this.reservationModel.find();
  }

  async findByCheck(query) {
    const { checkin, checkout } = query;
    let check;

    if (checkin && checkout) {
      check = await this.queryAnd(checkin, checkout);
    } else {
      check = await this.queryOr(checkin, checkout);
    }
    return this.reservationModel.find(check);
  }

  update(id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationModel.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        $set: updateReservationDto,
      },
      {
        new: true,
      },
    );
  }

  remove(id: string) {
    return this.reservationModel.deleteOne({
      _id: id,
    });
  }
}
