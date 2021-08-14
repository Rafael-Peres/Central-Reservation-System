import { Test, TestingModule } from '@nestjs/testing';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationController } from './reservations.controller';
import { ReservationService } from './reservations.service';

describe('ReservationController', () => {
  let reservationController: ReservationController;
  let reservationService: ReservationService;

  const newReservationSchema = {
    apartmentName: 'string',
    dateCheckin: new Date(),
    dateCheckout: new Date(),
    numberGuests: 0,
    nameGuests: ['string'],
    guestEmail: 'string',
  };

  const updateReservationSchema = {
    apartmentName: 'Housi',
    dateCheckin: new Date(),
    dateCheckout: new Date(),
    numberGuests: 3,
    nameGuests: ['rafael', 'peres'],
    guestEmail: 'rafael@email.com',
  };

  const ReservationSchemaList = [
    {
      apartmentName: 'string',
      dateCheckin: new Date(),
      dateCheckout: new Date(),
      numberGuests: 1,
      nameGuests: ['string'],
      guestEmail: 'string',
    },
    {
      apartmentName: 'string',
      dateCheckin: new Date(),
      dateCheckout: new Date(),
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
            findAll: jest.fn().mockResolvedValue(ReservationSchemaList),
            findOne: jest.fn(),
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
    it('should return reservation object created', async () => {
      const body: CreateReservationDto = {
        apartmentName: 'string',
        dateCheckin: new Date(),
        dateCheckout: new Date(),
        numberGuests: 0,
        nameGuests: ['string'],
        guestEmail: 'string',
      };

      const result = await reservationController.create(body);

      expect(result).toEqual(newReservationSchema);
    });
  });

  describe('findAll', () => {
    it('should return a reservation list successfuly', async () => {
      const result = await reservationController.findAll();

      expect(result).toEqual(ReservationSchemaList);
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

  describe('update', () => {
    const body: UpdateReservationDto = {
      apartmentName: 'string',
      dateCheckin: new Date(),
      dateCheckout: new Date(),
      numberGuests: 0,
      nameGuests: ['string'],
      guestEmail: 'string',
    };

    it('should update a reservation successfully', async () => {
      const result = await reservationController.update('1', body);

      expect(result).toEqual(updateReservationSchema);
      expect(reservationService.update).toHaveBeenCalledTimes(1);
      expect(reservationService.update).toHaveBeenCalledWith('1', body);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(reservationService, 'update')
        .mockRejectedValueOnce(new Error());

      expect(reservationController.update('1', body)).rejects.toThrowError();
    });
  });

  describe('delete', () => {
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
