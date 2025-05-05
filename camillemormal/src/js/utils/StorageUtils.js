/**
 * StorageUtils class provides utility methods for handling storage operations
 */
class StorageUtils {
    /**
     * Sets an item in localStorage
     * @param {string} key - The key to store
     * @param {any} value - The value to store
     * @param {boolean} stringify - Whether to stringify the value
     */
    static setLocal(key, value, stringify = true) {
        try {
            const storageValue = stringify ? JSON.stringify(value) : value;
            localStorage.setItem(key, storageValue);
        } catch (error) {
            console.error('Error setting localStorage item:', error);
        }
    }

    /**
     * Gets an item from localStorage
     * @param {string} key - The key to retrieve
     * @param {boolean} parse - Whether to parse the value
     * @returns {any} The stored value
     */
    static getLocal(key, parse = true) {
        try {
            const value = localStorage.getItem(key);
            return parse ? JSON.parse(value) : value;
        } catch (error) {
            console.error('Error getting localStorage item:', error);
            return null;
        }
    }

    /**
     * Removes an item from localStorage
     * @param {string} key - The key to remove
     */
    static removeLocal(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing localStorage item:', error);
        }
    }

    /**
     * Clears all items from localStorage
     */
    static clearLocal() {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('Error clearing localStorage:', error);
        }
    }

    /**
     * Sets an item in sessionStorage
     * @param {string} key - The key to store
     * @param {any} value - The value to store
     * @param {boolean} stringify - Whether to stringify the value
     */
    static setSession(key, value, stringify = true) {
        try {
            const storageValue = stringify ? JSON.stringify(value) : value;
            sessionStorage.setItem(key, storageValue);
        } catch (error) {
            console.error('Error setting sessionStorage item:', error);
        }
    }

    /**
     * Gets an item from sessionStorage
     * @param {string} key - The key to retrieve
     * @param {boolean} parse - Whether to parse the value
     * @returns {any} The stored value
     */
    static getSession(key, parse = true) {
        try {
            const value = sessionStorage.getItem(key);
            return parse ? JSON.parse(value) : value;
        } catch (error) {
            console.error('Error getting sessionStorage item:', error);
            return null;
        }
    }

    /**
     * Removes an item from sessionStorage
     * @param {string} key - The key to remove
     */
    static removeSession(key) {
        try {
            sessionStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing sessionStorage item:', error);
        }
    }

    /**
     * Clears all items from sessionStorage
     */
    static clearSession() {
        try {
            sessionStorage.clear();
        } catch (error) {
            console.error('Error clearing sessionStorage:', error);
        }
    }

    /**
     * Checks if storage is available
     * @param {string} type - The type of storage to check ('local' or 'session')
     * @returns {boolean} Whether storage is available
     */
    static isStorageAvailable(type) {
        let storage;
        try {
            storage = window[`${type}Storage`];
            const x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        } catch (e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                (storage && storage.length !== 0);
        }
    }

    /**
     * Gets the remaining storage space
     * @param {string} type - The type of storage to check ('local' or 'session')
     * @returns {number} The remaining storage space in bytes
     */
    static getRemainingSpace(type) {
        try {
            const storage = window[`${type}Storage`];
            let data = '';
            // Fill storage with data until it's full
            while (true) {
                try {
                    data += 'a';
                    storage.setItem('test', data);
                } catch (e) {
                    break;
                }
            }
            storage.removeItem('test');
            return data.length;
        } catch (error) {
            console.error('Error getting remaining storage space:', error);
            return 0;
        }
    }

    /**
     * Gets all keys from storage
     * @param {string} type - The type of storage to check ('local' or 'session')
     * @returns {Array} Array of storage keys
     */
    static getAllKeys(type) {
        try {
            const storage = window[`${type}Storage`];
            return Object.keys(storage);
        } catch (error) {
            console.error('Error getting storage keys:', error);
            return [];
        }
    }

    /**
     * Gets all items from storage
     * @param {string} type - The type of storage to check ('local' or 'session')
     * @returns {Object} Object containing all storage items
     */
    static getAllItems(type) {
        try {
            const storage = window[`${type}Storage`];
            const items = {};
            Object.keys(storage).forEach(key => {
                items[key] = this.getSession(key);
            });
            return items;
        } catch (error) {
            console.error('Error getting storage items:', error);
            return {};
        }
    }
}

export default StorageUtils; 