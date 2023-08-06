import PropTypes from 'prop-types';
import TaskToolbar from 'components/TaskToolbar/TaskToolbar';
import css from './taskColumnCard.module.scss';

const TaskColumnCard = ({ task }) => {
  const priority = task?.priority;

  return (
    <li className={css.cardItem}>
      <h3 className={css.cardTitle}>{task?.title}</h3>

      <div className={css.btnWrapper}>
        <span
          className={
            priority === 'low'
              ? `${css.cardPriority} ${css.colorBlue}`
              : priority === 'medium'
              ? `${css.cardPriority} ${css.colorYellow}`
              : `${css.cardPriority} ${css.colorRed}`
          }
        >
          {priority}
        </span>

        <TaskToolbar task={task} />
      </div>
    </li>
  );
};

TaskColumnCard.propTypes = {
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

export default TaskColumnCard;
