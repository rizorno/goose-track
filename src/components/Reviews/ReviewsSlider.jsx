import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsFillStarFill } from 'react-icons/bs';
import { useMediaQuery } from '@mui/material';
import { getReviewsThunk } from 'redux/reviews/reviewsOperations';
import { selectArrReviews } from 'redux/reviews/reviewsSelectors';
import { Carousel } from './Carousel/Carousel';
import css from './reviewsSlider.module.scss';

const ReviewsSlider = () => {
  const screenDesktop = useMediaQuery('(min-width: 1440px)');

  const [auto, setAuto] = useState(true);

  const data = useSelector(selectArrReviews);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReviewsThunk());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const autoOn = () => {
    setAuto(true);
  };

  const autoOff = () => {
    setAuto(false);
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>Reviews</h2>

      <ul className={css.list}>
        <Carousel
          show={screenDesktop ? 2 : 1}
          infiniteLoop={true}
          autoPlay={auto === true ? true : false}
          interval={screenDesktop ? 2000 : 3000}
        >
          {data.map(review => (
            <li
              className={css.item}
              key={review._id}
              onMouseEnter={autoOff}
              onMouseLeave={autoOn}
            >
              <div className={css.boxLeft}></div>
              <div className={css.mainBox}>
                <div className={css.box}>
                  <div className={css.imgBox}>
                    <img
                      src={review.avatar}
                      alt={review.name}
                      className={css.photo}
                    />
                  </div>

                  <div className={css.wrapper}>
                    <h2 className={css.name}>{review.name}</h2>
                    <div className={css.starBox}>
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < review.rating
                              ? `${css.starActive}`
                              : `${css.star}`
                          }
                        >
                          <BsFillStarFill />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <p className={css.text}>{review.text}</p>
              </div>

              <div className={css.boxRight}></div>
            </li>
          ))}
        </Carousel>
      </ul>
    </div>
  );
};

export default ReviewsSlider;
