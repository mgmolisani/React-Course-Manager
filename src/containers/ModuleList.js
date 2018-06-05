import React, {Component} from 'react'
import ModuleListItem from '../components/ModuleListItem';
import ModuleServiceClient from "../services/ModuleServiceClient";
import {ListGroup, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {Redirect} from "react-router-dom";

/**
 * Represents a list of modules
 */
export default class ModuleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteFlag: false,
            updateFlag: false,
            modules: []
        };
        this.module = {title: 'New Module'};
        this.moduleService = ModuleServiceClient.instance;
        this.newTitleChanged = this.newTitleChanged.bind(this);
        this.createModule = this.createModule.bind(this);
        this.deleteModule = this.deleteModule.bind(this);
        this.updateModule = this.updateModule.bind(this);
        this.changeTab = this.changeTab.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
        this.toggleDelete = this.toggleDelete.bind(this);
        this.confirmUpdate = this.confirmUpdate.bind(this);
        this.toggleUpdate = this.toggleUpdate.bind(this);
        this.titleUpdated = this.titleUpdated.bind(this);
    }

    componentDidMount() {
        this.findAllModulesForCourse();
    }

    componentWillReceiveProps(newProps) {
        //Needed when redirecting and changing props
        if (newProps.moduleId !== this.props.moduleId) {
            this.setState({selected: null});
            this.findAllModulesForCourse(newProps);
        }
    }

    componentDidUpdate() {
        //Don't want to infinitely redirect
        if (this.state.redirect) {
            this.setState({redirect: false});
        }
    }

    /**
     * Finds and adds the modules to the state
     * @param props
     */
    findAllModulesForCourse(props = this.props) {
        this.moduleService
            .findAllModulesForCourse(props.courseId,
                (modules) => {
                    this.setModules(modules)
                });
    }

    /**
     * Set the modules to the state.
     * @param modules the modules to set
     */
    setModules(modules) {
        this.setState({modules: modules})
    }

    /**
     * Updates the title of a new modules to be made
     * This does not and should not be a state variable as it requires no new rendering
     * @param event the triggered event from typing
     */
    newTitleChanged(event) {
        this.module = {title: event.target.value};
    }

    /**
     * Calls the create new modules service and updates the modules
     */
    createModule() {
        this.moduleService
            .createModule(this.props.courseId, this.module,
                () => {
                    this.findAllModulesForCourse();
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
     * @param moduleID the module to delete
     * @param event the event triggered from clicking the button
     */
    confirmDelete(moduleID, event) {
        event.preventDefault();
        event.stopPropagation();
        this.moduleToDelete = moduleID;
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
                        Are you sure you want to delete module {this.moduleToDelete}?
                    </ModalBody>
                    <ModalFooter>
                        <button type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                    this.toggleDelete();
                                    this.deleteModule(this.moduleToDelete);
                                }}>
                            Delete
                        </button>
                        <button type="button"
                                className="btn btn-secondary"
                                onClick={() => {
                                    this.toggleDelete();
                                    this.moduleToDelete = null;
                                }}>
                            Cancel
                        </button>
                    </ModalFooter>
                </Modal>
            );
        }
    }

    /**
     * Deletes te module and updates the modules
     * @param moduleId the module to be deleted
     */
    deleteModule(moduleId) {
        this.moduleService
            .deleteModule(moduleId,
                () => {
                    this.findAllModulesForCourse();
                });
        if (this.state.selected === moduleId) {
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
     * @param modules the lesson to update
     * @param event
     */
    confirmUpdate(module, event) {
        event.preventDefault();
        event.stopPropagation();
        this.moduleToUpdate = module;
        this.toggleUpdate();
    }

    /**
     * Updates when the user enters a new title for the entry
     * @param event the user typing event
     */
    titleUpdated(event) {
        this.moduleToUpdate.title = event.target.value;
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
                        Update Module {this.moduleToUpdate.id}
                    </ModalHeader>
                    <ModalBody>
                        <form>
                            <div className="form-group">
                                <label htmlFor="updateModuleTitleFld" className="col-form-label">Title:</label>
                                <input type="text" className="form-control" id="updateModuleTitleFld"
                                       onChange={this.titleUpdated}/>
                            </div>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <button type="button"
                                className="btn btn-primary"
                                onClick={() => {
                                    this.toggleUpdate();
                                    this.updateModule(this.moduleToUpdate);
                                }}>
                            Update
                        </button>
                        <button type="button"
                                className="btn btn-secondary"
                                onClick={() => {
                                    this.toggleUpdate();
                                    this.moduleToUpdate = null;
                                }}>
                            Cancel
                        </button>
                    </ModalFooter>
                </Modal>
            );
        }
    }

    /**
     * Updates the modules and refreshes the modules
     * @param module the module to update
     */
    updateModule(module) {
        this.moduleService
            .updateModule(module,
                () => {
                    this.findAllModulesForCourse();
                });
    }

    /**
     * Renders the module list
     * @returns the module list
     */
    renderListOfModules() {
        let modules = this.state.modules;
        return modules.map(
            (module) => {
                return <ModuleListItem key={module.id}
                                       module={module}
                                       courseId={this.props.courseId}
                                       isSelected={`${module.id === this.state.selected ? 'active' : ''}`}
                                       delete={this.confirmDelete}
                                       update={this.confirmUpdate}
                                       changeTab={this.changeTab}/>
            }
        );
    }

    /**
     * Changes the active tab
     * @param moduleId
     */
    changeTab(moduleId) {
        this.setState({selected: moduleId});
    }

    render() {
        if (this.state.redirect) {
            return (
                <Redirect to={`/course/${this.props.courseId}`}/>
            );
        }
        return (
            <div className="col-sm-4 col-6">
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Create New Module"
                           id="newModuleTitleFld"
                           onChange={this.newTitleChanged}/>
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="button" id="createModuleBtn"
                                onClick={this.createModule}>
                            <i className="fa fa-plus"/>
                        </button>
                    </div>
                </div>
                <ListGroup>
                    {this.renderListOfModules()}
                </ListGroup>
                {this.renderDeleteModal()}
                {this.renderUpdateModal()}
            </div>
        );
    }
}