let _singleton = Symbol();
const WIDGET_API_URL = 'http://localhost:8080/api/widget';
const WIDGET_BY_LESSON_API_URL = 'http://localhost:8080/api/lesson/LID/widget';

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


    findAllWidgetsForLesson(lessonId, callback) {
        return fetch(WIDGET_BY_LESSON_API_URL
            .replace('LID', lessonId))
            .then(function (response) {
                let responseJson = response.json();
                if (response.ok) {
                    return responseJson.then(callback);
                }
                return responseJson.then(errorCallback);
            });
    }

    saveAllWidgets(widgets, lessonId, callback) {
        return fetch(WIDGET_BY_LESSON_API_URL
            .replace('LID', lessonId)
            + '/save', {
            method: 'POST',
            body: JSON.stringify(widgets),
            headers: {
                'content-type': 'application/json'
            }
        }).then(function (response) {
            if (response.ok) {
                return response.text().then(callback);
            }
            return response.json().then(errorCallback);
        });
    }
}