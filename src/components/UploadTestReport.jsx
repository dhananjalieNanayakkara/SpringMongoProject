import axios from "axios";
import { useState} from "react";
import Swal from "sweetalert2";

const UploadTestReport = () => {

    const [regIds, setRejIds] = useState([]);
    const [file, setFile] = useState();

    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });


    const handleSubmit = async (event) => {
        event.preventDefault();
        
        axios.post('/patient/get-reg-ids', {nic: event.target.nic.value})
        .then(data => {
            setRejIds(data.data);
        })
        .catch(err => {
            console.log('[error]', err);
        })
    } 


    const handleFileChange = (event) => {
        console.log('file in handleFileChange', event.target.files[0]);
        // const fileName = event.target.files[0].name;
        // const extension = fileName.split('.')[-1]
        // console.log('extention', extension);
        // if(extension.toLowerCase() === 'pdf'){
            setFile(prev => event.target.files[0])
        // }else{
            // alert("Only PDFs are allowed to upload");
            // document.getElementById("uploadFileForm").requestFullscreen();
        // }
    }

    const handleFileUploadSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        if(file)
        formData.append('file', file);
        console.log('file after append', file, 'form data', formData.get('file'));


        const config = {
            Headers: {
                "Content-Type": "multipart/form-data",
            }
        }

        await axios.post(`/upload/file?filename=${event.target.id.value}`, formData, config)
        .then(data =>{
            Toast.fire({
                icon: "success",
                title: "Signed in successfully"
              });

              document.getElementById("report-form").reset();
        })
        .catch(err => 
            {
                Toast.fire({
                icon: "error",
                title: "Unexpected error occured"
              })
            }
        )
    }

    return (
        <>
        <div class="container">
        
        <row>
            <div className="offset-3 col-7">
                <div className="card p-3" style={{ backgroundColor: 'lightblue', padding: '20px' }}>
                    <h3 className="text-center">Upload Test Report</h3>
                <form onSubmit={handleSubmit}>
                    <label for="nic"><b>Patient NIC:</b></label>
                    <input className="form-control" type="text" placeholder="Enter Patient NIC" name="nic" required /><br/>
                    <button class="btn btn-primary mt-4" type="submit"><b>Load Id</b></button>
                </form>
                
                </div><br />
                <div className="card p-3" style={{ backgroundColor: 'lightblue', padding: '20px' }}>
                <form id="report-form" onSubmit={handleFileUploadSubmit}>
                <label for="id"><b>Patient Id : </b></label>
                  <select name='id' className='form-control' placeholder="Select Id">
                    <option value={''}>-- select id --</option>
                    {
                        regIds.length > 0 && regIds?.map(id => {
                            return (
                                <option value={id}>{id}</option>
                            )
                        })
                    }
                  </select><br />
                    <label for="formFile" className="form-label"><b>Upload Test Report:</b></label>
                    <input className="form-control" type="file" onChange={handleFileChange}  name="formFile" required />
                    <button class="btn btn-primary mt-4" type="submit"><b>Upload File</b></button>
                </form>
                </div>
            </div>
        </row>
        
        </div>
        
        
        
        </>

    )
}
export default UploadTestReport;