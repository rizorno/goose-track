import { createSlice } from '@reduxjs/toolkit';
import { getReviewsThunk, addReviewThunk } from './reviewsOperations';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
    isLoading: false,
    error: null,
  },
  reducers: {},

  extraReducers: builder => {
    builder
      //? get reviews

      .addCase(getReviewsThunk.pending, handlePending)
      .addCase(getReviewsThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.reviews = payload;
        state.error = null;
      })
      .addCase(getReviewsThunk.rejected, handleRejected)

      //? add review

      .addCase(addReviewThunk.pending, handlePending)
      .addCase(addReviewThunk.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.reviews = [...state.reviews, payload];
        state.error = null;
      })
      .addCase(addReviewThunk.rejected, handleRejected);
  },
});

export const reviewsReducer = reviewsSlice.reducer;
