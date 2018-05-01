import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

// Components
import Header from './Components/Header';
import Left from './Components/Left';

// Pages
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
                <Header />
                <div className="app-body">
                    <Left />
                    <div className={this.props.leftbar ? 'main' : 'main left-closed'}>
                    <Switch>
                        <Route exact path="/" component={UsersList} />
                        <Route exact path="/users" component={UsersList} />
                        <Route exact path="/user/:userid" component={UserDetails} />
                        <Route exact path="/groups" component={GroupsList} />
                        <Route exact path="/group/:groupid" component={GroupDetails} />
                        <Route component={NotFound} />
                    </Switch>
                    </div>
                </div>
            </div>
        </Router>
    );
  }
}


function mapStateToProps(globalState) {
    return {
        leftbar: globalState.leftbar
    };
}
export default connect(mapStateToProps)(App);
