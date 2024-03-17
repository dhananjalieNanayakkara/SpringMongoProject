import axios from "axios";

const UpdateTestReport = () => {

    const handleSubmit = async (event) => {
        console.log('[event]', event);
        
        axios.post('/updateTestReport', {username: '', password: ''})
        .then(data => {
            // token
        })
        .catch(err => {
            console.log('[error]', err);
        })
    } 

    return (
        <>
        <div class="container">
        
        <row>
            <div className="offset-3 col-7">
                <div className="card p-3" style={{ backgroundColor: 'lightblue', padding: '20px' }}>
                    <h3 className="text-center">Update Test Report</h3>
                <form onSubmit={handleSubmit}>
                    <label for="pname"><b>Patient Name:</b></label>
                    <input className="form-control" type="text" placeholder="Enter Patient Name" name="pname" required /><br/>

                    <label for="pnic"><b>Patient NIC:</b></label>
                    <input className="form-control" type="text" placeholder="Enter NIC" name="pnic" required /><br />

                    <label for="formFile" className="form-label"><b>Upload Test Report:</b></label>
                    <input className="form-control" type="file"  name="formFile" required />
                    

                    <button class="btn btn-primary mt-4" type="submit"><b>Update File</b></button>


                
                </form>
                </div>
            </div>
        </row>
        </div>
        
        
        
        </>

    )
}
export default UpdateTestReport;