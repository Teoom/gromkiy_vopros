import styles from './Loading.module.css';

interface LoadingProps {
  text?: string;
}

export default function Loading({ text }: LoadingProps) {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingCircle}></div>
      {text && <p className={styles.loadingText}>{text}</p>}
    </div>
  );
}
