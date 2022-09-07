import axios from 'axios';

export function* getATodoApi(id){
  return yield axios.get('/getATodo/'+id);
};