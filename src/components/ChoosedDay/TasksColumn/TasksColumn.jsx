import { useState } from 'react';
import PropTypes from 'prop-types';
import ColumnHeadBar from '../ColumnHeadBar/ColumnHeadBar';
import ColumnsTasksList from '../ColumnsTasksList/ColumnsTasksList';
import AddTaskBtn from '../AddTaskBtn/AddTaskBtn';
import TaskModal from 'components/TaskModal/TaskModal';
import css from './tasksColumn.module.scss';

const TasksColumn = ({ title, tasks }) => {
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const overlayClose = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      setOpenModal(!openModal);
    }
  };

  return (
    <li className={css.wrapper}>
      <ColumnHeadBar title={title} openModal={toggleModal} />

      {tasks?.length !== 0 && (
        <ColumnsTasksList progressType={title} tasks={tasks} />
      )}

      <AddTaskBtn openModal={toggleModal} />

      {openModal && (
        <TaskModal
          type={title}
          closeModal={toggleModal}
          overlayClose={overlayClose}
        />
      )}
    </li>
  );
};

TasksColumn.propTypes = {
  title: PropTypes.oneOf(['To do', 'In progress', 'Done']).isRequired,

  tasks: PropTypes.arrayOf(
    PropTypes.shape({
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
    }).isRequired
  ),
};

export default TasksColumn;
