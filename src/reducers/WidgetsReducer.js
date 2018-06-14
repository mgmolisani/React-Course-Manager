import {
    ADD_WIDGET,
    ADD_WIDGET_CLASS,
    ADD_WIDGET_STYLE,
    DELETE_WIDGET,
    DELETE_WIDGET_CLASS,
    DELETE_WIDGET_STYLE,
    FIND_ALL_WIDGETS,
    HEADING_SIZE_CHANGED,
    MOVE_WIDGET_DOWN,
    MOVE_WIDGET_UP,
    PREVIEW_WIDGETS,
    SAVE_WIDGETS,
    SELECT_WIDGET_TYPE, TOGGLE_WIDGET_EDIT,
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

const widgetsReducer = (state = [], action) => {
    let widgets = null;
    switch (action.type) {
        case ADD_WIDGET:
            return [...state,
                {
                    id: Date.now(),
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
            ];
        case DELETE_WIDGET:
            return (() => {
                let widgets = [...state];
                let index = state.findIndex(widget => (widget.id === action.id));
                widgets.splice(index, 1);
                for (let i = index; i < widgets.length; i++) {
                    widgets[i].position -= 1;
                }
                return widgets;
            })();
        case FIND_ALL_WIDGETS:
            return action.widgets;
        case HEADING_SIZE_CHANGED:
            return state.map(widget => {
                if (widget.id === action.id) {
                    widget.size = action.size;
                }
                return widget;
            });
        case WIDGET_TEXT_CHANGED:
            return state.map(widget => {
                if (widget.id === action.id) {
                    widget.text = action.text;
                }
                return widget;
            });
        case SAVE_WIDGETS:
            widgetService
                .saveAllWidgets(state, widgets => {
                    alert(widgets);
                });
            return state;
        case SELECT_WIDGET_TYPE:
            return state.map(widget => {
                if (widget.id === action.id) {
                    widget.widgetType = action.widgetType;
                }
                return widget;
            });
        case MOVE_WIDGET_UP:
            widgets = [...state];
            for (let i = 1; i < widgets.length; i++) {
                if (widgets[i].id === action.id) {
                    let tempPosition = widgets[i].position;
                    widgets[i].position =  widgets[i - 1].position;
                    widgets[i - 1].position = tempPosition;
                }
            }
            return widgets.sort(compareWidgets);
        case MOVE_WIDGET_DOWN:
            widgets = [...state];
            for (let i = 0; i < widgets.length - 1; i++) {
                if (widgets[i].id === action.id) {
                    let tempPosition = widgets[i].position;
                    widgets[i].position =  widgets[i + 1].position;
                    widgets[i + 1].position = tempPosition;
                }
            }
            return widgets.sort(compareWidgets);
        case WIDGET_NAME_CHANGED:
            return state.map(widget => {
                if (widget.id === action.id) {
                    widget.name = action.name;
                }
                return widget;
            });
        case WIDGET_CLASS_CHANGED:
            return state.map(widget => {
                if (widget.id === action.id) {
                    widget.classToAdd = action.className;
                }
                return widget;
            });
        case ADD_WIDGET_CLASS:
            return state.map(widget => {
                if (widget.id === action.id
                    && widget.classToAdd
                    && !widget.className.includes(widget.classToAdd)) {
                    widget.className.push(widget.classToAdd);
                    widget.classToAdd = '';
                }
                return widget;
            });
        case DELETE_WIDGET_CLASS:
            return state.map(widget => {
                if (widget.id === action.id) {
                    widget.className = widget.className.filter((className) => (
                        className !== action.className
                    ));
                }
                return widget;
            });
        case WIDGET_STYLE_KEY_CHANGED:
            return state.map(widget => {
                if (widget.id === action.id) {
                    widget.styleKeyToAdd = action.styleKey
                }
                return widget;
            });
        case WIDGET_STYLE_VALUE_CHANGED:
            return state.map(widget => {
                if (widget.id === action.id) {
                    widget.styleValueToAdd = action.styleValue
                }
                return widget;
            });
        case ADD_WIDGET_STYLE:
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
        case DELETE_WIDGET_STYLE:
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

export const reducer = combineReducers({
    widgets: widgetsReducer,
    previewWidgetsFlag: previewReducer,
    widgetToEdit: editReducer
});