import { useState } from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import TaskModal from 'components/TaskModal/TaskModal';
import icon from 'images/tasks/icons.svg';
import css from './tasksList.module.scss';

const TasksList = ({ task }) => {
  const screenMobile = useMediaQuery('(max-width: 767.9px)');
  const screenTablet = useMediaQuery('(max-width: 1439.9px)');
  const screenDescktop = useMediaQuery('(min-width: 1440px)');

  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const overlayClose = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      setOpenModal(!openModal);
    }
  };

  const truncateString = str => {
    if (screenMobile && str.length > 3) {
      return str.substring(0, 3) + '...';
    }
    if (screenTablet && str.length > 8) {
      return str.substring(0, 8) + '...';
    }
    if (screenDescktop && str.length > 16) {
      return str.substring(0, 16) + '...';
    }
    return str;
  };

  return (
    <div className={css.tasksListStyle}>
      <div key={task._id} className={css.tasksListItem} onClick={toggleModal}>
        <p
          className={
            (task.priority === 'low' && css.lowColor) ||
            (task.priority === 'medium' && css.mediumColor) ||
            (task.priority === 'high' && css.highColor)
          }
        >
          {truncateString(task.title)}

          {screenMobile
            ? null
            : (task.status === 'toDo' && (
                <Tooltip title="To Do" placement="top" arrow>
                  <svg className={css.iconCheck}>
                    <use href={icon + '#task-todo'}></use>
                  </svg>
                </Tooltip>
              )) ||
              (task.status === 'inProgress' && (
                <Tooltip title="In progress" placement="top" arrow>
                  <svg className={css.iconCheck}>
                    <use href={icon + '#task-inprogress'}></use>
                  </svg>
                </Tooltip>
              )) ||
              (task.status === 'done' && (
                <Tooltip title="Done" placement="top" arrow>
                  <svg className={css.iconCheck}>
                    <use href={icon + '#task-done'}></use>
                  </svg>
                </Tooltip>
              ))}
        </p>
      </div>

      {openModal && (
        <TaskModal
          task={task}
          closeModal={toggleModal}
          overlayClose={overlayClose}
        />
      )}
    </div>
  );
};

TasksList.propTypes = {
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

export default TasksList;
