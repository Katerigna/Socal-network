import React from 'react';
import ReactDOM from 'react-dom';

import Hello from './hello';

var elem = <Hello greetee="Dalai Lama" color="sienna" />;

ReactDOM.render(
    elem,
    document.querySelector('main')
);
