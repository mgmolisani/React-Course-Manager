let _singleton = Symbol();
const MODULE_API_URL = 'https://mmolisani-course-manager.herokuapp.com/api/module';
const MODULE_BY_COURSE_API_URL = 'https://mmolisani-course-manager.herokuapp.com/api/course/CID/module';

/**
 * Generic error callback that returns the error from the server as a JS error
 * @param data the error returned from the server
 */
function errorCallback(data) {
    console.log(data);
    throw new Error(data.message);
}

/**
 * Singleton class that contains methods for fetch requests to server for modules.
 */
export default class ModuleServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new ModuleServiceClient(_singleton);
        return this[_singleton]
    }

    /**
     * Returns all of the modules in the module table
     * @param callback
     * @returns {Promise<any>}
     */
    findAllModules(callback) {
        return fetch(MODULE_API_URL)
            .then(function (response) {
                return response.json();
            }).then(callback);
    }

    /**
     * Returns the module with the given ID
     * @param moduleId
     * @param callback
     * @returns {Promise<Response>}
     */
    findModuleById(moduleId, callback) {
        return fetch(MODULE_API_URL + '/' + moduleId)
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
     * Returns all modules for a given course.
     * @param courseId the course to find modules for
     * @param callback
     * @returns {Promise<Response>}
     */
    findAllModulesForCourse(courseId, callback) {
        return fetch(MODULE_BY_COURSE_API_URL
            .replace('CID', courseId))
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
     * Create a new module for a given course
     * @param courseId the course to add the module to
     * @param module the module to create
     * @param callback
     * @returns {Promise<any>}
     */
    createModule(courseId, module, callback) {
        return fetch(MODULE_BY_COURSE_API_URL
            .replace('CID', courseId), {
            method: 'POST',
            body: JSON.stringify(module),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            return response.json();
        }).then(callback);
    }

    /**
     * Deletes a module by ID
     * @param moduleId the module to delete
     * @param callback
     * @returns {Promise<Response>}
     */
    deleteModule(moduleId, callback) {
        return fetch(MODULE_API_URL + '/' + moduleId, {
            method: 'DELETE',
        }).then(function (response) {
            if (response.ok) {
                return response.text().then(callback);
            }
            return response.json().then(errorCallback);
        });
    }

    /**
     * Updates a module
     * @param module the module to update (includes the ID)
     * @param callback
     * @returns {Promise<Response>}
     */
    updateModule(module, callback) {
        return fetch(MODULE_API_URL, {
            method: 'PUT',
            body: JSON.stringify(module),
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