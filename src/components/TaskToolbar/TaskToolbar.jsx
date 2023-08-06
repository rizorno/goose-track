import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
import ModalTaskDate from './ModalTaskDate/ModalTaskDate';
import ModalTaskPriority from './ModalTaskPriority/ModalTaskPriority';
import ModalTaskStatus from './ModalTaskStatus/ModalTaskStatus';
import TaskModal from 'components/TaskModal/TaskModal';
import ModalTaskDelete from './ModalTaskDelete/ModalTaskDelete';
import icon from 'images/tasks/icons.svg';
import css from './taskToolbar.module.scss';

const TaskToolbar = ({ task }) => {
  const [modalDate, setModalDate] = useState(false);
  const [modalPriority, setModalPriority] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);

  useEffect(() => {
    const closeModal = ({ code }) => {
      if (code === 'Escape' && modalDate) {
        setModalDate(!modalDate);
      }

      if (code === 'Escape' && modalPriority) {
        setModalPriority(!modalPriority);
      }

      if (code === 'Escape' && modalStatus) {
        setModalStatus(!modalStatus);
      }

      if (code === 'Escape' && modalDelete) {
        setModalDelete(!modalDelete);
      }
    };

    window.addEventListener('keydown', closeModal);

    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  }, [modalDate, modalPriority, modalStatus, modalEdit, modalDelete]);

  const toggleModalDate = () => {
    setModalDate(!modalDate);
  };

  const toggleModalPriority = () => {
    setModalPriority(!modalPriority);
  };

  const toggleModalStatus = () => {
    setModalStatus(!modalStatus);
  };

  const toggleModalEdit = () => {
    setModalEdit(!modalEdit);
  };

  const toggleModalDelete = () => {
    setModalDelete(!modalDelete);
  };

  const closeModal = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      setModalDate(false);
      setModalPriority(false);
      setModalStatus(false);
      setModalEdit(false);
      setModalDelete(false);
    }
  };

  return (
    <div className={css.btnWrapper}>
      <Tooltip title="Date" placement="top" arrow>
        <button className={css.btn} onClick={toggleModalDate}>
          <svg className={css.btnIconDate}>
            <use href={icon + '#task-calendar'}></use>
          </svg>
        </button>
      </Tooltip>

      <Tooltip title="Priority" placement="top" arrow>
        <button className={css.btn} onClick={toggleModalPriority}>
          <svg className={css.btnIconAlarm}>
            <use href={icon + '#task-alarm'}></use>
          </svg>
        </button>
      </Tooltip>

      <Tooltip title="Status" placement="top" arrow>
        <button className={css.btn} onClick={toggleModalStatus}>
          <svg className={css.btnIcon}>
            <use href={icon + '#task-arrow'}></use>
          </svg>
        </button>
      </Tooltip>

      <Tooltip title="Edit" placement="top" arrow>
        <button className={css.btn} onClick={() => toggleModalEdit(task._id)}>
          <svg className={css.btnIcon}>
            <use href={icon + '#task-pencil'}></use>
          </svg>
        </button>
      </Tooltip>

      <Tooltip title="Delete" placement="top" arrow>
        <button className={css.btn} onClick={toggleModalDelete}>
          <svg className={css.btnIcon}>
            <use href={icon + '#task-trash'}></use>
          </svg>
        </button>
      </Tooltip>

      {modalDate && <ModalTaskDate closeModal={closeModal} task={task} />}

      {modalPriority && (
        <ModalTaskPriority
          closeModal={closeModal}
          toggleModal={toggleModalPriority}
          task={task}
        />
      )}

      {modalStatus && (
        <ModalTaskStatus
          closeModal={closeModal}
          toggleModal={toggleModalStatus}
          task={task}
        />
      )}

      {modalEdit && (
        <TaskModal
          task={task}
          closeModal={toggleModalEdit}
          overlayClose={closeModal}
        />
      )}

      {modalDelete && (
        <ModalTaskDelete
          closeModal={closeModal}
          toggleModal={toggleModalDelete}
          task={task}
        />
      )}
    </div>
  );
};

TaskToolbar.propTypes = {
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
};

export default TaskToolbar;
