import { createContext, useEffect, useReducer } from 'react'
import { onAuthStateChangedListener, signOutUser } from '../utils/firebase/firebase.utils'

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null
})

export const USER_ACTION_TYPES={
  SET_CURRENT_USER:'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
  console.log(`DISPATCHED............ `)
  console.log(`Action is ${action}`)

  const { type, payload } = action //created an action. payload stores the values that the reducer will use to update the state
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      }

    default:
      throw new Error(`Unknown type received ${type} in the user reducer`)
  }
}

const INITIAL_STATE={ //setting initial state
  currentUser:null
}

export const UserProvider = ({ children }) => {

  const [state,dispatch]=useReducer(userReducer,INITIAL_STATE)

  const {currentUser}=state
  console.log(`The current user is ${currentUser}`)

  const setCurrentUser=(user)=>{
    dispatch({type:USER_ACTION_TYPES.SET_CURRENT_USER,payload:user})
  }

  const value = { currentUser, setCurrentUser }
  // signOutUser()

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(user => {
      setCurrentUser(user)
      // console.log(user)
    })
    return unsubscribe
  }, [])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}