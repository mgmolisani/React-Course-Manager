import React, {Component} from 'react'
import {connect} from "react-redux";
import {widgetTextChanged} from "../../actions/WidgetActions";
import {FormGroup, Input, Label} from "reactstrap";

/**
 * State mapper
 * @param state
 * @param ownProps
 * @returns {*}
 */
const mapStateToProps = (state, ownProps) => (state);

const mapDispatchToProps = (dispatch, ownProps) => ({
    widgetTextChanged: text => {
        dispatch(widgetTextChanged(ownProps.widgetId, text));
    }
});

/**
 * Specific parts of a paragraph form
 */
class ParagraphWidgetForm
    extends Component {

    render() {
        return (
            <FormGroup key={'widget' + this.props.widgetId + 'Text'}>
                <Label htmlFor={'widget' + this.props.widgetId + 'TextFld'}>
                    Paragraph Text
                </Label>
                <Input id={'widget' + this.props.widgetId + 'TextFld'}
                       type="textarea"
                       placeholder="Enter paragraph content here"
                       value={this.props.widgets.byId[this.props.widgetId].text}
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