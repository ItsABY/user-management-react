import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Pages
import UsersList from './Pages/UsersList';
import UserDetails from './Pages/UserDetails';
import GroupsList from './Pages/GroupsList';
import GroupDetails from './Pages/GroupDetails';
import NotFound from './Pages/NotFound';

class App extends Component {
  render() {
    return (
      <Router>
            <div>
                <Switch>
                    <Route exact path="/" component={UsersList} />
                    <Route exact path="/users" component={UsersList} />
                    <Route exact path="/user/:userid" component={UserDetails} />
                    <Route exact path="/groups" component={GroupsList} />
                    <Route exact path="/group/:groupid" component={GroupDetails} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </Router>
    );
  }
}

export default App;
