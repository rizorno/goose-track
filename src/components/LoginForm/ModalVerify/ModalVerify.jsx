import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { resendVerifyEmailThunk } from 'redux/auth/authOperations';
import css from './modalVerify.module.scss';

const ModalVerify = ({ closeModal, toggleModal }) => {
  const [openModal] = useState(true);
  const [emailVerify, setEmailVerify] = useState('');
  const dispatch = useDispatch();

  const onChangeEmail = e => {
    setEmailVerify(e.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (emailVerify === '') {
      return;
    } else {
      dispatch(resendVerifyEmailThunk({ email: emailVerify }));
    }

    toggleModal();
  };

  const template = (
    <div className={css.overlay} onClick={closeModal}>
      <div className={css.modalWrapper}>
        <p className={css.modalTitle}>
          Enter the email you provided during registration
        </p>

        <form className={css.modalForm}>
          <label>
            <input
              className={css.modalInput}
              type="email"
              placeholder="Enter your email"
              autoFocus
              value={emailVerify}
              onChange={onChangeEmail}
            />
          </label>

          <button className={css.modalBtn} type="submit" onClick={onSubmit}>
            Confirme
          </button>
        </form>
      </div>
    </div>
  );

  return openModal
    ? createPortal(template, document.getElementById('modal'))
    : null;
};

ModalVerify.propTypes = {
  closeModal: PropTypes.func.isRequired,

  toggleModal: PropTypes.func.isRequired,
};

export default ModalVerify;
