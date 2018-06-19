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

/**
 * Adds a widget
 * @returns {{type: string}}
 */
export const addWidget = () => ({
    type: ADD_WIDGET
});

/**
 * Saves the widgets
 * @param lessonId
 * @returns {{type: string, lessonId: *}}
 */
export const saveWidgets = lessonId => ({
    type: SAVE_WIDGETS,
    lessonId
});

/**
 * deletes the widgets
 * @param id
 * @returns {{type: string, id: *}}
 */
export const deleteWidget = id => ({
    type: DELETE_WIDGET,
    id
});

/**
 * Finds the lessons widgets
 * @param dispatch
 * @param lessonId
 */
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

/**
 * Toggles the preview state
 * @returns {{type: string}}
 */
export const previewWidgets = () => ({
    type: PREVIEW_WIDGETS
});

/**
 * Changes the widget type
 * @param id
 * @param widgetType
 * @returns {{type: string, id: *, widgetType: *}}
 */
export const selectWidgetType = (id, widgetType) => ({
    type: SELECT_WIDGET_TYPE,
    id,
    widgetType
});

/**
 * sees when the widget text changes
 * @param id
 * @param text
 * @returns {{type: string, id: *, text: *}}
 */
export const widgetTextChanged = (id, text) => ({
    type: WIDGET_TEXT_CHANGED,
    id,
    text
});

/**
 * Sees when the heading size changes
 * @param id
 * @param size
 * @returns {{type: string, id: *, size: *}}
 */
export const headingSizeChanged = (id, size) => ({
    type: HEADING_SIZE_CHANGED,
    id,
    size
});

/**
 * Generic move of the widget
 * @param id
 * @param position new position
 * @returns {{type: string, id: *, position: *}}
 */
export const moveWidget = (id, position) => ({
    type: MOVE_WIDGET,
    id,
    position
});

/**
 * sees the widget name changes
 * @param id
 * @param name
 * @returns {{type: string, id: *, name: *}}
 */
export const widgetNameChanged = (id, name) => ({
    type: WIDGET_NAME_CHANGED,
    id,
    name
});

/**
 * sees when the widgets class to add changes
 * @param id
 * @param classToAdd
 * @returns {{type: string, id: *, classToAdd: *}}
 */
export const widgetClassChanged = (id, classToAdd) => ({
    type: WIDGET_CLASS_CHANGED,
    id,
    classToAdd
});

/**
 * Adds a new class
 * @param id
 * @returns {{type: string, id: *}}
 */
export const addWidgetClass = id => ({
    type: ADD_WIDGET_CLASS,
    id
});

/**
 * Deletes an existing class
 * @param id
 * @param className
 * @returns {{type: string, id: *, className: *}}
 */
export const deleteWidgetClass = (id, className) => ({
    type: DELETE_WIDGET_CLASS,
    id,
    className
});

/**
 * Sees when the new styles key changes
 *
 * @param id
 * @param styleKeyToAdd
 * @returns {{type: string, id: *, styleKeyToAdd: *}}
 */
export const widgetStyleKeyChanged = (id, styleKeyToAdd) => ({
    type: WIDGET_STYLE_KEY_CHANGED,
    id,
    styleKeyToAdd
});

/**
 * Sees when the new styles value changes
 * @param id
 * @param styleValueToAdd
 * @returns {{type: string, id: *, styleValueToAdd: *}}
 */
export const widgetStyleValueChanged = (id, styleValueToAdd) => ({
    type: WIDGET_STYLE_VALUE_CHANGED,
    id,
    styleValueToAdd
});

/**
 * Adds the new style if it is valid
 * @param id
 * @returns {{type: string, id: *}}
 */
export const addWidgetStyle = id => ({
    type: ADD_WIDGET_STYLE,
    id
});

/**
 * Deletes an existing style
 * @param id
 * @param styleKey
 * @returns {{type: string, id: *, styleKey: *}}
 */
export const deleteWidgetStyle = (id, styleKey) => ({
    type: DELETE_WIDGET_STYLE,
    id,
    styleKey
});

/**
 * Toggles a widgets edit state
 * @param id
 * @returns {{type: string, id: *}}
 */
export const toggleWidgetEdit = (id) => ({
    type: TOGGLE_WIDGET_EDIT,
    id
});

/**
 * Condenses the widgets for easier drag and drop
 * @returns {{type: string}}
 */
export const condenseWidgets = () => ({
    type: CONDENSE_WIDGETS
});

/**
 * Changes a widgets link
 * @param id
 * @param link
 * @returns {{type: string, id: *, link: *}}
 */
export const linkChanged = (id, link) => ({
    type: LINK_CHANGED,
    id,
    link
});

/**
 * Changes a widgets image
 * @param id
 * @param image
 * @returns {{type: string, id: *, image: *}}
 */
export const imageChanged = (id, image) => ({
    type: IMAGE_CHANGED,
    id,
    image
});

/**
 * Represents an images width (width of other less common widgets can be set with styles)
 * @param id
 * @param width
 * @returns {{type: string, id: *, width: *}}
 */
export const imageWidthChanged = (id, width) => ({
    type: IMAGE_WIDTH_CHANGED,
    id,
    width
});

/**
 * Represents an images height (height of other less common widgets can be set with styles)
 * @param id
 * @param height
 * @returns {{type: string, id: *, height: *}}
 */
export const imageHeightChanged = (id, height) => ({
    type: IMAGE_HEIGHT_CHANGED,
    id,
    height
});

/**
 * Changes the listtype
 * @param id
 * @param listType
 * @returns {{type: string, id: *, listType: *}}
 */
export const listTypeChanged = (id, listType) => ({
    type: LIST_TYPE_CHANGED,
    id,
    listType
});