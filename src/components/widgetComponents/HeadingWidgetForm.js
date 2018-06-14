import React, {Component} from 'react'
import {connect} from "react-redux";
import {headingSizeChanged, widgetTextChanged} from "../../actions/WidgetActions";
import {FormGroup, Input, Label} from "reactstrap";

const mapStateToProps = (state, ownProps) => (state);

const mapDispatchToProps = (dispatch, ownProps) => ({
    widgetTextChanged: text => {
        dispatch(widgetTextChanged(ownProps.widget.id, text));
    },
    headingSizeChanged: size => {
        dispatch(headingSizeChanged(ownProps.widget.id, size));
    }
});

class HeadingWidgetForm
    extends Component {

    render() {
        return ([
            <FormGroup key={'widget' + this.props.widget.id + 'Size'}>
                <Label htmlFor={'widget' + this.props.widget.id + 'SizeFld'}>
                    Heading Size
                </Label>
                <Input id={'widget' + this.props.widget.id + 'SizeFld'}
                       type="select"
                       onChange={(event) => {
                           this.props.headingSizeChanged(parseInt(event.target.value, 10));
                       }}
                       defaultValue={this.props.widget.size}>
                    <option value="1">Heading 1</option>
                    <option value="2">Heading 2</option>
                    <option value="3">Heading 3</option>
                </Input>
            </FormGroup>,
            <FormGroup key={'widget' + this.props.widget.id + 'Text'}>
                <Label htmlFor={'widget' + this.props.widget.id + 'TextFld'}>
                    Heading Text
                </Label>
                <Input id={'widget' + this.props.widget.id + 'TextFld'}
                       type="textarea"
                       placeholder="Enter heading content here."
                       defaultValue={this.props.widget.text}
                       onChange={(event) => {
                           this.props.widgetTextChanged(event.target.value)
                       }}/>
            </FormGroup>
        ]);
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HeadingWidgetForm);