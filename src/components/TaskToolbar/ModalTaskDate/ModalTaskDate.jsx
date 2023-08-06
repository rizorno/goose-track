import { useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import CalendarDatePicker from 'components/CalendarToolbar/PeriodPaginator/CalendarDatePicker/CalendarDatePicker';
import css from './modalTaskDate.module.scss';

const ModalTaskDate = ({ task, closeModal }) => {
  const [openModal] = useState(true);

  const template = (
    <div className={css.overlay} onClick={closeModal}>
      <div className={css.modalWrapper}>
         <p className={css.modalTitle}>Change the date of the task</p>
         
        <CalendarDatePicker task={task} />
      </div>
    </div>
  );

  return openModal
    ? createPortal(template, document.getElementById('modal'))
    : null;
};

ModalTaskDate.propTypes = {
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

  closeModal: PropTypes.func.isRequired,
};

export default ModalTaskDate;
