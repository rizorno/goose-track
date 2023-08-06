import PropTypes from 'prop-types';
import icon from 'images/tasks/icons.svg';
import css from './columnHeadBar.module.scss';

const ColumnHeadBar = ({ title, openModal }) => {
  return (
    <div className={css.columnWrapper}>
      <div className={css.columnTitleBox}>
        {title === 'To do' ? (
          <svg className={css.btnIconTitle} alt="do">
            <use href={icon + '#task-todo'}></use>
          </svg>
        ) : title === 'In progress' ? (
          <svg className={css.btnIconTitle} alt="progress">
            <use href={icon + '#task-inprogress'}></use>
          </svg>
        ) : (
          <svg className={css.btnIconTitle} alt="done">
            <use href={icon + '#task-done'}></use>
          </svg>
        )}

        <h2 className={css.columnTitle}>{title}</h2>
      </div>

      <button className={css.btnAdd} onClick={openModal}>
        <svg className={css.btnIcon} alt="plus">
          <use href={icon + '#task-plus'}></use>
        </svg>
      </button>
    </div>
  );
};

ColumnHeadBar.propTypes = {
  title: PropTypes.oneOf(['To do', 'In progress', 'Done']).isRequired,

  openModal: PropTypes.func.isRequired,
};

export default ColumnHeadBar;
