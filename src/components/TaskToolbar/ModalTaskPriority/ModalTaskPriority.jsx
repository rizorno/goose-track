import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { changeStatus } from 'hooks/changeStatus';
import { updateTaskPriorityThunk } from 'redux/tasks/tasksOperations';
import icon from 'images/tasks/icons.svg';
import css from './modalTaskPriority.module.scss';

const ModalTaskPriority = ({ task, toggleModal, closeModal }) => {
  const [openModal] = useState(true);
  const dispatch = useDispatch();

  const statusArray = ['low', 'medium', 'high'];

  const currentStatus = changeStatus(task.priority);

  const handleStatusChange = status => {
    const dataPriority = status;
    dispatch(updateTaskPriorityThunk({ id: task._id, dataPriority }));
    toggleModal();
  };

  const template = (
    <div className={css.overlay} onClick={closeModal}>
      <div className={css.modalWrapper}>
        <p className={css.modalTitle}>Change the priority of the task</p>
        {statusArray
          .filter(status => status !== currentStatus)
          .map(status => (
            <button
              className={css.btn}
              key={status}
              onClick={() => handleStatusChange(status)}
            >
              <p
                className={
                  status === 'low'
                    ? css.colorBlue
                    : status === 'medium'
                    ? css.colorYellow
                    : css.colorRed
                }
              >
                {status}
              </p>

              <svg
                className={
                  status === 'low'
                    ? `${css.btnIcon} ${css.colorBlue}`
                    : status === 'medium'
                    ? `${css.btnIcon} ${css.colorYellow}`
                    : `${css.btnIcon} ${css.colorRed}`
                }
              >
                <use href={icon + '#task-alarm'}></use>
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

ModalTaskPriority.propTypes = {
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

export default ModalTaskPriority;
