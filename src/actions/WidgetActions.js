import WidgetServiceClient from "../services/WidgetServiceClient";
import {
    ADD_WIDGET,
    ADD_WIDGET_CLASS,
    ADD_WIDGET_STYLE,
    CONDENSE_WIDGETS,
    DELETE_WIDGET,
    DELETE_WIDGET_CLASS,
    DELETE_WIDGET_STYLE,
    FIND_ALL_WIDGETS,
    HEADING_SIZE_CHANGED,
    IMAGE_CHANGED,
    IMAGE_HEIGHT_CHANGED,
    IMAGE_WIDTH_CHANGED,
    LINK_CHANGED,
    LIST_TYPE_CHANGED,
    MOVE_WIDGET,
    PREVIEW_WIDGETS,
    SAVE_WIDGETS,
    SELECT_WIDGET_TYPE,
    TOGGLE_WIDGET_EDIT,
    WIDGET_CLASS_CHANGED,
    WIDGET_NAME_CHANGED,
    WIDGET_STYLE_KEY_CHANGED,
    WIDGET_STYLE_VALUE_CHANGED,
    WIDGET_TEXT_CHANGED
} from "../constants/WidgetConstants";

const widgetService = WidgetServiceClient.instance;

export const addWidget = () => ({
    type: ADD_WIDGET
});

export const saveWidgets = lessonId => ({
    type: SAVE_WIDGETS,
    lessonId
});

export const deleteWidget = id => ({
    type: DELETE_WIDGET,
    id
});

export const findAllWidgetsForLesson = (dispatch, lessonId) => {
    widgetService.findAllWidgetsForLesson(lessonId,
        widgets => dispatch({
            type: FIND_ALL_WIDGETS,
            widgets: widgets.reduce((widgetsState, widget) => {
                widgetsState.byId[widget.id] = widget;
                widgetsState.allIds.push(widget.id);
                return widgetsState;
            }, {
                byId: {},
                allIds: []
            })
        }));
};

export const previewWidgets = () => ({
    type: PREVIEW_WIDGETS
});

export const selectWidgetType = (id, widgetType) => ({
    type: SELECT_WIDGET_TYPE,
    id,
    widgetType
});

export const widgetTextChanged = (id, text) => ({
    type: WIDGET_TEXT_CHANGED,
    id,
    text
});

export const headingSizeChanged = (id, size) => ({
    type: HEADING_SIZE_CHANGED,
    id,
    size
});

export const moveWidget = (id, position) => ({
    type: MOVE_WIDGET,
    id,
    position
});

export const widgetNameChanged = (id, name) => ({
    type: WIDGET_NAME_CHANGED,
    id,
    name
});

export const widgetClassChanged = (id, classToAdd) => ({
    type: WIDGET_CLASS_CHANGED,
    id,
    classToAdd
});

export const addWidgetClass = id => ({
    type: ADD_WIDGET_CLASS,
    id
});

export const deleteWidgetClass = (id, className) => ({
    type: DELETE_WIDGET_CLASS,
    id,
    className
});

export const widgetStyleKeyChanged = (id, styleKeyToAdd) => ({
    type: WIDGET_STYLE_KEY_CHANGED,
    id,
    styleKeyToAdd
});

export const widgetStyleValueChanged = (id, styleValueToAdd) => ({
    type: WIDGET_STYLE_VALUE_CHANGED,
    id,
    styleValueToAdd
});

export const addWidgetStyle = id => ({
    type: ADD_WIDGET_STYLE,
    id
});

export const deleteWidgetStyle = (id, styleKey) => ({
    type: DELETE_WIDGET_STYLE,
    id,
    styleKey
});

export const toggleWidgetEdit = (id) => ({
    type: TOGGLE_WIDGET_EDIT,
    id
});

export const condenseWidgets = () => ({
    type: CONDENSE_WIDGETS
});

export const linkChanged = (id, link) => ({
    type: LINK_CHANGED,
    id,
    link
});

export const imageChanged = (id, image) => ({
    type: IMAGE_CHANGED,
    id,
    image
});

export const imageWidthChanged = (id, width) => ({
    type: IMAGE_WIDTH_CHANGED,
    id,
    width
});

export const imageHeightChanged = (id, height) => ({
    type: IMAGE_HEIGHT_CHANGED,
    id,
    height
});

export const listTypeChanged = (id, listType) => ({
    type: LIST_TYPE_CHANGED,
    id,
    listType
});