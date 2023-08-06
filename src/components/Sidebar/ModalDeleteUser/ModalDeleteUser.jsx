import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { deleteUserThunk } from 'redux/auth/authOperations';
import { deleteTasksThunk } from 'redux/tasks/tasksOperations';
import css from './modalDeleteUser.module.scss';

const ModalDeleteUser = ({ closeModal }) => {
  const [openModal] = useState(true);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    dispatch(deleteTasksThunk());
    dispatch(deleteUserThunk());

    closeModal();
  };

  const template = (
    <div className={css.modalWrapper}>
      <p className={css.modalTitle}>
        Are you absolutely sure that you want to permanently delete your account
        and all content?
      </p>

      <div className={css.btnWrapper}>
        <button className={css.modalBtn} name="yes" onClick={handleSubmit}>
          Confirme
        </button>

        <button className={css.modalBtn} name="no" onClick={closeModal}>
          Consel
        </button>
      </div>
    </div>
  );

  return openModal
    ? createPortal(template, document.getElementById('modal'))
    : null;
};

ModalDeleteUser.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default ModalDeleteUser;
