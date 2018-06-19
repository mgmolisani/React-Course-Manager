import {
    ADD_WIDGET,
    ADD_WIDGET_CLASS,
    ADD_WIDGET_STYLE,
    CONDENSE_WIDGETS,
    DELETE_WIDGET,
    DELETE_WIDGET_CLASS,
    DELETE_WIDGET_STYLE,
    FIND_ALL_WIDGETS,
    HEADING_SIZE_CHANGED, IMAGE_CHANGED, IMAGE_HEIGHT_CHANGED, IMAGE_WIDTH_CHANGED, LINK_CHANGED, LIST_TYPE_CHANGED,
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
import widgetServiceClient from "../services/WidgetServiceClient";
import {combineReducers} from "redux";

const widgetService = widgetServiceClient.instance;

const sortWidgets = (widgets) => {
    return function (a, b) {
        return (widgets[a].position - widgets[b].position)
    }
};

/**
 * Reducer for the widgets state
 * @param state
 * @param action
 * @returns {*}
 */
const widgetsReducer = (state = {
                            byId: {},
                            allIds: []
                        },
                        action) => {
    switch (action.type) {
        case ADD_WIDGET:
            let id = Date.now() / 1000;
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [id]:
                        {
                            id,
                            text: '',
                            widgetType: 'Heading',
                            position: state.allIds.length,
                            size: 1,
                            name: 'New Widget',
                            className: [],
                            style: {},
                            link: '',
                            image: '',
                            width: '',
                            height: '',
                            listType: 'Ordered'
                        }
                },
                allIds: [...state.allIds, id]
            };
        case DELETE_WIDGET:
            return {
                ...state,
                byId: state.allIds.reduce((widgets, key) => {
                    let widget = {
                        ...state.byId[key]
                    };
                    if (key !== action.id) {
                        if (widget.position > state.byId[action.id].position) {
                            widget.position -= 1;
                        }
                        widgets[key] = widget;
                    }
                    return widgets;
                }, {}),
                allIds: state.allIds.filter(id => (id !== action.id))
            };
        case FIND_ALL_WIDGETS:
            return {
                byId: {...action.widgets.byId},
                allIds: [...action.widgets.allIds]
                    .sort(sortWidgets(action.widgets.byId))
            };
        case HEADING_SIZE_CHANGED:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.id]: {
                        ...state.byId[action.id],
                        size: action.size
                    }
                }
            };
        case WIDGET_TEXT_CHANGED:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.id]: {
                        ...state.byId[action.id],
                        text: action.text
                    }
                }
            };
        case SAVE_WIDGETS:
            widgetService
                .saveAllWidgets(state.allIds.reduce((widgets, key) => {
                    widgets.push(state.byId[key]);
                    return widgets;
                }, []),
                    action.lessonId,
                    () => {
                    alert("Widgets have been saved!");
                });
            return state;
        case SELECT_WIDGET_TYPE:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.id]: {
                        ...state.byId[action.id],
                        widgetType: action.widgetType
                    }
                }
            };
        case MOVE_WIDGET:
            return (() => {
                let sourceWidget = state.byId[action.id];
                let sourcePosition = sourceWidget.position;
                let targetPosition = action.position;
                let direction = sourcePosition - targetPosition;
                let widgets = state.allIds.reduce((widgets, key) => {
                    let widget = {
                        ...state.byId[key]
                    };
                    let position = widget.position;
                    if (direction > 0
                        && position >= targetPosition
                        && position < sourcePosition) {
                        widget.position += 1;
                    } else if (direction < 0
                        && position <= targetPosition
                        && position > sourcePosition) {
                        widget.position -= 1;
                    } else if (position === sourcePosition) {
                        widget.position = targetPosition;
                    }
                    return {
                        ...widgets,
                        [key]: widget
                    };
                }, {});
                return {
                    ...state,
                    byId: widgets,
                    allIds: [...state.allIds].sort(sortWidgets(widgets))
                };
            })();
        case WIDGET_NAME_CHANGED:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.id]: {
                        ...state.byId[action.id],
                        name: action.name
                    }
                }
            };
        case WIDGET_CLASS_CHANGED:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.id]: {
                        ...state.byId[action.id],
                        classToAdd: action.classToAdd
                    }
                }
            };
        case ADD_WIDGET_CLASS:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.id]: (() => {
                        const widget = {...state.byId[action.id]};
                        if (!widget.className.includes(widget.classToAdd)) {
                            return {
                                ...widget,
                                className: [...widget.className, widget.classToAdd],
                                classToAdd: ''
                            };
                        }
                        return {...widget};
                    })()
                }
            };
        case DELETE_WIDGET_CLASS:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.id]: {
                        ...state.byId[action.id],
                        className: state.byId[action.id].className.filter((className) => (
                            className !== action.className
                        ))
                    }
                }
            };
        case WIDGET_STYLE_KEY_CHANGED:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.id]: {
                        ...state.byId[action.id],
                        styleKeyToAdd: action.styleKeyToAdd
                    }
                }
            };
        case WIDGET_STYLE_VALUE_CHANGED:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.id]: {
                        ...state.byId[action.id],
                        styleValueToAdd: action.styleValueToAdd
                    }
                }
            };
        case ADD_WIDGET_STYLE:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.id]: (() => {
                        const widget = {...state.byId[action.id]};
                        if (widget.styleKeyToAdd
                            && widget.styleValueToAdd) {
                            return {
                                ...widget,
                                style: {
                                    ...widget.style,
                                    [widget.styleKeyToAdd]: widget.styleValueToAdd
                                },
                                styleKeyToAdd: '',
                                styleValueToAdd: ''
                            };
                        }
                        return {...widget};
                    })()
                }
            };
        case DELETE_WIDGET_STYLE:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.id]: {
                        ...state.byId[action.id],
                        style: Object.keys(state.byId[action.id].style).reduce((styles, key) => {
                            if (key !== action.styleKey) {
                                styles[key] = state.byId[action.id].style[key];
                            }
                            return styles;
                        }, {}),
                    }
                }
            };
        case LINK_CHANGED:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.id]: {
                        ...state.byId[action.id],
                        link: action.link
                    }
                }
            };
        case IMAGE_CHANGED:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.id]: {
                        ...state.byId[action.id],
                        image: action.image
                    }
                }
            };
        case IMAGE_WIDTH_CHANGED:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.id]: {
                        ...state.byId[action.id],
                        width: action.width
                    }
                }
            };
        case IMAGE_HEIGHT_CHANGED:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.id]: {
                        ...state.byId[action.id],
                        height: action.height
                    }
                }
            };
        case LIST_TYPE_CHANGED:
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.id]: {
                        ...state.byId[action.id],
                        listType: action.listType
                    }
                }
            };
        default:
            return state
    }
};

/**
 * Reducer for the preview state
 * @param state
 * @param action
 * @returns {boolean}
 */
const previewReducer = (state = false, action) => {
    switch (action.type) {
        case PREVIEW_WIDGETS:
            return !state;
        default:
            return state;
    }
};

/**
 * Reducer for the edit state
 * @param state
 * @param action
 * @returns {*}
 */
const editReducer = (state = null, action) => {
    switch (action.type) {
        case TOGGLE_WIDGET_EDIT:
            return state ? null : action.id;
        default:
            return state;
    }
};

/**
 * Reducer for condense state for easier drag and drop
 * @param state
 * @param action
 * @returns {boolean}
 */
const condenseReducer = (state = false, action) => {
    switch (action.type) {
        case CONDENSE_WIDGETS:
            return !state;
        default:
            return state;
    }
};

/**
 * Combination of all reducers
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */
export const reducer = combineReducers({
    widgets: widgetsReducer,
    previewWidgetsFlag: previewReducer,
    widgetToEdit: editReducer,
    condenseWidgetsFlag: condenseReducer
});