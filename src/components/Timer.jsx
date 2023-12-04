import React, { useEffect, useState } from "react";
import { firestore } from "../firebaseConfig";
import { findAll } from "../components/TimerRes";
import { collection, doc, updateDoc , setDoc,getDoc  } from "firebase/firestore"; 

const TimeApp = () => {
  const [recordings, setRecordings] = useState([]);
  const [account, setAccount] = useState(null);

  const storedAccount = JSON.parse(localStorage.getItem("faceAuth"));
  
  useEffect(() => {
    if (storedAccount) {
      setAccount(storedAccount.account);
    }
    
  }, []);

  useEffect(() => {
    if (account) {
      fetchRecordings();
    }
  }, [account]);

  const fetchRecordings = async () => {
    try {      
      const userDocRef = doc(firestore, "users", storedAccount.account.id);
      const docSnap = await getDoc(userDocRef);

     if (docSnap.exists()) {
        const userData = docSnap.data();
        setRecordings(userData.data || []);
      } else {
        console.log("User not found");
      }
      
    } catch (error) {
      console.error("Error fetching recordings:", error);
    }
  };
  
  // change time formate
  const formatDateTime = (timestamp) => {
    if (!timestamp || !timestamp.seconds) {
      return "N/A";
    }
  
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
  
    const milliseconds = timestamp.seconds * 1000 + (timestamp.nanoseconds || 0) / 1e6;
    return new Date(milliseconds).toLocaleString("en-US", options);
  };


  const startRecording = async () => {
    const startTime = new Date();
    const newRecording = { startTime, endTime: null, duration: null };

    setRecordings((prevRecordings) => [...prevRecordings, newRecording]);

    await saveRecordingsToFirebase([...recordings, newRecording]);
  };

  const endRecording = async () => {
    const lastIndex = recordings.length - 1;
    const updatedRecordings = [...recordings];
    updatedRecordings[lastIndex].endTime = new Date();

    updatedRecordings[lastIndex].duration = calculateDuration(
      updatedRecordings[lastIndex].startTime,
      updatedRecordings[lastIndex].endTime
    );
    
    setRecordings(updatedRecordings);
    await saveRecordingsToFirebase(updatedRecordings);
  };
  
  const saveRecordingsToFirebase = async (data) => {
    try {
      const userDocRef = doc(firestore, "users", storedAccount.account.id);
      await updateDoc(userDocRef, { data });

      console.log("Recordings saved successfully");
    } catch (error) {
      console.error("Error saving recordings:", error);
    }
  };

  const calculateDuration = (start, end) => {
    const duration = end - start;
    const hours = Math.floor(duration / 3600000);
    const minutes = Math.floor((duration % 3600000) / 60000);
    const seconds = Math.floor((duration % 60000) / 1000);
    return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  };
  
      
  return (
    <div className="timer_wrapper">
      <h3 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-12">
        Start Clock
      </h3>
      <div className="flex justify-center">
        <button
          onClick={startRecording}
          className="cursor-pointer py-3 px-6 rounded-full bg-gradient-to-r from-red-400 to-red-600 ml-5 text-white"
        >
          Start Working
        </button>
        <button
          onClick={endRecording}
          className="cursor-pointer py-3 px-6 rounded-full bg-gradient-to-r from-red-400 to-red-600 ml-5 text-white"
        >
          Stop Working
        </button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-20 mb-20">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Start Time
              </th>
              <th scope="col" className="px-6 py-3">
                End Time
              </th>
              <th scope="col" className="px-6 py-3">
                Duration
              </th>
            </tr>
          </thead>
          <tbody>
            {recordings.map((record, index) => (
              <tr
                key={index}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <td className="px-6 py-4">
                  {formatDateTime(record.startTime)}
                </td>
                <td className="px-6 py-4">
                  {formatDateTime(record.endTime) || "Working..."}
                </td>
                <td className="px-6 py-4">{record.duration || "Working..."}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeApp;
