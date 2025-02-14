import React, { createContext, useState, useContext } from "react";

const PatientContext = createContext();
export const usePatientContext = () => useContext(PatientContext);
const PatientProvider = ({ children }) => {
  const [patient, setPatient] = useState({
    name: "",
    id:"",
    age: "",
    city: "",
    date:"",
    mobNo: "",
    abhaNo: "",
    gender:"",
    co:[],
    audio: null,
    summary: "",
    transcription: "",
    image1:"",
    image2:""
  });


  return (
    <PatientContext.Provider value={{patient, setPatient}}>
      {children}
    </PatientContext.Provider>
  );
};

export default PatientProvider;
