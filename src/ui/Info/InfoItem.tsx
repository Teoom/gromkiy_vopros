import { type ReactElement } from 'react';

import styles from './InfoItem.module.css';

type InfoItemProps = {
  icon: ReactElement;
  text: string;
  repeat?: number;
  countPaint?: number;
};

export default function InfoItem({
  icon: Icon,
  text,
  repeat = 1,
  countPaint = 0
}: InfoItemProps) {
  return (
    <div className={styles.infoItem}>
      <div className={styles.iconWrapper}>
        {Array.from({ length: repeat }).map((_, idx) => (
          <span
            className={styles.icon}
            key={idx}
            style={{
              color: idx < countPaint ? 'var(--accent)' : 'var(--base-white)'
            }}
          >
            {Icon}
          </span>
        ))}
      </div>
      <span className={styles.text}>{text}</span>
    </div>
  );
}
