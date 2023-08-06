import PropTypes from 'prop-types';
import TasksColumn from '../TasksColumn/TasksColumn';
import css from './tasksColumnsList.module.scss';

const TasksColumnsList = ({ tasks }) => {
  const filterTodo = tasks?.filter(task => task.status === 'toDo');
  const filterInProgress = tasks?.filter(task => task.status === 'inProgress');
  const filterDone = tasks?.filter(task => task.status === 'done');

  return (
    <div className={css.wrapper}>
      <TasksColumn title={'To do'} tasks={filterTodo} />
      <TasksColumn title={'In progress'} tasks={filterInProgress} />
      <TasksColumn title={'Done'} tasks={filterDone} />
    </div>
  );
};

TasksColumnsList.propTypes = {
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

export default TasksColumnsList;
