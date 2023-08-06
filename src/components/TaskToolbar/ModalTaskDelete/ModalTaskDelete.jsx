import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getTasksThunk, deleteTaskThunk } from 'redux/tasks/tasksOperations';
import css from './modalTaskDelete.module.scss';

const ModalTaskDelete = ({ task, toggleModal, closeModal }) => {
  const [openModal] = useState(true);
  const dispatch = useDispatch();

  const handleClick = async () => {
    await dispatch(deleteTaskThunk(task._id));
    dispatch(getTasksThunk());

    toggleModal();
  };

  const template = (
    <div className={css.overlay} onClick={closeModal}>
      <div className={css.modalWrapper}>
        <p className={css.title}>Do you want to delete the task?</p>

        <div className={css.btnWrapper}>
          <button className={css.btn} onClick={handleClick}>
            yes
          </button>

          <button className={css.btn} onClick={toggleModal}>
            no
          </button>
        </div>
      </div>
    </div>
  );

  return openModal
    ? createPortal(template, document.getElementById('modal'))
    : null;
};

ModalTaskDelete.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    priority: PropTypes.string.isRequired,
    date: PropTypes.shape({
      start: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired,
    }).isRequired,
    owner: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        email: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        _id: PropTypes.string.isRequired,
      }),
    ]).isRequired,
  }).isRequired,

  toggleModal: PropTypes.func.isRequired,

  closeModal: PropTypes.func.isRequired,
};

export default ModalTaskDelete;
