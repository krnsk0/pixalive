import React from 'react';
import { Homepage, Editor } from '.';
import { Route, Switch } from 'react-router-dom';

const Main = () => {
  return (
    <Switch>
      <Route path="/:hash" render={(props) => <Editor {...props} key={props.match.params.hash} /> } />
      <Route exact path="/" component={Homepage} />
    </Switch>
  );
};

export default Main;
