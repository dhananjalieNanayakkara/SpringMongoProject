import axios from "axios";
import Swal from "sweetalert2";

const PaymentForm = () => {

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

        console.log('radio', event.target.exDate);

        const payload = {
            userId : event.target.id.value,
            cardType: event.target.flexRadioDefault[0].checked ? "VISA" : "MASTER",
            cardNo: event.target.cardNo.value,
            exDate: event.target.exDate.value,
            cvv: event.target.cvv.value
        }
        
        axios.post('/payment/pay', payload)
        .then(data => {

            document.getElementById("pay-form").reset();
            
            Toast.fire({
                icon: "success",
                title: "successfully"
              });
        })
        .catch(err => {
            
            Toast.fire({
                icon: "error",
                title: "Unexpected error occured"
              });
        })
    } 

    return (
        <>
        <div class="container">
        
        <row>
            <div className="offset-3 col-7">
                <div className="card p-3" style={{ backgroundColor: 'lightblue', padding: '20px' }} >
                    <h3 className="text-center">Payment Form</h3>
                <form id="pay-form" onSubmit={handleSubmit}>

                    <label for="id"><b>Id:</b></label>
                    <input className="form-control" type="text" placeholder="Enter Id" name="id" required /><br/>
                    <hr />

                    <label for=""><b>Card Type:</b></label>
                    <div class="form-check">
                        <input value={"visa"} selected class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                        <label htmlFor="flexRadioDefault">Visa</label>
                    </div>
                    <div class="form-check">
                        <input value={"master"} class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                        <label htmlFor="flexRadioDefault">Master Card</label>
                    </div><br />

                    

                    <label for="cnumber"><b>Card Number:</b></label>
                    <input className="form-control" type="text" placeholder="Enter Card Number" name="cardNo" required /><br />

                    <label htmlFor="inputDate" className="form-label"><b>Expire Date:</b></label>
                    <input type="date" name="exDate" placeholder="Select date" className="form-control"/><br />

                    
                    <label for="cvv"><b>CVV:</b></label>
                    <input className="form-control" type="text" placeholder="Enter CVV" name="cvv" required /><br />

                    <button class="btn btn-primary mt-4" type="submit"><b>Submit</b></button>


                
                </form>
                </div>
            </div>
        </row>
        </div>
        
        
        
        </>

    )
}
export default PaymentForm;