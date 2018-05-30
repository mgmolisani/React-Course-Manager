import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class ModuleList
    extends Component {

    render() {
        return (
            <div>
                <Link to="/courses">
                    <h2>Module List</h2>
                </Link>
            </div>
        )
    }
}