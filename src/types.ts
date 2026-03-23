export interface QuestBookingTime {
  id: number;
  price: number;
  time: string;
  spPriceArr: null;
  date: string;
  is_free: string;
  dateUTC: string;
  timestamp: number;
  status: boolean;
}

export interface QuestBookingDay {
  date: string;
  dayOfWeak: string;
  day: string;
  intervals: QuestBookingTime[];
}

export interface QuestScheduleResposne {
  date: string;
  intervals: QuestBookingDay[];
}

export interface BookingFormSubmit {
  id: string;
  clientName: string;
  email: string;
  comment: string;
  clientTelephone: number;
  boockingDate: string;
  price: number;
  user: string;
  optionsList: {
    ids: [];
    objects: [];
  };
  discount: object;
  certificate: number;
  players: number;
  other: QuestBookingTime;
}

export interface SelectedBooking {
  date: string;
  time: string;
  price: number;
  other: QuestBookingTime;
}

export type BookingFormData = Pick<
  BookingFormSubmit,
  'email' | 'comment' | 'players'
> & { name: string; surname: string; phoneNumber: string };
