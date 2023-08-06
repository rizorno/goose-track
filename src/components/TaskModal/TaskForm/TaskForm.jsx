import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { changeStatus } from 'hooks/changeStatus';
import {
  getTasksThunk,
  addTaskThunk,
  updateTaskThunk,
} from 'redux/tasks/tasksOperations';
import { selectArrTasks } from 'redux/tasks/tasksSelectors';
import { selectDate } from 'redux/date/dateSelectors';
import icon from 'images/tasks/icons.svg';
import css from './taskForm.module.scss';

const TaskForm = ({ type, task, closeModal }) => {
  const currentDay = useSelector(selectDate);
  const tasksArr = useSelector(selectArrTasks);
  const dispatch = useDispatch();

  const [title, setTitle] = useState(task ? task.title : '');
  const [startDate, setStartDate] = useState(
    task ? dayjs(task.date.start) : dayjs(`${currentDay} 09:00`)
  );
  const [endDate, setEndDate] = useState(
    task ? dayjs(task.date.end) : dayjs(`${currentDay} 12:00`)
  );
  const [priority, setPriority] = useState(task ? task.priority : 'low');

  const onChangeTitle = e => {
    setTitle(e.target.value);
  };

  const onChangeStart = time => {
    setStartDate(dayjs(time, 'H:mm'));
  };

  const onChangeEnd = time => {
    setEndDate(dayjs(time, 'H:mm'));
  };

  const onChangePriority = e => {
    setPriority(e.target.id);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const id = task?._id;
    const status = changeStatus(type ? type : task.status);
    const start = startDate['$d'].toISOString();
    const end = endDate['$d'].toISOString();

    const dataTask = {
      title,
      status: task ? task.status : status,
      priority,
      date: { start, end },
    };

    if (start >= end) {
      Notify.warning('Incorrect time of the event');
      return;
    }

    if (
      !task &&
      tasksArr.find(
        task =>
          task.title.toLowerCase() === title.toLowerCase() &&
          task.date.start.slice(0, 10) === currentDay
      )
    ) {
      Notify.failure(`${title} is already added.`);
      return;
    }

    if (task) {
      dispatch(updateTaskThunk({ id, dataTask }))
        .unwrap()
        .then(() => {
          dispatch(getTasksThunk());
        });
    } else {
      dispatch(addTaskThunk(dataTask)).unwrap();
    }

    closeModal(false);
  };

  return (
    <form action="" className={css.popupForm}>
      <button type="button" onClick={closeModal} className={css.closeBtn}>
        <svg className={css.btnCloseIcon}>
          <use href={icon + '#task-close'}></use>
        </svg>
      </button>

      <label className={css.titleLabel}>
        <p className={css.title}>Title</p>
        <input
          name="title"
          type="text"
          placeholder="Enter text"
          value={title}
          maxLength="250"
          autoFocus
          onChange={onChangeTitle}
        />
      </label>

      <div className={css.timePickersWrapper}>
        <label className={css.timePickerLabel}>
          <p className={css.start}>Start</p>
          <TimePicker
            className={css.timePicker}
            name="start"
            onChange={onChangeStart}
            value={startDate}
            format={'H:mm'}
            minuteStep={5}
            suffixIcon={false}
            clearIcon={false}
            placement="bottomLeft"
          />
        </label>

        <label className={css.timePickerLabel}>
          <p className={css.end}>End</p>
          <TimePicker
            className={css.timePicker}
            name="end"
            onChange={onChangeEnd}
            value={endDate}
            format={'H:mm'}
            minuteStep={5}
            suffixIcon={false}
            clearIcon={false}
          />
        </label>
      </div>

      <div className={css.radioGroup}>
        <div className={css.radioButton}>
          <input
            className={css.radioInput}
            type="radio"
            id="low"
            name="priority"
            value={priority}
            onChange={onChangePriority}
            checked={priority === 'low' ? 'checked' : ''}
          />
          <label htmlFor="low" id="low">
            Low
          </label>
        </div>

        <div className={css.radioButton}>
          <input
            type="radio"
            id="medium"
            name="priority"
            className={css.radioInput}
            value={priority}
            onChange={onChangePriority}
            checked={priority === 'medium' ? 'checked' : ''}
          />
          <label htmlFor="medium" id="medium">
            Medium
          </label>
        </div>

        <div className={css.radioButton}>
          <input
            type="radio"
            id="high"
            name="priority"
            className={css.radioInput}
            value={priority}
            onChange={onChangePriority}
            checked={priority === 'high' ? 'checked' : ''}
          />
          <label htmlFor="high" id="high">
            High
          </label>
        </div>
      </div>

      {task ? (
        <button
          className={css.btnEdit}
          type="submit"
          onClick={handleSubmit}
          disabled={
            title.trim() === task.title &&
            startDate['$d'].toISOString() ===
              dayjs(task.date.start)['$d'].toISOString() &&
            endDate['$d'].toISOString() ===
              dayjs(task.date.end)['$d'].toISOString() &&
            priority === task.priority
          }
        >
          <svg className={css.btnEditIcon} alt="edit">
            <use href={icon + '#task-edit'}></use>
          </svg>
          Edit
        </button>
      ) : (
        <div className={css.btnWrapper}>
          <button
            className={css.btnAdd}
            type="submit"
            onClick={handleSubmit}
            disabled={title.trim() === ''}
          >
            <svg className={css.btnAddIcon} alt="plus">
              <use href={icon + '#task-plus'}></use>
            </svg>
            Add
          </button>

          <button className={css.btnCancel} type="button" onClick={closeModal}>
            Cancel
          </button>
        </div>
      )}
    </form>
  );
};

TaskForm.propTypes = {
  type: PropTypes.oneOf(['To do', 'In progress', 'Done']),

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
  }),

  closeModal: PropTypes.func.isRequired,
};

export default TaskForm;
