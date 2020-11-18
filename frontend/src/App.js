import React from 'react';
import { Redirect, Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './views/Login'
import Game from './views/Game'
import Resume from './views/Resume'
import './App.css'

const App = () => (
	<div className="app-routes">
		<Router>
			<Switch>
				<Route exact path="/" component={Login} />
				<Route exact path="/game" component={Game} />
				<Route exact path="/resume" component={Resume} />
				<Redirect from='*' to='/' />
			</Switch>
		</Router>
	</div>
);

export default App;





