import React, {Component} from 'react';
import CourseRow from "../components/CourseRow"
import CourseServiceClient from "../services/CourseServiceClient"
import {Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

/**
 * Represents a list of courses.
 */
export default class CourseList
    extends Component {

    constructor() {
        super();
        this.state = {
            deleteFlag: false,
            updateFlag: false,
            courses: []
        };
        this.course = {title: "New Course"};
        this.courseService = CourseServiceClient.instance;
        this.newTitleChanged = this.newTitleChanged.bind(this);
        this.createCourse = this.createCourse.bind(this);
        this.deleteCourse = this.deleteCourse.bind(this);
        this.updateCourse = this.updateCourse.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
        this.toggleDelete = this.toggleDelete.bind(this);
        this.confirmUpdate = this.confirmUpdate.bind(this);
        this.toggleUpdate = this.toggleUpdate.bind(this);
        this.titleUpdated = this.titleUpdated.bind(this);
    }


    componentDidMount() {
        this.findAllCourses();
    }

    /**
     * Finds and adds the courses to the state.
     */
    findAllCourses() {
        this.courseService
            .findAllCourses((courses) => {
                this.setState({courses: courses});
            });
    }

    /**
     * Renders the course rows
     * @returns the course rows
     */
    renderCourseRows() {
        let courses = this.state.courses;
        courses.sort((a, b) => {
            return Date.parse(b.modified) - Date.parse(a.modified);
        });
        return courses.map(
            (course) => {
                return <CourseRow key={course.id}
                                  course={course}
                                  delete={this.confirmDelete}
                                  update={this.confirmUpdate}/>
            }
        );
    }

    /**
     * Updates the title of a new course to be made
     * This does not and should not be a state variable as it requires no new rendering
     * @param event the triggered event from typing
     */
    newTitleChanged(event) {
        this.course = {title: event.target.value}
    }

    /**
     * Calls the create new course service and updates the courses
     */
    createCourse() {
        this.courseService
            .createCourse(this.course,
                () => {
                    this.findAllCourses();
                });
    }

    /**
     * Toggles the delete flag if the delete popup should appear
     */
    toggleDelete() {
        this.setState({deleteFlag: !(this.state.deleteFlag)})
    }

    /**
     * Called when a user tries to delete an entry to confirm the request
     * @param courseId the corse to delete
     * @param event the event triggered from clicking the button
     */
    confirmDelete(courseId, event) {
        event.preventDefault();
        event.stopPropagation();
        // Sets the course
        this.courseToDelete = courseId;
        //Toggles the flag
        this.toggleDelete();
    }

    /**
     * Renders the confirmation modal to delete the entry
     * @returns the confirmation modal to delete the entry
     */
    renderDeleteModal() {
        if (this.state.deleteFlag) {
            return (
                <Modal isOpen={this.state.deleteFlag} toggle={this.toggleDelete}>
                    <ModalHeader>
                        Confirm Deletion
                    </ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete course {this.courseToDelete}?
                    </ModalBody>
                    <ModalFooter>
                        <button type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                    this.toggleDelete();
                                    this.deleteCourse(this.courseToDelete);
                                }}>
                            Delete
                        </button>
                        <button type="button"
                                className="btn btn-secondary"
                                onClick={() => {
                                    this.toggleDelete();
                                    this.courseToDelete = null;
                                }}>
                            Cancel
                        </button>
                    </ModalFooter>
                </Modal>
            );
        }
    }

    /**
     * Deletes te course and updates the courses
     * @param courseId the course to be deleted
     */
    deleteCourse(courseId) {
        this.courseService
            .deleteCourse(courseId,
                () => {
                    this.findAllCourses()
                });
    }

    /**
     * Toggles the update flag if the update popup should appear
     */
    toggleUpdate() {
        this.setState({updateFlag: !(this.state.updateFlag)})
    }

    /**
     * Called when the user tries to update an entry
     * @param course the course to update
     * @param event
     */
    confirmUpdate(course, event) {
        event.preventDefault();
        event.stopPropagation();
        //Set the course
        this.courseToUpdate = course;
        //Toggle the flag
        this.toggleUpdate();
    }

    /**
     * Updates when the user enters a new title for the entry
     * @param event the user typing event
     */
    titleUpdated(event) {
        this.courseToUpdate.title = event.target.value;
    }

    /**
     * Renders the confirmation modal to update the entry
     * @returns the confirmation modal to update the entry
     */
    renderUpdateModal() {
        if (this.state.updateFlag) {
            return (
                <Modal isOpen={this.state.updateFlag} toggle={this.toggleUpdate}>
                    <ModalHeader>
                        Update Course {this.courseToUpdate.id}
                    </ModalHeader>
                    <ModalBody>
                        <form>
                            <div className="form-group">
                                <label htmlFor="updateCourseTitleFld" className="col-form-label">Title:</label>
                                <input type="text" className="form-control" id="updateCourseTitleFld"
                                       onChange={this.titleUpdated}/>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <button type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                    this.toggleUpdate();
                                    this.updateCourse(this.courseToUpdate);
                                }}>
                            Update
                        </button>
                        <button type="button"
                                className="btn btn-secondary"
                                onClick={() => {
                                    this.toggleUpdate();
                                    this.courseToUpdate = null;
                                }}>
                            Cancel
                        </button>
                    </ModalFooter>
                </Modal>
            );
        }
    }

    /**
     * Updates the course and refreshes the courses
     * @param course the course to update
     */
    updateCourse(course) {
        this.courseService
            .updateCourse(course,
                () => {
                    this.findAllCourses();
                });
    }

    render() {
        return (
            <div>
                <h2>Course List</h2>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Create New Course"
                           id="newCourseTitleFld"
                           onChange={this.newTitleChanged}/>
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button" id="createCourseBtn"
                                onClick={this.createCourse}>
                            <i className="fa fa-plus"/>
                        </button>
                    </div>
                </div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Owned by</th>
                            <th scope="col">Last modified</th>
                            <th scope="col"/>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderCourseRows()}
                    </tbody>
                </table>
                {this.renderDeleteModal()}
                {this.renderUpdateModal()}
            </div>
        )
    }
}