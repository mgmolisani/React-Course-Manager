import React, {Component} from 'react';
import CourseRow from "../components/CourseRow"
import CourseService from "../services/CourseService"

export default class CourseList
    extends Component {

    constructor() {
        super();
        this.state = {};
        this.state.courses = [];
        this.courseService = CourseService.instance;
        this.titleChanged = this.titleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
    }

    componentDidMount() {
        this.findAllCourses();
    }

    findAllCourses() {
        this.courseService
            .findAllCourses()
            .then((courses) => {
                this.setState({courses: courses});
            });
    }

    renderCourseRows() {
        this.state.courses.sort((a, b) => {
            return Date.parse(b.modified) - Date.parse(a.modified);
        });
        return this.state.courses.map(
            (course) => {
                return <CourseRow key={course.id}
                                  course={course}
                                  deleteCourse={this.deleteCourse}/>
            }
        );
    }

    titleChanged(event) {
        this.setState({
            course: {title: event.target.value}
        });
    }

    createCourse() {
        this.courseService
            .createCourse(this.state.course)
            .then(() => {
                this.findAllCourses();
            });
    }

    deleteCourse(courseId) {
        this.courseService
            .deleteCourse(courseId)
            .then(() => {
                this.findAllCourses()
            });
    }

    render() {
        return (
            <div>
                <h2>Course List</h2>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Create New Course"
                           id="titleFld"
                           onChange={this.titleChanged}/>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" id="createBtn"
                                onClick={this.createCourse}>
                            <i className="fa fa-plus"/>
                        </button>
                    </div>
                </div>
                <div className="course-list-grid container">
                    <div className="row">
                        <div className="col-5">
                            Title
                        </div>
                        <div className="col-2">
                            Owned by
                        </div>
                        <div className="col-4">
                            Last modified
                        </div>
                    </div>
                    {this.renderCourseRows()}
                </div>
            </div>
        )
    }
}