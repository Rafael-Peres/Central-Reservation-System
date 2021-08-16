import { Test, TestingModule } from '@nestjs/testing';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { QueryReservationDto } from './dto/query-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationController } from './reservations.controller';
import { ReservationService } from './reservations.service';

describe('ReservationController', () => {
  let reservationController: ReservationController;
  let reservationService: ReservationService;

  const newReservationSchema = {
    apartmentName: 'string',
    checkin: new Date(),
    checkout: new Date(),
    numberGuests: 0,
    nameGuests: ['string'],
    guestEmail: 'string',
  };

  const updateReservationSchema = {
    apartmentName: 'Housi',
    checkin: new Date(),
    checkout: new Date(),
    numberGuests: 3,
    nameGuests: ['rafael', 'peres'],
    guestEmail: 'rafael@email.com',
  };

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

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationController],
      providers: [
        {
          provide: ReservationService,
          useValue: {
            create: jest.fn().mockResolvedValue(newReservationSchema),
            findAll: jest.fn().mockResolvedValue(reservationSchemaList),
            findByCheck: jest.fn().mockResolvedValue(reservationSchemaList[0]),
            update: jest.fn().mockResolvedValue(updateReservationSchema),
            remove: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    reservationController = module.get<ReservationController>(
      ReservationController,
    );
    reservationService = module.get<ReservationService>(ReservationService);
  });

  it('should be defined', () => {
    expect(reservationController).toBeDefined();
    expect(reservationService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new reservation successfully', async () => {
      const data: CreateReservationDto = {
        apartmentName: 'string',
        checkin: new Date(),
        checkout: new Date(),
        numberGuests: 0,
        nameGuests: ['string'],
        guestEmail: 'string',
      };

      const result = await reservationController.create(data);

      expect(result).toEqual(newReservationSchema);
    });
  });

  describe('findAll', () => {
    it('should return a reservation list successfuly', async () => {
      const result = await reservationController.findAll();

      expect(result).toEqual(reservationSchemaList);
      expect(typeof result).toEqual('object');
      expect(reservationService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(reservationService, 'findAll')
        .mockRejectedValueOnce(new Error());

      expect(reservationController.findAll()).rejects.toThrowError();
    });
  });

  describe('findByCheck', () => {
    const query: QueryReservationDto = {
      checkin: new Date(),
      checkout: new Date(),
    };
    it('should return a reservation list by checkin and checkout successfuly', async () => {
      const result = await reservationController.findByCheck(query);

      expect(result).toEqual(reservationSchemaList[0]);
      expect(typeof result).toEqual('object');
      expect(reservationService.findByCheck).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(reservationService, 'findByCheck')
        .mockRejectedValueOnce(new Error());

      expect(reservationController.findByCheck(query)).rejects.toThrowError();
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

    it('should update a reservation successfully', async () => {
      const result = await reservationController.update('1', data);

      expect(result).toEqual(updateReservationSchema);
      expect(reservationService.update).toHaveBeenCalledTimes(1);
      expect(reservationService.update).toHaveBeenCalledWith('1', data);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(reservationService, 'update')
        .mockRejectedValueOnce(new Error());

      expect(reservationController.update('1', data)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should remove a reservation', async () => {
      const result = await reservationController.remove('1');

      expect(result).toBeUndefined();
    });

    it('should throw an excpetion', () => {
      jest
        .spyOn(reservationService, 'remove')
        .mockRejectedValueOnce(new Error());

      expect(reservationController.remove('1')).rejects.toThrowError();
    });
  });
});
