import React from 'react'
import MainContainer from './components/MainPage/MainContainer'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))

const App = () => {
  return (
    <Provider store={store}>
      <MainContainer />
    </Provider>
  )
}

export default App
