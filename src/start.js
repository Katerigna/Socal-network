import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './hello';
let elem;
if (location.pathname === '/welcome') {
    elem = <Hello />;
    // if user is on /welcome route, that means user is NOT logged in
    // and we should render the Registration component.
} else {
    elem = <p>my logooooooooooooo</p>;
    // if else runs, that means user IS logged in. For now we will just render an img
}
// elem = location.pathname === '/welcome' ? <Hello /> : <p>aksjda</p>
ReactDOM.render(
    elem,
    document.querySelector('main')
);
