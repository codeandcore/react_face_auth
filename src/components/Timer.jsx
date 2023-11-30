// import React, { useEffect, useState } from "react";

// const TimeApp = () => {
//     const [recordings, setRecordings] = useState([]);
//     const [account, setAccount] = useState(null);

//     useEffect(() => {

//         const { account } = JSON.parse(localStorage.getItem("faceAuth"));
//         setAccount(account);

//         // Load recordings from localStorage on component mount
//         const storedRecordings = JSON.parse(localStorage.getItem(`recordings_${account.picture}`)) || [];
//         setRecordings(storedRecordings);

//     }, []);

//     const startRecording = () => {
//         const startTime = new Date();
//         setRecordings([...recordings, { startTime, endTime: null, duration: null}]);
//     };

//     const endRecording = () => {
//         const updatedRecordings = [...recordings];
//         const lastIndex = updatedRecordings.length - 1;
//         updatedRecordings[lastIndex].endTime = new Date();

//         updatedRecordings[lastIndex].duration = calculateDuration(
//             updatedRecordings[lastIndex].startTime,
//             updatedRecordings[lastIndex].endTime
//         );

//         setRecordings(updatedRecordings);

//         // Save recordings to localStorage
//         localStorage.setItem(`recordings_${account.picture}`, JSON.stringify(updatedRecordings));
//     };

//     const calculateDuration = (start, end) => {
//         const duration = end - start;
//         const hours = Math.floor(duration / 3600000);
//         const minutes = Math.floor((duration % 3600000) / 60000);
//         const seconds = Math.floor((duration % 60000) / 1000);
//         return `${hours} hours, ${minutes} minutes, ${seconds} seconds`;
//     };

//     return (
//         <div className="timer_wrapper">
//           <h3 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-12">Start Clock</h3>
//           <div className="flex justify-center">
//             <button onClick={startRecording} className="cursor-pointer py-3 px-6 rounded-full bg-gradient-to-r from-red-400 to-red-600 ml-5 text-white">Start Working</button>
//             <button onClick={endRecording} className="cursor-pointer py-3 px-6 rounded-full bg-gradient-to-r from-red-400 to-red-600 ml-5 text-white">Stop Working</button>
//           </div>
//           <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-20 mb-20">
//             <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//                 <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//                     <tr>
//                         <th scope="col" className="px-6 py-3">Start Time</th>
//                         <th scope="col" className="px-6 py-3">End Time</th>
//                         <th scope="col" className="px-6 py-3">Duration</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {recordings.map((record, index) => (
//                         <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
//                             <td className="px-6 py-4">{record.startTime.toLocaleString()}</td>
//                             <td className="px-6 py-4">{record.endTime ? record.endTime.toLocaleString() : 'Working...'}</td>
//                             <td className="px-6 py-4">
//                                 {record.duration || 'Working...'}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//           </div>
//         </div>
//     );

// }

// export default TimeApp;

import React, { useEffect, useState } from "react";
// import { firestore } from "../firebaseConfig";

const TimeApp = () => {
  const [recordings, setRecordings] = useState([]);
  const [account, setAccount] = useState(null);

  const [data, setData] = useState([]);

  useEffect(() => {

    const { account } = JSON.parse(localStorage.getItem("faceAuth"));
    setAccount(account);

    if (!account) {
        return null;
    }
    

    // Load recordings from API on component mount
    const fetchRecordings = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/api/recordings/${account.id}`
        );
        if (response.ok) {
          const data = await response.json();
          setRecordings(data);
        } else {
          console.error("Failed to fetch recordings");
        }
      } catch (error) {
        console.error("Error fetching recordings:", error);
      }
    };

    fetchRecordings();
  }, []);

  const startRecording = async () => {
    console.log('Making API request to start recording...');

    const startTime = new Date();
    const newRecording = { startTime, endTime: null, duration: null };

    setRecordings([...recordings, newRecording]);

    // Save recordings to the server with account ID
    await saveRecordingsToServer([...recordings, newRecording]);
  };

  const endRecording = async () => {
    console.log('Making API request to end recording...');

    const lastIndex = recordings.length - 1;
    const updatedRecordings = [...recordings];
    updatedRecordings[lastIndex].endTime = new Date();

    updatedRecordings[lastIndex].duration = calculateDuration(
      updatedRecordings[lastIndex].startTime,
      updatedRecordings[lastIndex].endTime
    );

    setRecordings(updatedRecordings);

    // Save recordings to the server with account ID
    await saveRecordingsToServer(updatedRecordings);
  };

  const saveRecordingsToServer = async (data) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/recordings/${account.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        console.log("Recordings saved successfully");
      } else {
        console.error("Failed to save recordings");
      }
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
                  {record.startTime.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  {record.endTime
                    ? record.endTime.toLocaleString()
                    : "Working..."}
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
