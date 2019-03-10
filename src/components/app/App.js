import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import {routers} from '../../router';
import TabBar from '../tabbar/tabbar';

function RenderRouters() {
  return routers.map(route => {
    return (<Route exact={route.exact} key={route.name} path={route.path} component={route.component}/>);
  });
}

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <TabBar/>
          <RenderRouters/>
        </Fragment>
      </Router>
    );
  }
}

export default App;
