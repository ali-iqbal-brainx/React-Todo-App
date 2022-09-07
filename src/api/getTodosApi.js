import axios from 'axios';

export function* getTodosApi(userId) {
  console.log("In get Todos Api ", userId)
  return yield axios.get('/getTodos/'+userId);
};