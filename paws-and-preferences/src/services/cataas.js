import axios from 'axios';

export const fetchRandomCat = async () => {
  const { data } = await axios.get('https://cataas.com/cat', {
    params: { json: true },
    headers: { Accept: 'application/json' }
  });
  return data.url && data.url.startsWith('http')
    ? data.url
    : `https://cataas.com${data.url}`;
};
