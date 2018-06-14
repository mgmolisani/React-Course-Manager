import React, {Component} from 'react'
import {reducer} from "../reducers/WidgetsReducer";
import {createStore} from "redux";
import {Provider} from "react-redux";
import WidgetList from "./WidgetList";
import {DragDropContextProvider} from "react-dnd";
import HTML5Backend from 'react-dnd-html5-backend'

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
                <DragDropContextProvider backend={HTML5Backend}>
                    <WidgetList courseId={courseId}
                                moduleId={moduleId}
                                lessonId={lessonId}/>
                </DragDropContextProvider>
            </Provider>
        );
    }
}