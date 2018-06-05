import React, {Component} from 'react'
import Topics from "./Topics";

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
            <Topics courseId={courseId}
                    moduleId={moduleId}
                    lessonId={lessonId}/>
        );
    }
}