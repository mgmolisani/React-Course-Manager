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

const compareWidgets = (a, b) => (a.position - b.position);

const widgetsReducer = (state = {}, action) => {
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
                            position: state.length,
                            size: 2,
                            name: 'New Widget',
                            className: [],
                            style: {
                                keys: [],
                                values: []
                            }
                        }
                },
                allIds: [...state.allIds, id]
            };
        case DELETE_WIDGET:
            return {
                ...state,
                byId: state.allIds.reduce((ids, key) => {
                        if (key !== action.id) {
                            ids[key] = state.byId[key];
                        }
                        return byId;
                    }, {}),
                allIds: state.allIds.filter(id => (id !== action.id))
            };
        case FIND_ALL_WIDGETS:
            return action.widgets;
        case HEADING_SIZE_CHANGED:
            return {
                ...state,
                byId: {
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
                    [action.id]: {
                        ...state.byId[action.id],
                        widgetType: action.widgetType
                    }
                }
            };
        case MOVE_WIDGET:
            return (() => {
                let sourceWidget = state.find(widget => (widget.id === action.id));
                let sourcePosition = sourceWidget.position;
                let targetPosition = action.position;
                let direction = sourcePosition - targetPosition;
                let widgets = state.map((widget) => {
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
                    return widget;
                });
                return widgets.sort(compareWidgets);
            })();
        case WIDGET_NAME_CHANGED:
            return {
                ...state,
                byId: {
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
                    [action.id]: {
                        ...state.byId[action.id],
                        className: state.byId[action.id].className.filter((className) => (
                            className !== action.className
                        ))
                    }
                }
            };
        case
        WIDGET_STYLE_KEY_CHANGED:
            return state.map(widget => {
                if (widget.id === action.id) {
                    widget.styleKeyToAdd = action.styleKey
                }
                return widget;
            });
        case
        WIDGET_STYLE_VALUE_CHANGED:
            return state.map(widget => {
                if (widget.id === action.id) {
                    widget.styleValueToAdd = action.styleValue
                }
                return widget;
            });
        case
        ADD_WIDGET_STYLE:
            return state.map(widget => {
                if (widget.id === action.id
                    && widget.styleKeyToAdd
                    && widget.styleValueToAdd) {
                    (() => {
                        let index = widget.style.keys.indexOf(widget.styleKeyToAdd)
                        if (index === -1) {
                            widget.style.keys.push(widget.styleKeyToAdd);
                            widget.style.values.push(widget.styleValueToAdd);
                        } else {
                            widget.style.values.splice(index, 1, widget.styleValueToAdd);
                        }
                        widget.styleKeyToAdd = '';
                        widget.styleValueToAdd = '';
                    })();
                }
                return widget;
            });
        case
        DELETE_WIDGET_STYLE:
            return state.map(widget => {
                if (widget.id === action.id) {
                    (() => {
                        let index = widget.style.keys.indexOf(action.styleKey);
                        widget.style.keys.splice(index, 1);
                        widget.style.values.splice(index, 1);
                    })();
                }
                return widget;
            });
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