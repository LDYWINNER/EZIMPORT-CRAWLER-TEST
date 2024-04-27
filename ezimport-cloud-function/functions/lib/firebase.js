"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = exports.db = exports.app = void 0;
const app_1 = require("firebase/app");
const firestore_1 = require("firebase/firestore");
// import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    projectId: process.env.FB_PROJECT_ID,
    storageBucket: process.env.FB_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
    appId: process.env.FB_APP_ID,
    measurementId: process.env.FB_MEASUREMENT_ID,
};
try {
    exports.app = (0, app_1.getApp)("app");
}
catch (e) {
    exports.app = (0, app_1.initializeApp)(firebaseConfig, "app");
}
// const analytics = getAnalytics(app);
exports.db = (0, firestore_1.getFirestore)(exports.app);
class Database {
    constructor(db) {
        this.db = db;
    }
    async addData(collections, createData) {
        return (0, firestore_1.addDoc)((0, firestore_1.collection)(this.db, collections), createData);
    }
    async getData(collections, key, value) {
        const querySnapshot = await (0, firestore_1.getDocs)((0, firestore_1.query)((0, firestore_1.collection)(exports.db, collections), (0, firestore_1.where)(key, "==", value)));
        let result = [];
        querySnapshot.forEach((doc) => {
            result.push(doc.data());
        });
        return result;
    }
    async getAllData(collections) {
        const querySnapshot = await (0, firestore_1.getDocs)((0, firestore_1.collection)(this.db, collections));
        let result = [];
        querySnapshot.forEach((doc) => {
            result.push(doc.data());
        });
        return result;
    }
}
exports.Database = Database;
//# sourceMappingURL=firebase.js.map