import React, { useEffect, useState } from "react";

const TimeApp = () => {
    const [recordings, setRecordings] = useState([]);

    useEffect(() => {
        // Load recordings from localStorage on component mount
        const storedRecordings = JSON.parse(localStorage.getItem('recordings')) || [];
        setRecordings(storedRecordings);
    }, []);

    const startRecording = () => {
        const startTime = new Date();
        setRecordings([...recordings, { startTime, endTime: null, duration: null}]);
    };

    const endRecording = () => {
        const updatedRecordings = [...recordings];
        const lastIndex = updatedRecordings.length - 1;
        updatedRecordings[lastIndex].endTime = new Date();

        updatedRecordings[lastIndex].duration = calculateDuration(
            updatedRecordings[lastIndex].startTime,
            updatedRecordings[lastIndex].endTime
        );

        setRecordings(updatedRecordings);

        // Save recordings to localStorage
        localStorage.setItem('recordings', JSON.stringify(updatedRecordings));
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
          <h3 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-12">Start Clock</h3>
          <div className="flex justify-center">
            <button onClick={startRecording} className="cursor-pointer py-3 px-6 rounded-full bg-gradient-to-r from-red-400 to-red-600 ml-5 text-white">Start Working</button>
            <button onClick={endRecording} className="cursor-pointer py-3 px-6 rounded-full bg-gradient-to-r from-red-400 to-red-600 ml-5 text-white">Stop Working</button>
          </div>
    
          <table>
            <thead>
              <tr>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {recordings.map((record, index) => (
                <tr key={index}>
                  <td>{record.startTime.toLocaleString()}</td>
                  <td>{record.endTime ? record.endTime.toLocaleString() : 'Recording...'}</td>
                  <td>
                    {record.duration || 'Recording...'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    );

}

export default TimeApp;