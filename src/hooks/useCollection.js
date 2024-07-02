import { useState, useEffect } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";
export let useCollection = (collectionName, whereData) => {
  let [data, setData] = useState(null);

  useEffect(() => {
    if ((collectionName, whereData[2])) {
      const q = query(collection(db, collectionName), where(...whereData));
      let getData = async () => {
        let data = [];
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          data.push({ id: doc.id, ...doc.data() });
        });
        setData(data);
      };
      getData();
    }
  }, [collectionName, whereData[2]]);
  return { data };
};
