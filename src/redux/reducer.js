//Modules
import axios from 'axios';

//SET INITIAL STATE
const initialState = {
    user: {}
  , clients: []
}


//PROMISE
const FULFILLED = '_FULFILLED';

//ACTION TYPE
const GET_USER = 'GET_USER';
const GET_CLIENTS = 'GET_CLIENTS';

//ACTION CREATORS
export function getUser() {
   let userData = axios.get('/auth/me').then(res => {
		return res.data;
   })
   return {
      type: GET_USER
      , payload: userData
   }
}

export function getClients(agencyId) {
  let clients = axios.get(`/api/clients/?agencyId=${agencyId}`).then(res => {
    return res.data
  })
  return {
      type: GET_CLIENTS
    , payload: clients
  }
}


//REDUCER
export default function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_USER + FULFILLED:
      return Object.assign({}, state , {user: action.payload})

    case GET_CLIENTS + FULFILLED:
      return Object.assign({}, state, {clients: action.payload})

    default:
      return state;
   }
}