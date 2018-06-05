import React from 'react'
import {NavItem, NavLink} from "reactstrap";
import {Link} from "react-router-dom";

/**
 * Represents a lesson as a tab
 */
export default class LessonTabItem
    extends React.Component {

    render() {
        let lesson = this.props.lesson;
        return (
            <NavItem onClick={() => {
                this.props.changeTab(this.props.lesson.id)
            }}>
                <NavLink tag={Link}
                         className={this.props.isSelected}
                         style={{
                             display: 'block',
                             textDecoration: 'none'
                         }}
                         to={`/course/${this.props.courseId}/module/${this.props.moduleId}/lesson/${lesson.id}`}>
                    {this.props.lesson.title}
                    <span className="float-right ml-3"
                          onClick={(event) => {
                              this.props.delete(lesson.id, event)
                          }}>
                        <i className="fa fa-remove"/>
                    </span>
                    <span className="float-right ml-3"
                          onClick={(event) => {
                              this.props.update(lesson, event)
                          }}>
                        <i className="fa fa-edit"/>
                    </span>
                </NavLink>
            </NavItem>
        );
    }
}