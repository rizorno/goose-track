import { useState } from 'react';
import PropTypes from 'prop-types';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels = {
  1: 'Useless',
  2: 'Poor',
  3: 'Ok',
  4: 'Good',
  5: 'Excellent',
};

const getLabelText = value => {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
};

const HoverRating = ({ userRating }) => {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);

  return (
    <Box
      sx={{
        width: 200,
        height: 25,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={1}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
          userRating(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={
          <StarIcon
            style={{ opacity: 1, color: 'var(--ld-616161-ffffff)' }}
            fontSize="inherit"
          />
        }
      />
      {value !== null && (
        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </Box>
  );
};

HoverRating.propTypes = {
  userRating: PropTypes.func,
};

export default HoverRating;
