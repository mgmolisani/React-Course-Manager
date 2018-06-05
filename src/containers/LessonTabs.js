import React from 'react'
import {Modal, ModalBody, ModalFooter, ModalHeader, Nav} from "reactstrap";
import LessonTabItem from "../components/LessonTabItem";
import LessonServiceClient from "../services/LessonServiceClient";
import {Redirect} from "react-router-dom";

/**
 * Represents a set of lesson tabs.
 */
export default class LessonTabs
    extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            deleteFlag: false,
            updateFlag: false,
            lessons: []
        };
        this.lesson = {title: 'New Lesson'};
        this.lessonService = LessonServiceClient.instance;
        this.newTitleChanged = this.newTitleChanged.bind(this);
        this.createLesson = this.createLesson.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
        this.updateLesson = this.updateLesson.bind(this)
        this.changeTab = this.changeTab.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
        this.toggleDelete = this.toggleDelete.bind(this);
        this.confirmUpdate = this.confirmUpdate.bind(this);
        this.toggleUpdate = this.toggleUpdate.bind(this);
        this.titleUpdated = this.titleUpdated.bind(this);
    }

    componentDidMount() {
        this.findAllLessonsForModule();
    }

    componentWillReceiveProps(newProps) {
        //Need this if the url changes
        if (newProps.moduleId !== this.props.moduleId) {
            this.setState({selected: null});
            this.findAllLessonsForModule(newProps);
        }
    }

    componentDidUpdate() {
        // Don't want to infinitely redirect
        if (this.state.redirect) {
            this.setState({redirect: false});
        }
    }

    /**
     * Finds and adds the lessons to the state.
     * @param props either the new or old props (default old)
     */
    findAllLessonsForModule(props = this.props) {
        this.lessonService
            .findAllLessonsForModule(props.courseId, props.moduleId,
                (lessons) => {
                    this.setLessons(lessons)
                });
    }

    /**
     * Set the lessons to the state.
     * @param lessons the lessons to set
     */
    setLessons(lessons) {
        this.setState({lessons: lessons});
    }

    /**
     * Changes the active tab
     * @param lessonId
     */
    changeTab(lessonId) {
        this.setState({selected: lessonId});
    }

    /**
     * Renders the lesson tabs
     * @returns the lesson tabs
     */
    renderLessonTabs() {
        let lessons = this.state.lessons;
        return lessons.map(
            (lesson) => {
                return <LessonTabItem key={lesson.id}
                                      lesson={lesson}
                                      courseId={this.props.courseId}
                                      moduleId={this.props.moduleId}
                                      isSelected={`${lesson.id === this.state.selected ? 'active' : ''}`}
                                      delete={this.confirmDelete}
                                      update={this.confirmUpdate}
                                      changeTab={this.changeTab}/>
            }
        )
    }

    /**
     * Updates the title of a new lesson to be made
     * This does not and should not be a state variable as it requires no new rendering
     * @param event the triggered event from typing
     */
    newTitleChanged(event) {
        this.lesson = {title: event.target.value};
    }

    /**
     * Calls the create new lesson service and updates the lessons
     */
    createLesson() {
        this.lessonService
            .createLesson(this.props.courseId, this.props.moduleId, this.lesson,
                () => {
                    this.findAllLessonsForModule();
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
     * @param lessonId the lesson to delete
     * @param event the event triggered from clicking the button
     */
    confirmDelete(lessonId, event) {
        event.preventDefault();
        event.stopPropagation();
        this.lessonToDelete = lessonId;
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
                        Are you sure you want to delete lesson {this.lessonToDelete}?
                    </ModalBody>
                    <ModalFooter>
                        <button type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                    this.toggleDelete();
                                    this.deleteLesson(this.lessonToDelete);
                                }}>
                            Delete
                        </button>
                        <button type="button"
                                className="btn btn-secondary"
                                onClick={() => {
                                    this.toggleDelete();
                                    this.lessonToDelete = null;
                                }}>
                            Cancel
                        </button>
                    </ModalFooter>
                </Modal>
            );
        }
    }

    /**
     * Deletes te lesson and updates the lessons
     * @param lessonId the lesson to be deleted
     */
    deleteLesson(lessonId) {
        this.lessonService
            .deleteLesson(lessonId,
                () => {
                    this.findAllLessonsForModule();
                });
        if (this.state.selected === lessonId) {
            this.setState({
                redirect: true,
                selected: null
            })
        }
    }

    /**
     * Toggles the update flag if the update popup should appear
     */
    toggleUpdate() {
        this.setState({updateFlag: !(this.state.updateFlag)})
    }

    /**
     * Called when the user tries to update an entry
     * @param lesson the lesson to update
     * @param event
     */
    confirmUpdate(lesson, event) {
        event.preventDefault();
        event.stopPropagation();
        this.lessonToUpdate = lesson;
        this.toggleUpdate();
    }

    /**
     * Updates when the user enters a new title for the entry
     * @param event the user typing event
     */
    titleUpdated(event) {
        this.lessonToUpdate.title = event.target.value;
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
                        Update Lesson {this.lessonToUpdate.id}
                    </ModalHeader>
                    <ModalBody>
                        <form>
                            <div className="form-group">
                                <label htmlFor="updateLessonTitleFld" className="col-form-label">Title:</label>
                                <input type="text" className="form-control" id="updateLessonTitleFld"
                                       onChange={this.titleUpdated}/>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <button type="button"
                                className="btn btn-primary"
                                onClick={(lessonId, event) => {
                                    this.toggleUpdate();
                                    this.updateLesson(this.lessonToUpdate, event);
                                }}>
                            Update
                        </button>
                        <button type="button"
                                className="btn btn-secondary"
                                onClick={() => {
                                    this.toggleUpdate();
                                    this.lessonToUpdate = null;
                                }}>
                            Cancel
                        </button>
                    </ModalFooter>
                </Modal>
            );
        }
    }

    /**
     * Updates the lesson and refreshes the lessons
     * @param lesson the lesson to update
     */
    updateLesson(lesson) {
        this.lessonService
            .updateLesson(lesson,
                () => {
                    this.findAllLessonsForModule();
                });
    }

    render() {
        if (this.state.redirect) {
            return (
                <Redirect to={`/course/${this.props.courseId}/module/${this.props.moduleId}`}/>
            );
        }
        return (
            <div>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Create New Lesson"
                           id="newLessonTitleFld"
                           onChange={this.newTitleChanged}/>
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button" id="createLessonBtn"
                                onClick={this.createLesson}>
                            <i className="fa fa-plus"/>
                        </button>
                    </div>
                </div>
                <Nav tabs>
                    {this.renderLessonTabs()}
                </Nav>
                {this.renderDeleteModal()}
                {this.renderUpdateModal()}
            </div>
        );
    }
}
