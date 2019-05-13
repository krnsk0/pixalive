import ReactDOM from 'react-dom';
import React from 'react';
import { Main } from './components';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
    <Router>
        <Main />
    </Router>,
    document.getElementById('app')
);
