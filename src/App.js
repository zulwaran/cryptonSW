import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import MainContainer from './components/MainPage/MainContainer'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import FavoriteContainer from './components/FavoritePage/FavoriteContainer';
import styles from './App.css'
const store = createStore(rootReducer, applyMiddleware(thunk))

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <nav className='navigation'>
            <ul>
              <li>
                <Link to="/">Главная страница</Link>
              </li>
              <li>
                <Link to="/favorite">Любимые герои</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path="/favorite">
              <FavoriteContainer />
            </Route>
            <Route path="/">
              <MainContainer />
            </Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  )
}

export default App
