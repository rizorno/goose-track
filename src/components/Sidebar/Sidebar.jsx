import { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectReviews } from 'redux/reviews/reviewsSelectors';
import Logo from 'components/Logo/Logo';
import TaskModal from 'components/TaskModal/TaskModal';
import LogoutBtn from 'components/LogoutBtn/LogoutBtn';
import UserNav from 'components/UserNav/UserNav';
import icon from 'images/sidebar/icons.svg';
import css from './sidebar.module.scss';

const Sidebar = ({ openSidebar }) => {
  const [modalDelete, setModalDelete] = useState(false);
  const [modalReview, setModalReview] = useState(false);
  const myReview = useSelector(selectReviews);

  const toggleModalDelete = () => {
    setModalDelete(!modalDelete);
  };

  const toggleModalReview = () => {
    setModalReview(!modalReview);
  };

  const closeModal = ({ target, currentTarget }) => {
    if (target === currentTarget) {
      setModalDelete(false);
      setModalReview(false);
    }
  };

  return (
    <aside className={css.section}>
      <div className={css.blur} onClick={() => openSidebar()} />
      <div className={css.container}>
        <div>
          <div className={css.logoBox}>
            <Logo />

            <button className={css.closeBtn} onClick={() => openSidebar()}>
              <svg className={css.closeIcon}>
                <use href={icon + '#icon-close'}></use>
              </svg>
            </button>
          </div>

          <h2 className={css.title}>User Panel</h2>

          <UserNav openSidebar={openSidebar} />
        </div>

        <div className={css.btnBox}>
          <button className={css.btnDelete} onClick={toggleModalDelete}>
            Delete account
          </button>

          {!myReview && (
            <button className={css.btnReview} onClick={toggleModalReview}>
              Add review
            </button>
          )}
        </div>

        <LogoutBtn />

        {modalDelete && (
          <TaskModal
            review={'delete'}
            closeModal={toggleModalDelete}
            overlayClose={closeModal}
          />
        )}

        {modalReview && (
          <TaskModal
            review={'review'}
            closeModal={toggleModalReview}
            overlayClose={closeModal}
          />
        )}
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  openSidebar: PropTypes.func,
};

export default Sidebar;
