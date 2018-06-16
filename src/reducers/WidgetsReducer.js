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

const sortWidgets = (state) => {
    return function(a, b) {
        return (state.byId[a].position - state.byId[b].position)
    }
};

const widgetsReducer = (state = {
                            byId: {},
                            allIds: []
                        },
                        action) => {
    switch (action.type) {
        case ADD_WIDGET:
            let id = Date.now();
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [id]:
                        {
                            id,
                            text: '',
                            widgetType: 'Paragraph',
                            position: state.allIds.length,
                            size: 2,
                            name: 'New Widget',
                            className: [],
                            style: {}
                        }
                },
                allIds: [...state.allIds, id]
            };
        case DELETE_WIDGET:
            return {
                ...state,
                byId: state.allIds.reduce((widgets, key) => {
                    if (key !== action.id) {
                        widgets[key] = state.byId[key];
                    }
                    return widgets;
                }, {}),
                allIds: state.allIds.filter(id => (id !== action.id))
            };
        case FIND_ALL_WIDGETS:
            return action.widgets;
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
                .saveAllWidgets(state, widgets => {
                    alert(widgets);
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
                return {
                    ...state,
                    byId: state.allIds.reduce((widgets, key) => {
                        let widget = state.byId[key];
                        if (direction > 0
                            && widget.position >= targetPosition
                            && widget.position < sourcePosition) {
                            widget.position += 1;
                        } else if (direction < 0
                            && widget.position <= targetPosition
                            && widget.position > sourcePosition) {
                            widget.position -= 1;
                        } else if (widget.position === sourcePosition) {
                            widget.position = targetPosition;
                        }
                        return {
                            ...widgets,
                            [key]: widget
                        };
                    }, {}),
                    allIds: [...state.allIds].sort(sortWidgets(state))
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
                                className: [...widget.className, widget.className],
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
                        style: state.byId[action.id].style.reduce((styles, key) => {
                            if (key !== action.styleKey) {
                                styles[key] = state.byId[action.id].style[key];
                            }
                        }, {}),
                    }
                }
            };
        default:
            return state
    }
};

const previewReducer = (state = false, action) => {
    switch (action.type) {
        case PREVIEW_WIDGETS:
            return !state;
        default:
            return state;
    }
};

const editReducer = (state = null, action) => {
    switch (action.type) {
        case TOGGLE_WIDGET_EDIT:
            return state ? null : action.id;
        default:
            return state;
    }
};

const condenseReducer = (state = false, action) => {
    switch (action.type) {
        case CONDENSE_WIDGETS:
            return !state;
        default:
            return state;
    }
};

export const reducer = combineReducers({
    widgets: widgetsReducer,
    previewWidgetsFlag: previewReducer,
    widgetToEdit: editReducer,
    condenseWidgetsFlag: condenseReducer
});