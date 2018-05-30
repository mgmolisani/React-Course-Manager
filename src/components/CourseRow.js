import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class CourseRow
    extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let course = this.props.course;
        return (
            <div className="row">
                <div className="col-5">
                    <Link to={`/course/${course.id}`}>
                        {course.title}
                    </Link>
                </div>
                <div className="col-2">
                    {course.owner}
                </div>
                <div className="col-4">
                    {new Date(course.modified).toDateString()}
                </div>
                <div className="col-1"
                     onClick={() => {
                         this.props.deleteCourse(course.id)
                     }}>
                    <i className="fa fa-remove"/>
                </div>
            </div>
        )
    }
}