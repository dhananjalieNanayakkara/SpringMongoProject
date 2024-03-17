import axios from "axios";

const UpdatePatientDetails = () => {

    const handleSubmit = async (event) => {
        console.log('[event]', event);
        
        axios.post('/updatePatientDetails', {username: '', password: ''})
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
            <div className="offset-4 col-4">
                <div className="card p-3" style={{ backgroundColor: 'lightblue', padding: '20px' }}>
                    <h3 className="text-center">Update Patient Details </h3>
                <form onSubmit={handleSubmit}>
                    <label for="pname"><b>Patient Name:</b></label>
                    <input className="form-control" type="text" placeholder="" name="pname" required /><br/>

                    <label for="pnic"><b>Patient NIC:</b></label>
                    <input className="form-control" type="text" placeholder="" name="pnic" required /><br />

                    
                    <label for="email"><b>Email:</b></label>
                    <input className="form-control" type="text" placeholder="" name="email" required /><br />

                    <label><b>Select Doctor : </b></label>
                  <select name='doctor' className='form-control'>
                    <option>Dr. Gihan Chathuranga</option>
                    <option>Dr. Dhananjali Nanayakkara</option>
                    <option>Dr. Denuwan Chamath</option>
                  </select><br />

                    <label for="contactnumber"><b>Contact Number:</b></label>
                    <input className="form-control" type="text" placeholder="" name="contactnumber" required /><br />
                           

                    <button class="btn btn-primary mt-4" type="update"><b>Update</b></button>


                
                </form>
                </div>
            </div>
        </row>
        </div>
        
        
        
        </>

    )
}
export default UpdatePatientDetails;