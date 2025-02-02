import React, { createContext, useState, useContext } from "react";

const PatientContext = createContext();
export const usePatientContext = () => useContext(PatientContext);
const PatientProvider = ({ children }) => {
  const [patient, setPatient] = useState({
    name: "",
    age: "",
    city: "",
    mobNo: "",
    abhaNo: "",
    audio: "",
    summary: "",
    transcription: "",
  });
  const [audioLoc, setAudioLoc] = useState(null);
  return (
    <PatientContext.Provider value={{patient, setPatient}}>
      {children}
    </PatientContext.Provider>
  );
};

export default PatientProvider;
