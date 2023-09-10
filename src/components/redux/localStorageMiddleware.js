// localStorageMiddleware.js
const localStorageMiddleware = (store) => (next) => (action) => {
  next(action);
  const stateToPersist = store.getState();
  localStorage.setItem('reduxState', JSON.stringify(stateToPersist));
};

export default localStorageMiddleware;
