import React, {Component} from 'react'
import {connect} from "react-redux";
import {imageChanged, imageHeightChanged, imageWidthChanged, widgetTextChanged} from "../../actions/WidgetActions";
import {Col, FormGroup, Input, Label, Row} from "reactstrap";

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
 * @returns {{widgetTextChanged: widgetTextChanged, imageChanged: imageChanged, imageWidthChanged: imageWidthChanged, imageHeightChanged: imageHeightChanged}}
 */
const mapDispatchToProps = (dispatch, ownProps) => ({
    widgetTextChanged: text => {
        dispatch(widgetTextChanged(ownProps.widgetId, text));
    },
    imageChanged: link => {
        dispatch(imageChanged(ownProps.widgetId, link));
    },
    imageWidthChanged: width => {
        dispatch(imageWidthChanged(ownProps.widgetId, width));
    },
    imageHeightChanged: height => {
        dispatch(imageHeightChanged(ownProps.widgetId, height));
    }
});

/**
 * Represents the specific parts of an image widget
 */
class ImageWidgetForm
    extends Component {

    render() {
        let widget = this.props.widgets.byId[this.props.widgetId];
        return ([
                <FormGroup key={'widget' + this.props.widgetId + 'Image'}>
                    <Label htmlFor={'widget' + this.props.widgetId + 'ImageFld'}>
                        Image Path
                    </Label>
                    <Input id={'widget' + this.props.widgetId + 'ImageFld'}
                           type="text"
                           placeholder="e.g. http://www.gstatic.com/webp/gallery/1.jpg (include entire path)"
                           onChange={(event) => {
                               this.props.imageChanged(event.target.value);
                           }}
                           value={widget.image}>
                    </Input>
                </FormGroup>,
                <Row key={'widget' + this.props.widgetId + 'Style'}>
                    <Col xs="12" md="6">
                        <FormGroup>
                            <Label htmlFor={'widget' + this.props.widgetId + 'WidthFld'}>
                                Width
                            </Label>
                            <Input id={'widget' + this.props.widgetId + 'WidthFld'}
                                   type="text"
                                   placeholder="auto"
                                   onChange={(event) => {
                                       this.props.imageWidthChanged(event.target.value);
                                   }}
                                   value={widget.width}>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col xs="12" md="6">
                        <FormGroup>
                            <Label htmlFor={'widget' + this.props.widgetId + 'HeightFld'}>
                                Height
                            </Label>
                            <Input id={'widget' + this.props.widgetId + 'HeightFld'}
                                   type="text"
                                   placeholder="auto"
                                   onChange={(event) => {
                                       this.props.imageHeightChanged(event.target.value);
                                   }}
                                   value={widget.height}>
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>,
                <FormGroup key={'widget' + this.props.widgetId + 'Text'}>
                    <Label htmlFor={'widget' + this.props.widgetId + 'TextFld'}>
                        Alternate Text
                    </Label>
                    <Input id={'widget' + this.props.widgetId + 'TextFld'}
                           type="textarea"
                           placeholder="Enter image alternate text"
                           value={widget.text}
                           onChange={(event) => {
                               this.props.widgetTextChanged(event.target.value)
                           }}/>
                </FormGroup>]
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ImageWidgetForm);