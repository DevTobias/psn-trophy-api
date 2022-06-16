import fetch from 'cross-fetch';

export const get = async (url: string, access_token: string) => {
  const res = await fetch(url, {
    headers: {
      authorization: `Bearer ${access_token}`,
    },
  });

  return await res.json();
};
