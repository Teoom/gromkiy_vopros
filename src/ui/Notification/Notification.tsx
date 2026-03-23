import { useEffect, type ReactNode } from 'react';

import styles from './Notification.module.css';

export default function Notification({
  text,
  onClose
}: {
  text: ReactNode;
  onClose: () => void;
}) {
  useEffect(() => {
    setTimeout(onClose, 2500);
  }, [onClose]);

  return <h3 className={styles.title}>{text}</h3>;
}
