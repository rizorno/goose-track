import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import arrowLeft from 'images/reviews/arrow-left.svg';
import css from './carousel.module.scss';

export const Carousel = props => {
  const { children, show, infiniteLoop, autoPlay, interval } = props;

  const [auto, setAuto] = useState(
    autoPlay === true || autoPlay === false ? autoPlay : false
  );

  const [currentIndex, setCurrentIndex] = useState(infiniteLoop ? show : 0);
  const [length, setLength] = useState(children.length);

  const [isRepeating, setIsRepeating] = useState(
    infiniteLoop && children.length > show
  );
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const [touchPosition, setTouchPosition] = useState(null);

  useEffect(() => {
    setLength(children.length);
    setIsRepeating(infiniteLoop && children.length > show);
  }, [children, infiniteLoop, show]);

  useEffect(() => {
    if (isRepeating) {
      if (currentIndex === show || currentIndex === length) {
        setTransitionEnabled(true);
      }
    }
  }, [currentIndex, isRepeating, show, length]);

  useEffect(() => {
    const loop = setInterval(() => {
      if (autoPlay === true && auto === true) {
        next();
      } else if (autoPlay === true && auto === false) {
        setTimeout(() => {
          setAuto(true);
        }, 500);
      } else if (autoPlay === false && auto === false) {
        return;
      }
    }, interval || 3000);

    return () => clearInterval(loop);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, auto, currentIndex]);

  const next = () => {
    if (isRepeating || currentIndex < length - show) {
      setCurrentIndex(prevState => prevState + 1);
    }
    setAuto(false);
  };

  const prev = () => {
    if (isRepeating || currentIndex > 0) {
      setCurrentIndex(prevState => prevState - 1);
    }
    setAuto(false);
  };

  const handleTouchStart = e => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
    setAuto(false);
  };

  const handleTouchMove = e => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      next();
    }

    if (diff < -5) {
      prev();
    }

    setTouchPosition(null);
    setAuto(false);
  };

  const handleTransitionEnd = () => {
    if (isRepeating) {
      if (currentIndex === 0) {
        setTransitionEnabled(false);
        setCurrentIndex(length);
      } else if (currentIndex === length + show) {
        setTransitionEnabled(false);
        setCurrentIndex(show);
      }
    }
    setAuto(false);
  };

  const renderExtraPrev = () => {
    let output = [];
    for (let index = 0; index < show; index++) {
      output.push(children[length - 1 - index]);
    }
    output.reverse();
    return output;
  };

  const renderExtraNext = () => {
    let output = [];
    for (let index = 0; index < show; index++) {
      output.push(children[index]);
    }
    return output;
  };

  return (
    <div className={css.carouselContainer}>
      <div className={css.carouselWrapper}>
        {(isRepeating || currentIndex > 0) && (
          <button onClick={prev} className={css.leftArrow}>
            <img src={arrowLeft} alt="arrow left" />
          </button>
        )}
        <div
          className={css.carouselContentWrapper}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div
            className={
              show === 2
                ? `${css.carouselContent} ${css.show2}`
                : `${css.carouselContent} ${css.show1}`
            }
            style={{
              transform: `translateX(-${currentIndex * (100 / show)}%)`,
              transition: !transitionEnabled ? 'none' : undefined,
            }}
            onTransitionEnd={() => handleTransitionEnd()}
          >
            {length > show && isRepeating && renderExtraPrev()}

            {children}

            {length > show && isRepeating && renderExtraNext()}
          </div>
        </div>

        {(isRepeating || currentIndex < length - show) && (
          <button onClick={next} className={css.rightArrow}>
            <img src={arrowLeft} alt="arrow right" className={css.iconRight} />
          </button>
        )}
      </div>
    </div>
  );
};

Carousel.propTypes = {
  show: PropTypes.number,
  infiniteLoop: PropTypes.bool,
  autoPlay: PropTypes.bool,
  interval: PropTypes.number,
};
