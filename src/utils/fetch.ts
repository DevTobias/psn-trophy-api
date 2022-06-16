import fetch from 'cross-fetch';

export const get = async (url: string, access_token: string) => {
  const res = await fetch(url, {
    headers: {
      authorization: `Bearer ${access_token}`,
    },
  });

  return await res.json();
};

export const post = async (
  url: string,
  access_token: string,
  body: unknown,
) => {
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
  });

  return await res.json();
};
