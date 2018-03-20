import axios from 'axios';

//SET INITIAL STATE
const initialState = {
	user: {}
	, headerVisibility: ''
}


//PROMISE
const FULFILLED = '_FULFILLED';


//ACTION TYPE
const GET_USER = 'GET_USER';
const HIDE_HEADER = 'HIDE_HEADER';
const SHOW_HEADER = 'SHOW_HEADER';


//ACTION CREATOR
export function getUser() {
   let userData = axios.get('/auth/me').then(res => {
		return res.data;
   })
   return {
      type: GET_USER
      , payload: userData
   }
}

export function hideHeader() {
	return {
		type: HIDE_HEADER
		, payload: false
	}
}

export function showHeader() {
	return {
		type: SHOW_HEADER
		, payload: true
	}
}


//REDUCER
export default function reducer(state = initialState, action) {
   switch(action.type) {
      case GET_USER + FULFILLED:
			return Object.assign({}, state , {user: action.payload})
			
		case HIDE_HEADER:
			return Object.assign({}, state, {headerVisibility: action.payload})

		case SHOW_HEADER:
			return Object.assign({}, state, {headerVisibility: action.payload})

      default:
         return state;
   }
}