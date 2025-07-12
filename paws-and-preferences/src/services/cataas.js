import axios from 'axios';

export const fetchRandomCat = async () => {
  const { data } = await axios.get('/cat', {
    params: { json: true },
    headers: { Accept: 'application/json' }
  });
  // Use the url directly (it's a full URL)
  return data.url;
};
