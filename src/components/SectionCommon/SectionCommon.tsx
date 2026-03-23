// import './SectionCommon.css';
import HumanIcon from '../../assets/human.svg?react';
import TimeIcon from '../../assets/time.svg?react';
import SwordIcon from '../../assets/sword.svg?react';
import JasonIcon from '../../assets/jason-mask.svg?react';
import LocationIcon from '../../assets/location-pin.svg?react';
import PhoneIcon from '../../assets/phone.svg?react';
import InfoItem from '../../ui/Info/InfoItem';
import QuestBooking from '../Booking/QuestBooking';
import Notification from '../../ui/Notification/Notification';

import styles from './SectionCommon.module.css';
import { useState } from 'react';
import Modal from '../../ui/Modal/Modal';
import BookingForm from '../BookingForm/BookingForm';
import type { SelectedBooking } from '../../types';

export default function SectionCommon() {
  const [selectedSlot, setSelectedSlot] = useState<SelectedBooking | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmited, setIsSubmited] = useState<boolean | null>(null);

  return (
    <>
      <section className={styles.section}>
        <div className='big-overlay'>
          <div className='bottom-overlay'></div>
        </div>
        <div className={`container ${styles.questCommon}`}>
          <div className={styles.questHeader}>
            <h1 className={styles.questTitle}>Квест «Громкий Вопрос VIP-2»</h1>
            <div className={styles.questBadges}>
              <span className={styles.badge}>NEW</span>
              <span className={styles.badge}>+16</span>
            </div>
          </div>
          <div className={styles.commonInfo}>
            {/* Количество участников на квест */}
            <InfoItem
              icon={<HumanIcon />}
              repeat={6}
              countPaint={4}
              text='4 — 6 чел'
            />

            {/* Длительность квеста */}
            <InfoItem icon={<TimeIcon />} text='90 мин.' />

            {/* Сложность квеста */}
            <InfoItem
              icon={<SwordIcon />}
              repeat={3}
              countPaint={2}
              text='Средний'
            />

            {/* Квест совместно с актёрами квеста/без */}
            <InfoItem icon={<JasonIcon />} text='Без актёров' />

            <div className={styles.questPrice}>
              <span className={styles.questPrice_text}>Цена:</span>
              <span className={styles.questPrice_text}>
                &nbsp;от&nbsp;10000&nbsp;₽
              </span>
              <a href='#booking' className={styles.questPrice_link}>
                Забронировать
              </a>
            </div>
          </div>
          <div className={styles.questLocation}>
            <address className='address'>
              Адрес:
              <span className={styles.questAddress}>
                <LocationIcon className={styles.locationIcon} />
                г. Красноярск, Октябрьская улица, 10 (лаундж-бар "Цоколь")
                <a href='#map' className={styles.locationLink}>
                  (показать на карте)
                </a>
              </span>
            </address>
            <a className='tel' href='tel:+73912699107'>
              <PhoneIcon
                style={{
                  width: '1rem',
                  height: '1rem',
                  color: 'var(--accent)',
                  marginRight: '0.5rem'
                }}
              />
              +7 (391) 269-91-07
            </a>
          </div>
          <div className={styles.questDescription}>
            <h2 className='subTitle'>Описание квеста</h2>
            <p className='text'>
              Представьте себе зал, где смекалка встречается с абсурдом, а
              каждое правильное слово звучит громче, чем все остальные — это и
              есть «Громкий вопрос». Один участник из команды вытаскивает
              вопрос, вы — отвечаете. Казалось бы, все просто, но игроки не
              слышат друг друга, и любая попытка сговориться тут же превращается
              в комедию ошибок. Готовы проверить свою интуицию и чувство юмора?
              Тогда вступайте в игру.
            </p>
            <p className='text'>
              Когда‑то в небольшом интернет‑шоу команда «Импровизаторы» случайно
              открыла эффект, который перевел обычный викторинный вопрос в
              настоящее испытание коллективного здравого смысла. В одной из
              репетиций микрофоны перепутались — и участники вдруг перестали
              слышать друг друга. Что сначала казалось помехой, быстро
              превратилось в прибор для создания смеха: одинаковые вопросы —
              разные ответы — и родилась новая игра. Вы приходите в
              зал‑лабораторию этой шутки. Ведущий произносит вопрос — и в этот
              момент вступает страж тишины: каждый игрок слышит только себя и
              задачу, но не голоса соседей. Никаких тайных шепотов, никаких
              сговоров — лишь ваше личное решение и мгновенная реакция.
              Правильный ответ остается важным, но дороже всего — умение мыслить
              быстро, импровизировать и не терять юмора, когда очевидное
              превращается в нелепое. Побеждают те, кто умеет слышать не слова,
              а смысл — и делает это громко.
            </p>
            <p className='text'>
              Присоединяйтесь к «Громкому вопросу»: проверьте, насколько громким
              может быть ваш ум и как смешно звучит коллективная тишина.
            </p>
          </div>
          <div className={styles.questNotes}>
            <h2 className='subtitle'>Особенности</h2>
            <p className='text'>
              Основное изображение лицензировано и защищено авторским правом.
              Служит исключительно для иллюстрации и не отражает реальных
              декораций.
            </p>
          </div>
          <div className={styles.questBooking}>
            <h2 className='subtitle' id='booking'>
              Расписание квеста Громкий вопрос - Vip 2
            </h2>
            <p className='text'>
              Выберите удобное для Вас время и нажмите по нему, чтобы
              забронировать его.
              <br />
              <b>Мы не берем комиссию за бронирование игр на нашем сайте.</b>
            </p>
            <p
              className='text'
              style={{ color: 'var(--accent)', fontWeight: 600 }}
            >
              Цена в расписании указана за команду от 3 до 6 человек.
            </p>
          </div>
          <QuestBooking
            onSelectedBooking={setSelectedSlot}
            openModal={setIsModalOpen}
          />
          <div className={styles.questMap}>
            <h2 id='map'>Квест «Громкий вопрос - Vip 2» на карте</h2>
            <iframe
              src='https://yandex.ru/map-widget/v1/?um=constructor%3A7275b67fd21ce166c86aa80743fc8724a1fa38e671ab71c0188dc35cc8d1e376&amp;source=constructor'
              // width='1136'
              // height='698'
              className={styles.iframeMap}
            ></iframe>
          </div>
        </div>
      </section>

      {isModalOpen && selectedSlot && (
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          {isSubmited === null && (
            <BookingForm
              date={selectedSlot.date}
              time={selectedSlot.time}
              price={selectedSlot.price}
              other={selectedSlot.other}
              onSubmited={setIsSubmited}
            />
          )}

          {isSubmited === true && (
            <Notification
              text={
                <>
                  Вы успешно забронировали игру.
                  <br />
                  До скорой встречи.
                </>
              }
              onClose={() => setIsModalOpen(false)}
            />
          )}
          {isSubmited === false && (
            <Notification
              text='Не получилось забронировать. Попробуйте позже.'
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </Modal>
      )}
    </>
  );
}
