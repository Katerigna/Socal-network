import React from 'react';
import axios from 'axios';

export default class Hello extends React.Component {
    constructor(props) {
        super(props);
        // solution to error "cannot read property setState of undefined" is the below code:
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        // we use this.setState to PUT information in state!
        this.setState({
            [e.target.name]: e.target.value,
            dog: true
        }, () => console.log('this.state: ', this.state));

    }
    render() {
        return (
            <div>
                <h1>Hello!!!!!!!!!!!!</h1>
                <form>
                    <input name="first" placeholder="first" onChange={ this.handleChange }/>
                    <input name="last" placeholder="last" onChange={ this.handleChange }/>
                    <button>submit</button>
                </form>
            </div>
        );
    }
}
// onChange = { e => this.handleChange(e) }


// class Welcome extends React.Component {
//     constructor() {
//         super()
//     }
//
//     render() {
//         return (
//             <div>
//                 <Registration />
//             </div>
//         )
//     }
// }










// export default function Hello() {
//     return (
//         <div>Hello, World!</div>
//     );
// }
