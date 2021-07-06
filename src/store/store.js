
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import ReduxThunk from 'redux-thunk';
// import {appReducer} from './reducers/app.reducer.js'
import { userReducer } from './reducers/user.reducer.js'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const rootReducer = combineReducers({
    userModule: userReducer
})


// export const store = createStore(rootReducer,
//     compose(applyMiddleware(ReduxThunk))) //Passing the reducer
export const store = createStore(rootReducer,
    composeEnhancers(applyMiddleware(ReduxThunk))) //Passing the reducer








// console.log('Redux STORE', store);
// store.subscribe(() => {
//     console.log('Counter state is:', store.getState())
// })

// store.dispatch({ type: 'INCREMENT' })
// store.dispatch({ type: 'INCREMENT' })
// store.dispatch({ type: 'INCREMENT' })
// store.dispatch({ type: 'INCREMENT' })
// store.dispatch({ type: 'INCREMENT' })

