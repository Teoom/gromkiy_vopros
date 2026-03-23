import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import CloseIcon from '../../assets/close.svg?react';

import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  const rootModal = document.getElementById('modal')!;

  useEffect(() => {
    if (!isOpen) return;

    const handleCloseModal = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keyup', handleCloseModal);

    return () => document.removeEventListener('keyup', handleCloseModal);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={styles.modal}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      {' '}
      <div className={styles.content}>
        <button
          className={styles.modalCloseButton}
          onClick={() => {
            onClose();
          }}
        >
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>,
    rootModal
  );
}
