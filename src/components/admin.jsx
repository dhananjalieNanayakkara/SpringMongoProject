import axios from 'axios';
import {useEffect, useState } from "react";


function Parient() {
  
  const [nicnumber, setNicnumber] = useState("");
  const [contactnumber, setContactNumber] = useState("");
  const [patients, setUsers] = useState([]);
    const [patientid, setId] = useState('');
  const [patientname, setName] = useState("");
  const [address, setAddress] = useState("");


 //load the data using useEffect
 useEffect(() => {
  (async () => await Load())();
  }, []);
 
 
  async function  Load()
  {
     const result = await axios.get(
         "http://localhost:8080/api/v1/patient/getAll");
         setUsers(result.data);
         console.log(result.data);
  }
 
     async function save(event)
    {
        event.preventDefault();
    try
        {
         await axios.post("http://localhost:8080/api/v1/patient/save",
        {
            patientname: patientname,
            address: address,
            nicnumber: nicnumber,
            contactnumber: contactnumber
        });
          alert("Patient Registation Successfully");
          setId("");
          setName("");
          setAddress("");
          setNicnumber("");
          setContactNumber("");
          Load();
        }
    catch(err)
        {
          alert("Patient Registation Failed");
        }
   }

 
   async function editPatient(patients)
   {
    setName(patients.patientname);
    setAddress(patients.address);
    setNicnumber(patients.nicnumber);
    setContactNumber(patients.contactnumber); 
    setId(patients._id);
   }
 
   async function DeletePatient(patientid)
   {
        await axios.delete("http://localhost:8080/api/v1/patient/delete/" + patientid); 
        alert("Patient deleted Successfully");
        Load();
   }
 
   async function update(event)
   {
    event.preventDefault();
 
   try
       {
        await axios.put("http://localhost:8080/api/v1/patient/edit/" + patientid ,
       {

        patientname: patientname,
        address: address,
        nicnumber: nicnumber,
        contactnumber: contactnumber
       
       });
         alert("Registation Updateddddd");
         setId("");
         setName("");
         setAddress("");
         setNicnumber("");
         setContactNumber("");
         Load();
       }
   catch(err)
       {
         alert("Patient Updateddd Failed");
       }
  }


    return (
      <div>
        <h1 align="center">Patient Details</h1>
        <div class="container mt-4">
            <form>
                <div class="form-group">
                    <label>Patient Name:</label>
                    <input type="text" class="form-control" id="patientname" 
                    value={patientname}
                    onChange={(event) =>
                    {
                        setName(event.target.value);
                    }}
                    
                    />
                </div>

                <div class="form-group">
                    <label>Address:</label>
                    <input type="text" class="form-control" id="address"
                    value={address}
                    onChange={(event) =>
                    {
                        setAddress(event.target.value);
                    }} 
                    />
                </div>
                <div class="form-group">
                    <label>NIC No:</label>
                    <input type="text" class="form-control" id="nicnumber"
                    value={nicnumber}
                    onChange={(event) =>
                    {
                      setNicnumber(event.target.value);
                    }} 
                    />
                </div>

                <div class="form-group">
                    <label>
                        Contact Number:
                    </label>
                    <input type="text" class="form-control" id="contactnumber"
                    value={contactnumber}
                    onChange={(event) =>
                    {
                        setContactNumber(event.target.value);
                    }} />
                </div>

                <div>
                    
                    <button class="btn btn-warning mt-4"  onClick={update}>Update</button>
                </div>
            </form>
        </div>

        <br/>
<table class="table table-dark" align="center">
  <thead>
    <tr>
      <th scope="col">Patient Name</th>
      <th scope="col">Address</th>
      <th scope="col">NIC No</th>
      <th scope="col">Contact Number</th>
      
      <th scope="col">Option</th>
    </tr>
  </thead>
       {patients.map(function fn(patient)
       {
            return(
            <tbody>
                <tr>
                <td>{patient.patientname}</td>
                <td>{patient.address}</td>
                <td>{patient.nicnumber}</td>
                <td>{patient.contactnumber}</td>        
                <td>
                    <button type="button" class="btn btn-warning"  onClick={() => editPatient(patient)} >Edit</button>  
                    <button type="button" class="btn btn-danger" onClick={() => DeletePatient(patient._id)}>Delete</button>
                </td>
                </tr>
            </tbody>
            );
            })}
            </table>
            
      </div>
    );
  }
  
  export default Parient;