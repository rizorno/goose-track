import { publicAPI, privateAPI } from './http';

export const getReviewsAPI = async () => {
  const { data } = await publicAPI.get('/api/reviews');
  return data;
};

export const addReviewAPI = async dataReview => {
  const { data } = await privateAPI.post('api/reviews', dataReview);
  return data;
};
