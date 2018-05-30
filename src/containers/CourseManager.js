import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import CourseList from "./CourseList"
import ModuleList from "./ModuleList"

export default class CourseManager
    extends Component {
    render() {
        return (
            <Router>
                <div className="container">Course Manager
                    <Route path="/courses"
                           component={CourseList}>
                    </Route>
                    <Route exact path="/"
                           component={ModuleList}>
                    </Route>
                </div>
            </Router>
        );
    }
}