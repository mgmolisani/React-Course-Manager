import React from 'react';
import ReactDOM from 'react-dom';
import CourseManager from "./containers/CourseManager";
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'
import './course-manager.style.client.css'

/**
 * The main view.
 */
ReactDOM.render(
    <CourseManager/>,
    document.getElementById('root')
);