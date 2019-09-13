import React from 'react';
import CuteAnimals from './cute-animals';

import {Route, BrowserRouter} from 'react-router-dom';

export default class App extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <h1>App</h1>
                <BrowserRouter>
                    <div>
                        <Route path='/cute-animals' component={CuteAnimals} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
