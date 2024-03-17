import axios from "axios";
import Swal from "sweetalert2";

const AppointmentForm = () => {

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log(event);

        const payload = {
            userId: event.target.userId.value,
            name: event.target.name.value,
            date: event.target.date.value,
            time: event.target.time.value,
        }

        if(payload.date !== "" && payload.time !== "" && payload.name !== "" && payload.userId !== ""){
            axios.post('/appointment/create', payload)
            .then(data => {
                
                  Toast.fire({
                    icon: "success",
                    title: "Signed in successfully"
                  });

                  
                document.getElementById("appointmentForm").reset();
                // token
            })
            .catch(err => {
                
                Toast.fire({
                    icon: "error",
                    title: "Unexpected error occured"
                  });
            })
        }

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

        
        
        
    } 

    return (
        <>
        <div class="container">
        
        <div className="row">
            <div className="offset-3 col-6">
                <div className="card p-3" style={{ backgroundColor: 'lightblue', padding: '20px' }}>
                    <h3 className="text-center">Appointment Form</h3>
                <form id="appointmentForm" onSubmit={handleSubmit}>
                    <label for="pnic"><b>Patient Registration Id:</b></label>
                    <input className="form-control" type="text" placeholder="" name="userId" required /><br/>

                    <label for="pname"><b>Patient Name:</b></label>
                    <input className="form-control" type="text" placeholder="" name="name" required /><br />

                    <label htmlFor="inputDate" className="form-label"><b>Appointment Date:</b></label>
                    <input type="date" name="date" placeholder="" className="form-control"/><br />

                    
                    <label for="timeInput" class="form-label">Appointment time:</label>
                    <input type="time" name="time" class="form-control"></input><br />

                    <button className="btn btn-primary mt-4" type="submit"><b>Send Appointment</b></button>


                
                </form>
                </div>
            </div>
        </div>
        </div>
        
        
        
        </>

    )
}
export default AppointmentForm;