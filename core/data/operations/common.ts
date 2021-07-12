export const delay = (time = 2000) => new Promise(res => setTimeout(res, time));

export const myDBQuery = async <T>(data: T) => {
  await delay();
  return {
    friendList: [
      {
        id: 1,
        name: 'kekw',
      },
    ],
  };
};
