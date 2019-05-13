import React from 'react';
import { Homepage, Editor } from '.';
import { Route, Switch } from 'react-router-dom';

const Main = () => {

    return (
       <Switch>
           <Route exact path="/" component={Homepage} />
           <Route path="/:hash" component={Editor} />
       </Switch>
    )
}

export default Main;
