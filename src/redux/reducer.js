//Modules
import axios from 'axios';

//SET INITIAL STATE
const initialState = {
    user: {}
  , clients: []
  , users: []
  , products: []
  , tasks: []
}

//PROMISE
const FULFILLED = '_FULFILLED';

//ACTION TYPE
const GET_USER = 'GET_USER';
const GET_CLIENTS = 'GET_CLIENTS';
const GET_USERS = 'GET_USERS';
const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_TASKS = 'GET_TASKS';

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

export function getUsers(agencyId) {
  let users = axios.get(`/api/get-users?agencyId=${agencyId}`).then(res => {
    return res.data
  })
  return {
    type: GET_USERS
    , payload: users
  }
}

export function getProducts(agencyId) {
  let products = axios.get(`/api/products/?agencyId=${agencyId}`).then(res => {
    return res.data
  })
  return {
    type: GET_PRODUCTS
    , payload: products
  }
}

export function getTasks(agencyId) {
  let tasks = axios.get(`/api/tasks?agencyId=${agencyId}`).then(res => {
    return res.data
  })
  return {
    type: GET_TASKS
    , payload: tasks
  }
}

//REDUCER
export default function reducer(state = initialState, action) {
  switch(action.type) {
    case GET_USER + FULFILLED:
      return Object.assign({}, state , {user: action.payload})

    case GET_CLIENTS + FULFILLED:
      return Object.assign({}, state, {clients: action.payload})

    case GET_USERS + FULFILLED:
      return Object.assign({}, state, {users: action.payload})

    case GET_PRODUCTS + FULFILLED:
      return Object.assign({}, state, {products: action.payload})

    case GET_TASKS + FULFILLED:
      return Object.assign({}, state, {tasks: action.payload})

    default:
      return state;
   }
}