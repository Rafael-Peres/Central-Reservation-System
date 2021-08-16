import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { query } from 'express';
import { Model } from 'mongoose';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { QueryReservationDto } from './dto/query-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationService } from './reservations.service';
import { Reservation, ReservationDocument } from './schemas/reservation.schema';

const reservationSchemaList = [
  {
    apartmentName: 'string',
    checkin: new Date(),
    checkout: new Date(),
    numberGuests: 1,
    nameGuests: ['string'],
    guestEmail: 'string',
  },
  {
    apartmentName: 'string',
    checkin: new Date(),
    checkout: new Date(),
    numberGuests: 2,
    nameGuests: ['string'],
    guestEmail: 'string',
  },
];

const newReservationSchema = new Reservation({
  apartmentName: 'string',
  checkin: new Date(),
  checkout: new Date(),
  numberGuests: 0,
  nameGuests: ['string'],
  guestEmail: 'string',
});

const updateReservationSchema = {
  apartmentName: 'Housi',
  checkin: new Date(),
  checkout: new Date(),
  numberGuests: 3,
  nameGuests: ['rafael', 'peres'],
  guestEmail: 'rafael@email.com',
};

describe('ReservationService', () => {
  let reservationService: ReservationService;
  let reservationModel: Model<ReservationDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        {
          provide: getModelToken('Reservation'),
          useValue: {
            create: jest.fn().mockReturnValue(newReservationSchema),
            findAll: jest.fn().mockResolvedValue(reservationSchemaList),
            find: jest.fn().mockResolvedValue(reservationSchemaList),
            update: jest.fn().mockResolvedValue(updateReservationSchema),
            findByIdAndUpdate: jest
              .fn()
              .mockResolvedValue(updateReservationSchema),
            deleteOne: jest.fn().mockResolvedValue(undefined),
            remove: jest.fn(),
            findByCheck: jest.fn().mockResolvedValue(reservationSchemaList),
          },
        },
      ],
    }).compile();

    reservationService = module.get<ReservationService>(ReservationService);
    reservationModel = module.get<Model<ReservationDocument>>(
      getModelToken('Reservation'),
    );
  });

  it('should be defined', () => {
    expect(reservationService).toBeDefined();
    expect(reservationModel).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a reservation list successfully', async () => {
      const result = await reservationService.findAll();

      expect(result).toEqual(reservationSchemaList);
      expect(reservationModel.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(reservationModel, 'find').mockRejectedValueOnce(new Error());

      expect(reservationService.findAll()).rejects.toThrowError();
    });
  });

  describe('findByCheck', () => {
    it('should return a reservation list successfully', async () => {
      const query: QueryReservationDto = {
        checkin: new Date(),
        checkout: new Date(),
      };
      const result = await reservationService.findByCheck(query);

      expect(result).toEqual(reservationSchemaList);
      expect(reservationModel.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(reservationModel, 'find').mockRejectedValueOnce(new Error());

      expect(reservationService.findByCheck(query)).rejects.toThrowError();
    });
  });

  describe('create', () => {
    const data: CreateReservationDto = {
      apartmentName: 'string',
      checkin: new Date(),
      checkout: new Date(),
      numberGuests: 0,
      nameGuests: ['string'],
      guestEmail: 'string',
    };

    it('should create a new reservation successfully', async () => {
      const result = await reservationService.create(data);

      expect(result).toEqual(newReservationSchema);
      expect(reservationModel.create).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(reservationService, 'create')
        .mockRejectedValueOnce(new Error());

      expect(reservationService.create(data)).rejects.toThrowError();
    });
  });

  describe('update', () => {
    const data: UpdateReservationDto = {
      apartmentName: 'string',
      checkin: new Date(),
      checkout: new Date(),
      numberGuests: 0,
      nameGuests: ['string'],
      guestEmail: 'string',
    };

    const id = '1';

    it('should update a reservation successfully', async () => {
      const result = await reservationService.update(id, data);

      expect(result).toEqual(updateReservationSchema);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(reservationModel, 'findByIdAndUpdate')
        .mockRejectedValueOnce(new Error());

      expect(reservationService.update(id, data)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should remove a reservation', async () => {
      const result = await reservationService.remove('1');

      expect(result).toBeUndefined();
      expect(reservationModel.deleteOne).toHaveBeenCalledTimes(1);
    });

    it('should throw an excpetion', () => {
      jest
        .spyOn(reservationModel, 'deleteOne')
        .mockRejectedValueOnce(new Error());

      expect(reservationService.remove('1')).rejects.toThrowError();
    });
  });
});
