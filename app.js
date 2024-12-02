import express from 'express';
const serve = express();
serve.use(express.json());
serve.use(express.urlencoded({extended: true}));
import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, onValue, child, push} from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyCZuRGTIWQpEgaG9a-40bMtfmoautz_qbk",
  authDomain: "lynx2server.firebaseapp.com",
  databaseURL: "https://lynx2server-default-rtdb.firebaseio.com",
  projectId: "lynx2server",
  storageBucket: "lynx2server.firebasestorage.app",
  messagingSenderId: "711323925875",
  appId: "1:711323925875:web:eeeaa70395ab4431385906"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const url = ref(database, "/");
serve.get("/api", (req, res) => {
  onValue(url, (s) => {
     res.json(s.val());
  })
})
serve.post("/api/v1", (req, res) => {
  console.log(req.body)
  const { webRef, data } = req.body;
  set(ref(database, "/"+webRef), data);
  res.send("Server api v1 200!");
})
serve.post("/api/treat/v2", (req, res) => {
  const { webRef, data } = req.body;
  const id = push(child(ref(database, webRef), webRef)).key;
  set(ref(database, id), data);
  res.send("Server api v2 200!");
})
serve.listen(3000, () => {
  console.log("Getting data...");
})
// Initialize Firebase
