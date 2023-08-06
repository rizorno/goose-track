import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './modal.module.scss';

const Modal = ({ children, review, closeModal, overlayClose }) => {
  const [openModal] = useState(true);

  useEffect(() => {
    const modalClose = ({ code }) => {
      if (code === 'Escape' && openModal) {
        closeModal();
      }
    };
    window.addEventListener('keydown', modalClose);
    return () => {
      window.removeEventListener('keydown', modalClose);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal]);

  const template = (
    <div className={css.overlay} onClick={overlayClose}>
      <div
        className={
          review === 'review'
            ? css.modalReview
            : review === 'delete'
            ? null
            : css.modal
        }
      >
        {children}
      </div>
    </div>
  );

  return openModal
    ? createPortal(template, document.getElementById('modal'))
    : null;
};

Modal.propTypes = {
  review: PropTypes.string,

  closeModal: PropTypes.func.isRequired,

  overlayClose: PropTypes.func.isRequired,
};

export default Modal;
