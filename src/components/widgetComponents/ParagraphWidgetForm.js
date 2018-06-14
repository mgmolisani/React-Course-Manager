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

class ParagraphWidgetForm
    extends Component {

    render() {
        return (
            <FormGroup key={'widget' + this.props.widget.id + 'Text'}>
                <Label htmlFor={'widget' + this.props.widget.id + 'TextFld'}>
                    Paragraph Text
                </Label>
                <Input id={'widget' + this.props.widget.id + 'TextFld'}
                       type="textarea"
                       placeholder="Enter paragraph content here."
                       defaultValue={this.props.widget.text}
                       onChange={(event) => {
                           this.props.widgetTextChanged(event.target.value)
                       }}/>
            </FormGroup>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ParagraphWidgetForm);