import React from 'react';
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import './App.scss';
import ViewPage from './route/ViewPage';
import Header from './components/Header';
import { ModeContext, Modes } from './context/mode';

function App() {
  const [mode, setMode] = React.useState(Modes.TABLE);
  return (
    <div className="app">
      <ModeContext.Provider value={{mode, setMode}}>
        <Header />
        <main>
          <Router>
            <Switch>
              <Route exact path="/"render={({ match }) => (<ViewPage id={match.params.id} />)} />
            </Switch>
          </Router>
        </main>
      </ModeContext.Provider>
    </div>
  );
}

export default App;
