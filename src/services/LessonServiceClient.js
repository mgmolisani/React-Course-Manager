let _singleton = Symbol();
const LESSON_API_URL = 'https://mmolisani-course-manager.herokuapp.com/api/lesson';
const LESSON_BY_COURSE_API_URL = 'https://mmolisani-course-manager.herokuapp.com/api/course/CID/module/MID/lesson';

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
export default class LessonServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new LessonServiceClient(_singleton);
        return this[_singleton]
    }

    /**
     * Finds all lessons from the lesson table.
     * @param callback
     * @returns {Promise<any>}
     */
    findAllLessons(callback) {
        return fetch(LESSON_API_URL)
            .then(function (response) {
                return response.json();
            }).then(callback);
    }

    /**
     * Find a lesson by its ID
     * @param lessonId the lesson to find
     * @param callback
     * @returns {Promise<Response>}
     */
    findLessonById(lessonId, callback) {
        return fetch(LESSON_API_URL + '/' + lessonId)
            .then(function (response) {
                    let responseJson = response.json();
                    if (response.ok) {
                        return responseJson.then(callback);
                    }
                    return responseJson.then(errorCallback);
                }
            );
    }

    /**
     * Finds all lessons for a module
     * @param courseId the course ID of the module
     * @param moduleId the module to find the lessons for
     * @param callback
     * @returns {Promise<Response>}
     */
    findAllLessonsForModule(courseId, moduleId, callback) {
        return fetch(LESSON_BY_COURSE_API_URL
            .replace('CID', courseId)
            .replace('MID', moduleId))
            .then(function (response) {
                let responseJson = response.json();
                if (response.ok) {
                    return responseJson.then(callback);
                }
                return responseJson.then(errorCallback);
            }
        );
    }

    /**
     * Creates a new lesson for a module
     * @param courseId the course id of the module
     * @param moduleId the module id
     * @param lesson the lesson to create
     * @param callback
     * @returns {Promise<any>}
     */
    createLesson(courseId, moduleId, lesson, callback) {
        return fetch(LESSON_BY_COURSE_API_URL
            .replace('CID', courseId)
            .replace('MID', moduleId), {
            method: 'POST',
            body: JSON.stringify(lesson),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then(callback);
    }

    /**
     * Deletes a lesson by ID
     * @param lessonId the lesson to delete
     * @param callback
     * @returns {Promise<Response>}
     */
    deleteLesson(lessonId, callback) {
        return fetch(LESSON_API_URL + '/' + lessonId, {
            method: 'DELETE',
        }).then(function (response) {
            if (response.ok) {
                return response.text().then(callback);
            }
            return response.json().then(errorCallback);
        });
    }

    /**
     * Updates a lesson
     * @param lesson the lesson to update (includes ID)
     * @param callback
     * @returns {Promise<Response>}
     */
    updateLesson(lesson, callback) {
        return fetch(LESSON_API_URL, {
            method: 'PUT',
            body: JSON.stringify(lesson),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
                let responseJson = response.json();
                if (response.ok) {
                    return responseJson.then(callback);
                }
                return responseJson.then(errorCallback);
            }
        );
    }
}