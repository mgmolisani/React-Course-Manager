import React, {Component} from 'react'
import {reducer} from "../reducers/WidgetsReducer";
import {createStore} from "redux";
import {Provider} from "react-redux";
import WidgetList from "./WidgetList";

const store = createStore(reducer);

/**
 * Sets up the lesson editor interface.
 */
export default class LessonEditor
    extends Component {

    render() {
        const courseId = this.props.match.params.courseId;
        const moduleId = this.props.match.params.moduleId;
        const lessonId = this.props.match.params.lessonId;
        return (
            <Provider store={store}>
                <WidgetList courseId={courseId}
                            moduleId={moduleId}
                            lessonId={lessonId}/>
            </Provider>
        );
    }
}