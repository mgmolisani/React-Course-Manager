let _singleton = Symbol();
const WIDGET_API_URL = 'http://localhost:3000/api/lesson';
const WIDGET_BY_LESSON_API_URL = 'http://localhost:3000/api/lesson/LID';

/**
 * Generic error callback that returns the error from the server as a JS error
 * @param data the error returned from the server
 */
function errorCallback(data) {
    console.log(data);
    throw new Error(data.message);
}

/**
 * Singleton class that contains methods for fetch requests to server for lessons.
 */
export default class WidgetServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new WidgetServiceClient(_singleton);
        return this[_singleton]
    }

    /**
     * Finds all widgets from the widget table.
     * @param callback
     * @returns {Promise<any>}
     */
    findAllWidgets(callback) {
        return [
            {
                id: 1,
                widgetType: 'Paragraph',
                position: 0,
                text: 'hi',
                size: 1,
                name: 'graphyboy',
                className: [],
                style: {
                    keys: [],
                    values: []
                }
            },
            {
                id: 2,
                widgetType: 'Heading',
                position: 1,
                text: 'yo',
                size: 2,
                name: 'Heading',
                className: [],
                style: {
                    keys: [],
                    values: []
                }
            }
        ];
        /*return fetch(LESSON_API_URL)
            .then(function (response) {
                return response.json();
            }).then(callback);*/
        //SORT THIS SHIT HERE OR IN CALLBACK (PROBS IN CALLBACK)
    }

    saveAllWidgets(widgets, callback) {
        return widgets;
    }
}