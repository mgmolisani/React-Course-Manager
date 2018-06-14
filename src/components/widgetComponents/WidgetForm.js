import React, {Component} from 'react'
import {
    addWidgetClass,
    addWidgetStyle,
    widgetClassChanged,
    widgetNameChanged,
    widgetStyleKeyChanged,
    widgetStyleValueChanged
} from "../../actions/WidgetActions";
import {Button, Col, FormGroup, Input, Label, Row} from "reactstrap";
import ClassList from "../../containers/widgetContainers/ClassList";
import StyleList from "../../containers/widgetContainers/StyleList";
import {connect} from "react-redux";

const mapStateToProps = (state, ownProps) => (state);

const mapDispatchToProps = (dispatch, ownProps) => ({
    widgetNameChanged: name => {
        dispatch(widgetNameChanged(ownProps.widget.id, name));
    },
    widgetClassChanged: className => {
        dispatch(widgetClassChanged(ownProps.widget.id, className));
    },
    addWidgetClass: () => {
        dispatch(addWidgetClass(ownProps.widget.id));
    },
    widgetStyleKeyChanged: styleKey => {
        dispatch(widgetStyleKeyChanged(ownProps.widget.id, styleKey));
    },
    widgetStyleValueChanged: styleValue => {
        dispatch(widgetStyleValueChanged(ownProps.widget.id, styleValue));
    },
    addWidgetStyle: () => {
        dispatch(addWidgetStyle(ownProps.widget.id));
    }
});

class WidgetForm
    extends Component {

    render() {
        return ([
                <FormGroup key={'widget' + this.props.widget.id + 'Name'}>
                    <Label htmlFor={'widget' + this.props.widget.id + 'NameFld'}>
                        Widget Name
                    </Label>
                    <Input id={'widget' + this.props.widget.id + 'NameFld'}
                           type="text"
                           onChange={(event) => {
                               this.props.widgetNameChanged(event.target.value);
                           }}
                           defaultValue={this.props.widget.name}>
                    </Input>
                </FormGroup>,
                <Row key={'widget' + this.props.widget.id + 'Style'}>
                    <Col xs="12" md="6">
                        <FormGroup>
                            <Label htmlFor={'widget' + this.props.widget.id + 'ClassFld'}>
                                Classes
                            </Label>
                            <Input id={'widget' + this.props.widget.id + 'ClassFld'}
                                   type="text"
                                   placeholder="Enter class name (e.g. container)"
                                   onChange={(event) => {
                                       this.props.widgetClassChanged(event.target.value);
                                   }}
                                   value={this.props.widget.classToAdd || ''}>
                            </Input>
                            <Button color="primary"
                                    type="button"
                                    className="col"
                                    onClick={this.props.addWidgetClass}>
                                <i className="fa fa-plus"/>
                            </Button>
                        </FormGroup>
                        <ClassList widget={this.props.widget}/>
                    </Col>
                    <Col xs="12" md="6" >
                        <FormGroup>
                            <Label htmlFor={'widget' + this.props.widget.id + 'StyleKeyFld'}>
                                Styles
                            </Label>
                            <Input id={'widget' + this.props.widget.id + 'StyleKeyFld'}
                                   type="text"
                                   placeholder="Enter style key (e.g. backgroundColor)"
                                   onChange={(event) => {
                                       this.props.widgetStyleKeyChanged(event.target.value);
                                   }}
                                   value={this.props.widget.styleKeyToAdd || ''}>
                            </Input>
                            <Input id={'widget' + this.props.widget.id + 'StyleValueFld'}
                                   type="text"
                                   placeholder="Enter style value (e.g. blue)"
                                   onChange={(event) => {
                                       this.props.widgetStyleValueChanged(event.target.value);
                                   }}
                                   value={this.props.widget.styleValueToAdd || ''}>
                            </Input>
                            <Button color="primary"
                                    type="button"
                                    className="col"
                                    onClick={this.props.addWidgetStyle}>
                                <i className="fa fa-plus"/>
                            </Button>
                        </FormGroup>
                        <StyleList widget={this.props.widget}/>
                    </Col>
                </Row>
        ]);
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(WidgetForm);