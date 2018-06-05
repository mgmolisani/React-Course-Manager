import React, {Component} from 'react';
import {Link} from 'react-router-dom';

/**
 * Represents a course as a row in table.
 */
export default class CourseRow
    extends Component {

    render() {
        let course = this.props.course;
        return (
            <tr>
                <th scope="row">
                    <Link to={`/course/${course.id}`}>
                        {course.title}
                    </Link>
                    <span className="float-right"
                                 onClick={(event) => {
                                     this.props.update(course, event)
                                 }}>
                        <i className="fa fa-edit"/>
                    </span>
                </th>
                <td>
                    {course.author}
                </td>
                <td>
                    {new Date(course.modified).toDateString()}
                </td>
                <td onClick={(event) => {
                         this.props.delete(course.id, event)}}>
                    <i className="fa fa-remove"/>
                </td>
            </tr>
        )
    }
}