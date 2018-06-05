let _singleton = Symbol();
const COURSE_API_URL = 'https://mmolisani-course-manager.herokuapp.com/api/course';

/**
 * Generic error callback that returns the error from the server as a JS error
 * @param data the error returned from the server
 */
function errorCallback(data) {
    console.log(data);
    throw new Error(data.message);
}

/**
 * Singleton class that contains methods for fetch requests to server for courses.
 */
export default class CourseServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new CourseServiceClient(_singleton);
        return this[_singleton]
    }

    /**
     * Returns all of the courses in the course table
     * @param callback
     * @returns {Promise<any>}
     */
    findAllCourses(callback) {
        return fetch(COURSE_API_URL)
            .then(function (response) {
                return response.json();
            }).then(callback);
    }

    /**
     * Returns the course with the given ID
     * @param courseId the course ID to find
     * @param callback
     * @returns {Promise<Response>}
     */
    findCourseById(courseId, callback) {
        return fetch(COURSE_API_URL + '/' + courseId)
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
     * Creates a new course
     * @param course the course to create
     * @param callback
     * @returns {Promise<any>}
     */
    createCourse(course, callback) {
        return fetch(COURSE_API_URL, {
            method: 'POST',
            body: JSON.stringify(course),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then(callback);
    }

    /**
     * Deletes a course by ID
     * @param courseId the course to delete
     * @param callback
     * @returns {Promise<Response>}
     */
    deleteCourse(courseId, callback) {
        return fetch(COURSE_API_URL + '/' + courseId, {
            method: 'DELETE'
        }).then(function (response) {
            if (response.ok) {
                return response.text().then(callback);
            }
            return response.json().then(errorCallback);
        });
    }

    /**
     * Updates a course
     * @param course the course to update (includes the ID)
     * @param callback
     * @returns {Promise<Response>}
     */
    updateCourse(course, callback) {
        return fetch(COURSE_API_URL, {
            method: 'PUT',
            body: JSON.stringify(course),
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