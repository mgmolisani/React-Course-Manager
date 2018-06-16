import React, {Component} from 'react'
import {connect} from "react-redux";
import {deleteWidget, moveWidgetDown, moveWidgetUp, selectWidgetType, toggleWidgetEdit} from "../actions/WidgetActions";
import {Card, CardBody, CardFooter, CardHeader, Form, Label} from "reactstrap";
import HeadingWidgetForm from "./widgetComponents/HeadingWidgetForm";
import HeadingWidget from "./widgetComponents/HeadingWidget";
import WidgetForm from "./widgetComponents/WidgetForm";
import ParagraphWidgetForm from "./widgetComponents/ParagraphWidgetForm";
import ParagraphWidget from "./widgetComponents/ParagraphWidget";
import {DragSource, DropTarget} from "react-dnd";
import {getEmptyImage} from "react-dnd-html5-backend";

const WIDGET = 'WIDGET';

const widgetSourceSpec = {
    beginDrag(props, monitor, component) {
        return {
            widget: props.widget,
            offsetTop: component.widgetRef.parentElement.getBoundingClientRect().top + window.scrollY,
            maxOffset: component.widgetRef.parentElement.offsetHeight - component.widgetRef.offsetHeight
        };
    }
};

const widgetTargetSpec = {
    hover(props, monitor, component) {
        let targetWidget = props.widget;
        console.log(targetWidget);
        let sourceWidget = monitor.getItem().widget;
        console.log(sourceWidget);
        if (targetWidget.position > sourceWidget.position) {
            console.log('up');
            props.moveWidgetUp();
        } else if (targetWidget.position < sourceWidget.position) {
            console.log('down');
            props.moveWidgetDown();
        } else {
            console.log('what');
        }
    }
};

function collectDrag(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    }
}

function collectDrop(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget()
    }
}

const mapStateToProps = (state, ownProps) => (state);

const mapDispatchToProps = (dispatch, ownProps) => ({
    deleteWidget: () => {
        dispatch(deleteWidget(ownProps.widget.id));
    },
    selectWidgetType: widgetType => {
        dispatch(selectWidgetType(ownProps.widget.id, widgetType));
    },
    moveWidgetUp: () => {
        dispatch(moveWidgetUp(ownProps.widget.id));
    },
    moveWidgetDown: () => {
        dispatch(moveWidgetDown(ownProps.widget.id));
    },
    toggleWidgetEdit: () => {
        dispatch(toggleWidgetEdit(ownProps.widget.id));
    }
});

class Widget
    extends Component {

    constructor(props) {
        super(props);
        this.widgetTypeRef = null;
        this.widgetRef = null;
    }

    componentWillMount() {
        this.props.connectDragPreview(getEmptyImage());
    }

    renderWidget() {
        switch (this.props.widget.widgetType) {
            case 'Heading':
                return <HeadingWidget widget={this.props.widget}/>;
            case 'Paragraph':
                return <ParagraphWidget widget={this.props.widget}/>;
            default:
                return null;
        }
    }

    render() {
        if (this.props.previewWidgetsFlag
            || (this.props.widgetToEdit && this.props.widgetToEdit !== this.props.widget.id)) {
            return this.renderWidget();
        } else {
            return (
                this.props.connectDropTarget(
                <div className="card mb-3" style={Object.assign({},
                    {opacity: this.props.isDragging ? 0.5 : 1},
                    this.props.style)}
                     ref={node => this.widgetRef = node}>
                    {this.props.connectDragSource(
                        <div className={`card-header form-inline ${this.props.condenseWidgetsFlag ? 'border-0' : ''}`}>
                            <div className="d-flex flex-wrap justify-content-between w-100">
                                <div>
                                    <h2>{this.props.widget.name || this.props.widget.widgetType + ' Widget'}</h2>
                                </div>
                                <div className="d-flex align-items-center">
                                    <select className="form-control"
                                            onChange={(event) => {
                                                this.props.selectWidgetType(this.widgetTypeRef.value)
                                            }}
                                            value={this.props.widget.widgetType}
                                            ref={node => this.widgetTypeRef = node}>
                                        <option>Paragraph</option>
                                        <option>Heading</option>
                                    </select>
                                    <span className={`float-right ml-3`}
                                          onClick={this.props.toggleWidgetEdit}>
                                    <i className="fa fa-edit"/>
                                </span>
                                    <span
                                        className={`float-right ml-3 ${this.props.widget.position === 0 ? 'd-none' : ''}`}
                                        onClick={this.props.moveWidgetUp}>
                                    <i className="fa fa-arrow-up"/>
                                </span>
                                    <span
                                        className={`float-right ml-3 ${this.props.widget.position === this.props.widgets.length - 1 ? 'd-none' : ''}`}
                                        onClick={this.props.moveWidgetDown}>
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
                            <WidgetForm widget={this.props.widget}/>
                            {this.props.widget.widgetType === 'Heading' &&
                            <HeadingWidgetForm widget={this.props.widget}/>}
                            {this.props.widget.widgetType === 'Paragraph' &&
                            <ParagraphWidgetForm widget={this.props.widget}/>}
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