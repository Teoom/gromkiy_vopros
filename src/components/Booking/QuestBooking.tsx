import { useEffect, useMemo, useState } from 'react';
import type { QuestBookingDay, SelectedBooking } from '../../types';
import { getQuestSchedule } from '../../api';

import styles from './QuestBooking.module.css';
import Loading from '../../ui/Loading/Loading';

export default function QuestBooking({
  onSelectedBooking,
  openModal
}: {
  onSelectedBooking: (value: SelectedBooking) => void;
  openModal: (value: boolean) => void;
}) {
  const [bookingList, setBookingList] = useState<QuestBookingDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [week, setWeek] = useState(0);

  const weekList = useMemo(
    () => bookingList.slice(week * 7, (week + 1) * 7),
    [week, bookingList]
  );

  useEffect(() => {
    getQuestSchedule().then((data) => {
      if (!('error' in data)) {
        setBookingList(data);
      }

      setLoading(false);
    });
  }, []);

  if (loading) {
    return <Loading text='Пожалуйста, подождите. Расписание загружается...' />;
  }

  if (!bookingList.length) {
    return (
      <h3>
        Нет никакой даты для записи! Либо всё забронировано. Позвоните для
        уточнения.
      </h3>
    );
  }

  return (
    <div className={styles.questBooking}>
      {weekList.map((note) => {
        const nameOfDay = new Intl.DateTimeFormat('ru-Ru', {
          weekday: 'short'
        }).format(new Date(note.intervals[0].dateUTC));
        const formatedNameOfDay = nameOfDay[0].toUpperCase() + nameOfDay[1];

        return (
          <div key={note.date} className={styles.questSlots}>
            <span className={styles.questSlotDate}>
              {note.date}{' '}
              <b style={{ color: '#d198e8' }}>{formatedNameOfDay}</b>
            </span>

            <ul className={styles.questSlotsTime}>
              {note.intervals.map((time) => (
                <li key={time.id}>
                  <button
                    className={styles.questBookingButton}
                    disabled={!time.status}
                    onClick={() => {
                      onSelectedBooking({
                        date: time.date,
                        time: time.time,
                        price: time.price,
                        other: time
                      });
                      openModal(true);
                    }}
                  >
                    <span>{time.time}</span>
                    <span className={styles.questPrice}>{time.price} ₽</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}

      <button
        className={styles.weekNavigator}
        onClick={() => {
          setWeek((week) =>
            (week + 1) * 7 > bookingList.length - 1 ? week - 1 : week + 1
          );
        }}
      >
        {(week + 1) * 7 > bookingList.length - 1
          ? '← Пред. нед.'
          : 'След. нед. →'}
      </button>
    </div>
  );
}
