import PropTypes from 'prop-types';
import Modal from './Modal/Modal';
import TaskForm from './TaskForm/TaskForm';
import ModalReview from 'components/Sidebar/ModalReview/ModalReview';
import ModalDeleteUser from 'components/Sidebar/ModalDeleteUser/ModalDeleteUser';

const TaskModal = ({ review, type, task, closeModal, overlayClose }) => {
  return (
    <Modal review={review} closeModal={closeModal} overlayClose={overlayClose}>
      {review === 'review' ? (
        <ModalReview closeModal={closeModal} />
      ) : (
        (review === 'delete' && (
          <ModalDeleteUser closeModal={closeModal} />
        )) || <TaskForm type={type} task={task} closeModal={closeModal} />
      )}
    </Modal>
  );
};

TaskModal.propTypes = {
  review: PropTypes.string,

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

  overlayClose: PropTypes.func.isRequired,
};

export default TaskModal;
