import React, {Component} from 'react'
import ModuleList from './ModuleList'
import ModuleEditor from './ModuleEditor';
import Route from "react-router-dom/es/Route";

/**
 * Sets up the course editor interface.
 */
export default class CourseEditor
    extends Component {

    render() {
        const courseId = this.props.match.params.courseId;
        return (
            <div>
                <h2>Editing course: {courseId}</h2>
                <div className="row">
                    <ModuleList courseId={courseId}/>
                    <Route path="/course/:courseId/module/:moduleId"
                           component={ModuleEditor}/>
                    <Route exact path="/course/:courseId"
                           render={
                               () =>
                                   <div className="text-center col-sm-8 col-6">
                                       <h3>Please select a module from the left or create a new module.</h3>
                                   </div>
                           }/>
                </div>
            </div>
        );
    }
}