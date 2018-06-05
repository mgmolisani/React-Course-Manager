import React, {Component} from 'react'
import LessonTabs from "./LessonTabs";
import LessonEditor from "./LessonEditor";
import {Route} from "react-router-dom";

/**
 * Sets up the module editor interface.
 */
export default class ModuleEditor
    extends Component {

    render() {
        const courseId = this.props.match.params.courseId;
        const moduleId = this.props.match.params.moduleId;
        return (
            <div className="col-sm-8 col-6">
                <LessonTabs courseId={courseId}
                            moduleId={moduleId}/>
                <Route path="/course/:courseId/module/:moduleId/lesson/:lessonId"
                       component={LessonEditor}/>
                <Route exact path="/course/:courseId/module/:moduleId"
                       render={
                           () =>
                               <div className="text-center">
                                   <h3>Please select a lesson above or create a new lesson.</h3>
                               </div>
                       }/>
            </div>
        );
    }
}