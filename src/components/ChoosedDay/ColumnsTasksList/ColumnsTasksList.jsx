import PropTypes from 'prop-types';
import TaskColumnCard from '../TaskColumnCard/TaskColumnCard';
import css from './columnsTasksList.module.scss';

const ColumnsTasksList = ({ tasks }) => {
  return (
    <ul className={css.wrapper}>
      {tasks &&
        tasks?.map(task => <TaskColumnCard key={task?._id} task={task} />)}
    </ul>
  );
};

ColumnsTasksList.propTypes = {
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

export default ColumnsTasksList;
