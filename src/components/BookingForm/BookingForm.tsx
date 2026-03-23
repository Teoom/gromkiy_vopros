import { useMemo, useState } from 'react';
import type {
  BookingFormData,
  BookingFormSubmit,
  QuestBookingTime
} from '../../types';

import styles from './BookingForm.module.css';
import { questBookingApi } from '../../api';

interface BookingFormProps {
  date: string;
  time: string;
  price: number;
  other: QuestBookingTime;
  onSubmited: (value: boolean | null) => void;
}

export default function BookingForm({
  date,
  time,
  price,
  other,
  onSubmited
}: BookingFormProps) {
  const [submitData, setSubmitData] = useState<BookingFormData>(
    {} as BookingFormData
  );
  const [errors, setErrors] = useState<Record<keyof BookingFormData, boolean>>(
    {} as Record<keyof BookingFormData, boolean>
  );

  const [isCommentFieldActive, setisCommentFieldActive] = useState(false);
  const someErorr = useMemo(
    () => Object.values(errors).some(Boolean),
    [errors]
  );

  const handlerSubmit = async (event: React.SubmitEvent) => {
    event.preventDefault();
    onSubmited(false);
    setTimeout(() => {
      onSubmited(null);
    }, 3000);

    const fullSubmitData: BookingFormSubmit = {
      id: '69b13c41001da40829feec84',
      clientName: submitData.name + ' ' + submitData.surname,
      comment: submitData.comment || '',
      discount: {},
      players: submitData.players,
      certificate: 0,
      user: '',
      price,
      email: submitData.email,
      clientTelephone: Number(
        '8' + submitData.phoneNumber.split('').filter(Number).join('').slice(1)
      ),
      boockingDate: other.dateUTC,
      optionsList: {
        ids: [],
        objects: []
      },

      other
    };

    try {
      const resp = await questBookingApi(fullSubmitData);

      if ('status' in resp) {
        onSubmited(true);
      } else {
        onSubmited(false);
      }
    } catch (err) {
      onSubmited(false);
    }

    setTimeout(() => {
      onSubmited(null);
    }, 3000);
  };

  const isFormValid = useMemo(() => {
    const requiredFields: (keyof BookingFormData)[] = [
      'name',
      'surname',
      'phoneNumber',
      'email',
      'players'
    ];

    return (
      !Object.values(errors).some(Boolean) &&
      requiredFields.every((field) => {
        const value = submitData[field];
        return value !== undefined && value !== null && value !== '';
      })
    );
  }, [submitData, errors]);

  return (
    <div className={styles.formWrapper}>
      <h4 className={styles.formBookingTitle}>Бронирование квеста</h4>
      <h3 className={styles.formBookingQuestTitle}>Громкий вопрос - Vip 2</h3>
      <div className={styles.formBookingInfo}>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Дата</span>
          <div className={styles.infoValue}>
            {Intl.DateTimeFormat('ru-Ru').format(new Date(date))}
          </div>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Время</span>
          <div className={styles.infoValue}>{time}</div>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Цена</span>
          <div className={styles.infoValue} style={{ color: '#ffbd19' }}>
            {price} ₽
          </div>
        </div>
      </div>

      <form onSubmit={handlerSubmit} className={styles.form}>
        <fieldset className={styles.formGroup}>
          {/*Имя */}
          <input
            type='text'
            name='firstName'
            placeholder='Имя'
            className={`${styles.formField} ${errors.name ? styles.formFieldError : styles.formField}`}
            value={submitData.name || ''}
            onChange={(e) => {
              const value = e.target.value;
              setSubmitData({ ...submitData, name: value });
              setErrors({ ...errors, name: value.trim() === '' });
            }}
            onFocus={() => {
              if (!submitData.name) {
                setErrors({ ...errors, name: true });
              }
            }}
          />
          {/*Фамилия */}
          <input
            type='text'
            name='lastName'
            placeholder='Фамилия'
            className={`${styles.formField} ${errors.surname ? styles.formFieldError : styles.formField}`}
            value={submitData.surname || ''}
            onChange={(e) => {
              const value = e.target.value;
              setSubmitData({ ...submitData, surname: value });
              setErrors({ ...errors, surname: value.trim() === '' });
            }}
            onFocus={() => {
              if (!submitData.surname) {
                setErrors({ ...errors, surname: true });
              }
            }}
          />
          {/*Телефон */}
          <input
            type='text'
            name='phoneNumber'
            placeholder='Телефон'
            className={`${styles.formField} ${errors.phoneNumber ? styles.formFieldError : styles.formField}`}
            value={submitData.phoneNumber || ''}
            onChange={(e) => {
              if (e.target.value.length > 17) return;

              setErrors({
                ...errors,
                phoneNumber: e.target.value.length !== 17
              });

              if (
                submitData.phoneNumber?.length === 0 ||
                !submitData.phoneNumber
              ) {
                setSubmitData({ ...submitData, phoneNumber: '+7 (' });

                return;
              }

              if (
                submitData.phoneNumber.length === 5 &&
                e.target.value.length === 4
              ) {
                setSubmitData({ ...submitData, phoneNumber: '' });
                return;
              }

              if (
                submitData.phoneNumber.length === 10 &&
                e.target.value.length === 9
              ) {
                setSubmitData({
                  ...submitData,
                  phoneNumber: e.target.value.slice(0, 7)
                });
                return;
              }

              if (
                submitData.phoneNumber.length === 14 &&
                e.target.value.length === 13
              ) {
                setSubmitData({
                  ...submitData,
                  phoneNumber: e.target.value.slice(0, 12)
                });
                return;
              }

              const isNumber = /[0-9]/.test(
                e.target.value[e.target.value.length - 1]
              );

              if (!isNumber) return;

              if (e.target.value.length === 7) {
                setSubmitData({
                  ...submitData,
                  phoneNumber:
                    submitData.phoneNumber +
                    e.target.value[e.target.value.length - 1] +
                    ') '
                });
                return;
              }

              if (e.target.value.length === 12) {
                setSubmitData({
                  ...submitData,
                  phoneNumber: e.target.value + '-'
                });

                return;
              }

              setSubmitData({ ...submitData, phoneNumber: e.target.value });
            }}
            onFocus={() => {
              if (!submitData.phoneNumber) {
                setErrors({ ...errors, phoneNumber: true });
              }
            }}
          />
          {/*Почта */}
          <input
            type='email'
            name='email'
            autoComplete='off'
            placeholder='Email'
            className={`${styles.formField} ${errors.email ? styles.formFieldError : styles.formField}`}
            value={submitData.email || ''}
            onChange={(e) => {
              const value = e.target.value;
              setSubmitData({ ...submitData, email: value });
              setErrors({
                ...errors,
                email:
                  value.trim() === '' ||
                  !/^[a-zA-Z0-9]+@[a-zA-Z0-9]{1,5}\.[a-zA-Z]{2,}$/.test(value)
              });
            }}
            onFocus={() => {
              if (!submitData.email) {
                setErrors({ ...errors, email: true });
              }
            }}
          />
        </fieldset>

        {/*Количество игроков */}
        <input
          type='number'
          min={3}
          max={6}
          defaultValue={3}
          name='players'
          placeholder='Введите количество игроков от 3 до 6'
          className={`${styles.formField} ${errors.players ? styles.formFieldError : styles.formField}`}
          value={submitData.players || ''}
          onChange={(e) => {
            const value = e.target.value;
            setSubmitData({ ...submitData, players: Number(value) });
            setErrors({
              ...errors,
              players:
                value.trim() === '' || Number(value) < 3 || Number(value) > 6
            });
          }}
        />

        {!isCommentFieldActive && (
          <button
            className={styles.commentFieldButton}
            onClick={() => {
              setisCommentFieldActive(true);
            }}
          >
            Добавить комментарии
          </button>
        )}

        {/*Комментарии к бронированию */}
        {isCommentFieldActive && (
          <textarea
            placeholder='Комментарии к бронированию'
            name='comment'
            className={styles.formField}
            value={submitData.comment || ''}
            onChange={(e) => {
              setSubmitData({ ...submitData, comment: e.target.value });
            }}
          />
        )}
        <button className={styles.submitButton} disabled={!isFormValid}>
          Забронировать игру
        </button>
        {someErorr && (
          <span className={styles.formError}>
            *Заполните корректно поля, выделенные красным.
          </span>
        )}

        <p className={styles.formAgreement}>
          Нажимая кнопку «Забронировать игру» вы принимаете условия соглашения о{' '}
          <a
            href='https://questadmin.ru/clients_doc.pdf'
            target='_blank'
            className={styles.formAgreementLink}
          >
            персональных данных
          </a>
        </p>
      </form>
    </div>
  );
}
