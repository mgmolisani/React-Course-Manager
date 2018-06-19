import React, {Component} from 'react'
import {connect} from "react-redux";
import {deleteWidget, moveWidget, selectWidgetType, toggleWidgetEdit} from "../actions/WidgetActions";
import {CardBody, CardFooter, Form, Label} from "reactstrap";
import HeadingWidgetForm from "./widgetComponents/HeadingWidgetForm";
import HeadingWidget from "./widgetComponents/HeadingWidget";
import WidgetForm from "./widgetComponents/WidgetForm";
import ParagraphWidgetForm from "./widgetComponents/ParagraphWidgetForm";
import ParagraphWidget from "./widgetComponents/ParagraphWidget";
import {DragSource, DropTarget} from "react-dnd";
import {getEmptyImage} from "react-dnd-html5-backend";
import LinkWidgetForm from "./widgetComponents/LinkWidgetForm";
import LinkWidget from "./widgetComponents/LinkWidget";
import ImageWidget from "./widgetComponents/ImageWidget";
import ImageWidgetForm from "./widgetComponents/ImageWidgetForm";
import ListWidget from "./widgetComponents/ListWidget";
import ListWidgetForm from "./widgetComponents/ListWidgetForm";

/**
 * The type recognized for drag and drop
 * @type {string}
 */
const WIDGET = 'WIDGET';

/**
 * The drag source specs
 * @type {{beginDrag(*, *, *): *}}
 */
const widgetSourceSpec = {
    beginDrag(props, monitor, component) {
        return {
            widgetId: props.widgetId,
            offsetTop: component.widgetRef.parentElement.getBoundingClientRect().top + window.scrollY,
            maxOffset: component.widgetRef.parentElement.offsetHeight - component.widgetRef.offsetHeight
        };
    }
};

/**
 * The drag drop location specs
 * @type {{hover(*, *, *): void}}
 */
const widgetTargetSpec = {
    hover(props, monitor, component) {
        let targetWidget = props.widgets.byId[props.widgetId];
        let sourceWidget = props.widgets.byId[monitor.getItem().widgetId];
        if (targetWidget.position !== sourceWidget.position) {
            props.moveWidget(sourceWidget.id, targetWidget.position);
        }
    }
};

/**
 * The connector for dragging
 * @param connect
 * @param monitor
 * @returns {{connectDragSource: ConnectDragSource | * | undefined, connectDragPreview: ConnectDragPreview | * | undefined, isDragging: boolean | *}}
 */
function collectDrag(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    }
}

/**
 * The connector for dropping
 * @param connect
 * @param monitor
 * @returns {{connectDropTarget: ConnectDropTarget | * | undefined}}
 */
function collectDrop(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget()
    }
}

/**
 * State mapper
 * @param state
 * @param ownProps
 * @returns {*}
 */
const mapStateToProps = (state, ownProps) => (state);

/**
 * Dispatch mapper
 * @param dispatch
 * @param ownProps
 * @returns {{deleteWidget: deleteWidget, selectWidgetType: selectWidgetType, moveWidget: moveWidget, toggleWidgetEdit: toggleWidgetEdit}}
 */
const mapDispatchToProps = (dispatch, ownProps) => ({
    deleteWidget: () => {
        dispatch(deleteWidget(ownProps.widgetId));
    },
    selectWidgetType: widgetType => {
        dispatch(selectWidgetType(ownProps.widgetId, widgetType));
    },
    moveWidget: (id, position) => {
        dispatch(moveWidget(id, position))
    },
    toggleWidgetEdit: () => {
        dispatch(toggleWidgetEdit(ownProps.widgetId));
    }
});

/**
 * A class to represent a widget
 */
class Widget
    extends Component {

    /**
     * Adds the refs
     * @param props
     */
    constructor(props) {
        super(props);
        this.widgetTypeRef = null;
        this.widgetRef = null;
    }

    /**
     * Connects the drag custom image layer
     */
    componentWillMount() {
        this.props.connectDragPreview(getEmptyImage());

    }

    /**
     * Renders the correct widget
     * @returns {*}
     */
    renderWidget() {
        switch (this.props.widgets.byId[this.props.widgetId].widgetType) {
            case 'Heading':
                return <HeadingWidget widgetId={this.props.widgetId}/>;
            case 'Paragraph':
                return <ParagraphWidget widgetId={this.props.widgetId}/>;
            case 'Link':
                return <LinkWidget widgetId={this.props.widgetId}/>;
            case 'Image':
                return <ImageWidget widgetId={this.props.widgetId}/>;
            case 'List':
                return <ListWidget widgetId={this.props.widgetId}/>;
            default:
                return null;
        }
    }

    render() {
        let widget = this.props.widgets.byId[this.props.widgetId];
        if (this.props.previewWidgetsFlag
            || (this.props.widgetToEdit && this.props.widgetToEdit !== this.props.widgetId)) {
            return this.renderWidget();
        } else {
            return (
                this.props.connectDropTarget(
                <div className="card mb-3" style={Object.assign({},
                    {opacity: this.props.isDragging ? 0.4 : 1},
                    this.props.style)}
                     ref={node => this.widgetRef = node}>
                    {this.props.connectDragSource(
                        <div className={`card-header form-inline ${this.props.condenseWidgetsFlag ? 'border-0' : ''}`}>
                            <div className="d-flex flex-wrap justify-content-between w-100">
                                <div>
                                    <h2>{widget.name || widget.widgetType + ' Widget'}</h2>
                                </div>
                                <div className="d-flex align-items-center">
                                    <select className="form-control"
                                            onChange={(event) => {
                                                this.props.selectWidgetType(this.widgetTypeRef.value)
                                            }}
                                            value={widget.widgetType}
                                            ref={node => this.widgetTypeRef = node}>
                                        <option>Paragraph</option>
                                        <option>Heading</option>
                                        <option>Link</option>
                                        <option>Image</option>
                                        <option>List</option>
                                    </select>
                                    <span className={`float-right ml-3`}
                                          onClick={this.props.toggleWidgetEdit}>
                                    <i className="fa fa-edit"/>
                                </span>
                                    <span
                                        className={`float-right ml-3 ${widget.position === 0 ? 'd-none' : ''}`}
                                        onClick={() => (this.props.moveWidget(widget.id, widget.position - 1))}>
                                    <i className="fa fa-arrow-up"/>
                                </span>
                                    <span
                                        className={`float-right ml-3 ${widget.position === this.props.widgets.allIds.length - 1 ? 'd-none' : ''}`}
                                        onClick={() => (this.props.moveWidget(this.props.widgetId, widget.position + 1))}>
                                    <i className="fa fa-arrow-down"/>
                                </span>
                                    <span className="float-right ml-3"
                                          onClick={this.props.deleteWidget}>
                                    <i className="fa fa-remove"/>
                                </span>
                                </div>
                            </div>
                        </div>)}
                    <CardBody className={this.props.condenseWidgetsFlag ? 'd-none' : ''}>
                        <Form>
                            <WidgetForm widgetId={this.props.widgetId}/>
                            {widget.widgetType === 'Heading' &&
                            <HeadingWidgetForm widgetId={this.props.widgetId}/>}
                            {widget.widgetType === 'Paragraph' &&
                            <ParagraphWidgetForm widgetId={this.props.widgetId}/>}
                            {widget.widgetType === 'Link' &&
                            <LinkWidgetForm widgetId={this.props.widgetId}/>}
                            {widget.widgetType === 'Image' &&
                            <ImageWidgetForm widgetId={this.props.widgetId}/>}
                            {widget.widgetType === 'List' &&
                            <ListWidgetForm widgetId={this.props.widgetId}/>}
                        </Form>
                    </CardBody>
                    <CardFooter className={this.props.condenseWidgetsFlag ? 'd-none' : ''}>
                        <Label className="d-block">
                            Preview
                        </Label>
                        {this.renderWidget()}
                    </CardFooter>
                </div>
            ))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DropTarget(
    WIDGET,
    widgetTargetSpec,
    collectDrop
)(DragSource(
    WIDGET,
    widgetSourceSpec,
    collectDrag
)(Widget)));