import { Test, TestingModule } from '@nestjs/testing';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationService } from './reservations.service';

const reservationSchemaList = [
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

const updateReservationSchema = {
  apartmentName: 'Housi',
  dateCheckin: new Date(),
  dateCheckout: new Date(),
  numberGuests: 3,
  nameGuests: ['rafael', 'peres'],
  guestEmail: 'rafael@email.com',
};

describe('ReservationService', () => {
  let reservationService: ReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        {
          provide: ReservationService,
          useValue: {
            create: jest.fn().mockResolvedValue(reservationSchemaList[0]),
            findAll: jest.fn().mockResolvedValue(reservationSchemaList),
            findOne: jest.fn(),
            update: jest.fn().mockResolvedValue(updateReservationSchema),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    reservationService = module.get<ReservationService>(ReservationService);
  });

  it('should be defined', () => {
    expect(reservationService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return a reservation list successfully', async () => {
      const result = await reservationService.findAll();

      expect(result).toEqual(reservationSchemaList);
      expect(reservationService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(reservationService, 'findAll')
        .mockRejectedValueOnce(new Error());

      expect(reservationService.findAll()).rejects.toThrowError();
    });
  });

  describe('create', () => {
    const data: CreateReservationDto = {
      apartmentName: 'string',
      dateCheckin: new Date(),
      dateCheckout: new Date(),
      numberGuests: 0,
      nameGuests: ['string'],
      guestEmail: 'string',
    };

    it('should create a new reservation successfully', async () => {
      const result = await reservationService.create(data);

      expect(result).toEqual(reservationSchemaList[0]);
      expect(reservationService.create).toHaveBeenCalledTimes(1);
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
      dateCheckin: new Date(),
      dateCheckout: new Date(),
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
        .spyOn(reservationService, 'update')
        .mockRejectedValueOnce(new Error());

      expect(reservationService.update(id, data)).rejects.toThrowError();
    });
  });

  describe('remove', () => {
    it('should remove a reservation', async () => {
      const result = await reservationService.remove('1');

      expect(result).toBeUndefined();
    });

    it('should throw an excpetion', () => {
      jest
        .spyOn(reservationService, 'remove')
        .mockRejectedValueOnce(new Error());

      expect(reservationService.remove('1')).rejects.toThrowError();
    });
  });
});
