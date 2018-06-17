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


    findAllWidgets(callback) {
        return {
            byId: {
                1:
                    {
                        id: 1,
                        text: '',
                        widgetType: 'Paragraph',
                        position: 0,
                        size: 2,
                        name: '1',
                        className: [],
                        style: {}
                    },
                2:
                    {
                        id: 2,
                        text: '',
                        widgetType: 'Paragraph',
                        position: 1,
                        size: 2,
                        name: '2',
                        className: [],
                        style: {}
                    },
                3:
                    {
                        id: 3,
                        text: '',
                        widgetType: 'Paragraph',
                        position: 2,
                        size: 2,
                        name: '3',
                        className: [],
                        style: {}
                    }
            },
            allIds: [1, 2, 3]
        }
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