import React, {Component} from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import CourseList from "./CourseList"
import CourseEditor from "./CourseEditor";

/**
 * Sets up the course manager interface.
 */
export default class CourseManager
    extends Component {
    render() {
        return (
            <Router>
                <div>
                    <div className="page-header bg-purple">
                        <div className="container py-2 mb-2">
                            <h1>
                                <span className="float-left pr-3">
                                    <i className="fa fa-bars logo-font"/>
                                </span>
                                <Link to="/" className="logo-font">
                                    Course Manager
                                </Link>
                            </h1>
                        </div>
                    </div>
                    <div className="container">
                        <Route exact path="/"
                               component={CourseList}/>
                        <Route path="/courses"
                               component={CourseList}/>
                        <Route path="/course/:courseId"
                               component={CourseEditor}/>
                    </div>
                </div>
            </Router>
        );
    }
}