import styles from './LoadingIndicator.module.css';

interface LoadingIndicatorProps {
  label: string;
}

export function LoadingIndicator({ label }: LoadingIndicatorProps) {
  return (
    <div className={styles.wrapper} role="status" aria-label={label}>
      <span className={styles.spinner} />
    </div>
  );
}
