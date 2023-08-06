import PropTypes from 'prop-types';
import icon from 'images/tasks/icons.svg';
import css from './addTaskBtn.module.scss';

const AddTaskBtn = ({ openModal }) => {
  return (
    <button className={css.btnWrapper} onClick={openModal}>
      <svg className={css.btnIcon} alt="plus">
        <use href={icon + '#task-plus'}></use>
      </svg>
      <span className={css.btnText}>Add task</span>
    </button>
  );
};

AddTaskBtn.propTypes = {
  openModal: PropTypes.func.isRequired,
};

export default AddTaskBtn;
