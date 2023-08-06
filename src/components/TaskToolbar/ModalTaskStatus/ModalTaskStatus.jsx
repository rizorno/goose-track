import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { changeStatus } from 'hooks/changeStatus';
import { updateTaskStatusThunk } from 'redux/tasks/tasksOperations';
import icon from 'images/tasks/icons.svg';
import css from './modalTaskStatus.module.scss';

const ModalTaskStatus = ({ task, toggleModal, closeModal }) => {
  const [openModal] = useState(true);
  const dispatch = useDispatch();

  const statusArray = ['To do', 'In progress', 'Done'];

  const currentStatus = changeStatus(task.status);

  const handleStatusChange = status => {
    const dataStatus = changeStatus(status);
    dispatch(updateTaskStatusThunk({ id: task._id, dataStatus }));
    toggleModal();
  };

  const template = (
    <div className={css.overlay} onClick={closeModal}>
      <div className={css.modalWrapper}>
      <p className={css.modalTitle}>Change the status of the task</p>

        {statusArray
          .filter(status => status !== currentStatus)
          .map(status => (
            <button
              className={css.btn}
              key={status}
              onClick={() => handleStatusChange(status)}
            >
              <p>{status}</p>

              <svg className={css.btnIcon}>
                <use href={icon + '#task-arrow'}></use>
              </svg>
            </button>
          ))}
      </div>
    </div>
  );

  return openModal
    ? createPortal(template, document.getElementById('modal'))
    : null;
};

ModalTaskStatus.propTypes = {
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

export default ModalTaskStatus;
