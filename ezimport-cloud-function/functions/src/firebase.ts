import { FirebaseApp, getApp, initializeApp } from "firebase/app";
import {
  getFirestore,
  Firestore,
  addDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
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

export let app: FirebaseApp;

try {
  app = getApp("app");
} catch (e) {
  app = initializeApp(firebaseConfig, "app");
}

// const analytics = getAnalytics(app);

export const db = getFirestore(app);

export class Database {
  constructor(db: Firestore) {
    this.db = db;
  }
  private readonly db: Firestore;

  async addData<T extends object>(collections: string, createData: T) {
    return addDoc(collection(this.db, collections), createData);
  }

  async getData(collections: string, key: string, value: string) {
    const querySnapshot = await getDocs(
      query(collection(db, collections), where(key, "==", value))
    );

    let result: any = [];
    querySnapshot.forEach((doc) => {
      result.push(doc.data());
    });

    return result;
  }

  async getAllData(collections: string) {
    const querySnapshot = await getDocs(collection(this.db, collections));

    let result: any = [];
    querySnapshot.forEach((doc) => {
      result.push(doc.data());
    });

    return result;
  }
}
