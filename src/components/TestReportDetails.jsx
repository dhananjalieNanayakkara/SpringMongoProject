import axios from "axios";
import {useState} from "react";

const TestReportDetails = () => {

    const [data, setData] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        axios.post('/patient/reports', {nic: event.target.nic.value})
        .then(data => {
            setData(data.data)
        })
        .catch(err => {
            console.log('[error]', err);
        })
    } 

    const handleDownload = async (id) => {
        await axios.get(`/upload/download/${id}.pdf`)
        .then(file => {
            const url = window.URL.createObjectURL(new Blob([file.data]));

            const link = document.createElement('a');
            link.href = url;
            link.download = `${id}.pdf`;

            document.body.appendChild(link);

            link.click();

            link.parentNode.removeChild(link);
        })
        .catch(err => console.log(err))
    }

    return (
        <>
        <div class="container">
        <row>
            <div className="offset-3 col-7">
                <div className="card p-3" style={{ backgroundColor: 'lightblue', padding: '20px' }} >
                    <h3 className="text-center">Test Report Details</h3>
                <form onSubmit={handleSubmit}>

                    <label for="nic"><b>NIC:</b></label>
                    <input className="form-control" type="text" placeholder="Enter Your NIC" name="nic" required /><br/>
                    <button className="btn btn-primary mt-4" type="submit"><b>Search</b></button>
                </form>
                </div>
            </div>
        </row>
        </div><br />


        <div className="row">
          <div className="col-8 offset-2">
            <table className="table table-bordered">
            <thead>
                <tr>
                <th>Id</th>
                <th>Payment Status</th>
                <th>Test report</th>
                </tr>
            </thead>
            <tbody>
               {
                data.length < 1 && ( <tr>
                    <td colSpan={3}>
                    <div class="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Can't Find Data..!</strong> Please enter the NIC number...
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                    </td>
                </tr>)
               }
               {
                data.length > 0 && data?.map(report => {
                    return (
                        <tr>
                            <td>{report._id}</td>
                            <td>{report.payment ? "PAID" : "UNPAID"}</td>
                            <td><center><button value={report._id} type="button" onClick={e => {handleDownload(e.target.value)}} disabled={!report.payment} class="btn btn-warning">Download</button></center></td>
                        </tr>
                    )
                })
               }
            </tbody>
            </table>
            
         </div>   
        </div>     
        
        
        </>

    )
}
export default TestReportDetails;