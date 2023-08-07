import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getCurrentUserThunk } from 'redux/auth/authOperations';
import { getUser } from 'redux/auth/authSelectors';
import { selectReviews } from 'redux/reviews/reviewsSelectors';
import { addReviewThunk } from 'redux/reviews/reviewsOperations';
import HoverRating from './HoverRating/HoverRating';
import icon from 'images/tasks/icons.svg';
import css from './modalReview.module.scss';

const ModalReview = ({ closeModal }) => {
  const { email, name, avatarURL } = useSelector(getUser);
  const userReview = useSelector(selectReviews);

  const [userName, setUserName] = useState(name);
  const [userText, setUserText] = useState('');
  const [userRating, setUserRating] = useState(0);

  const dispatch = useDispatch();

  const onChangeUserName = e => {
    setUserName(e.target.value);
  };

  const onChangeUserText = e => {
    setUserText(e.target.value);
  };

  const onChangeUserRating = value => {
    setUserRating(value);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const dataReview = {
      email,
      name: userName,
      avatar: avatarURL,
      rating: userRating,
      text: userText,
    };

    if (userReview) {
      Notify.failure(
        `Review is already added. You cannot add more than one review`
      );
      return;
    }

    await dispatch(addReviewThunk(dataReview)).unwrap();

    dispatch(getCurrentUserThunk());

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
        <p className={css.title}>Name</p>
        <input
          className={css.modalInput}
          name="name"
          type="text"
          placeholder="Enter you name"
          value={userName}
          maxLength="250"
          autoFocus
          onChange={onChangeUserName}
        />
      </label>

      <label className={css.titleLabel}>
        <p className={css.title}>Rating</p>

        <HoverRating userRating={onChangeUserRating} />
      </label>

      <label className={css.titleLabel}>
        <p className={css.title}>Review</p>
        <textarea
          className={css.modalTextArea}
          rows="5"
          name="text review"
          placeholder="Enter text"
          maxLength="250"
          autoComplete="off"
          onChange={onChangeUserText}
        ></textarea>
      </label>

      <div className={css.btnWrapper}>
        <button
          className={css.btnAdd}
          type="submit"
          onClick={handleSubmit}
          disabled={userText.trim() === ''}
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
    </form>
  );
};

ModalReview.propTypes = {
  closeModal: PropTypes.func,
};

export default ModalReview;
