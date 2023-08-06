import { createAsyncThunk } from '@reduxjs/toolkit';
import { getReviewsAPI, addReviewAPI } from 'services/reviewsService';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const getReviewsThunk = createAsyncThunk(
  'reviews/getReviews',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getReviewsAPI();
      return data;
    } catch (error) {
      return rejectWithValue(
        `${error.response.data.message}. Status code ${error.response.status}`
      );
    }
  }
);

export const addReviewThunk = createAsyncThunk(
  'reviews/addReview',
  async (dataReview, { rejectWithValue }) => {
    try {
      const data = await addReviewAPI(dataReview);
      Notify.success('The review has been successfully added.');
      return data;
    } catch (error) {
      Notify.failure(`${error.response.data.message}. Status code ${error.response.status}`);
      return rejectWithValue(
        `${error.response.data.message}. Status code ${error.response.status}`
      );
    }
  }
);
