import React from 'react';
import { useForm } from 'react-hook-form';
import { CartContext } from '../../App';
import { getStoredCart, clearTheCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Navbar from '../navbar/Navbar';
import './Shipping.css';
import Footer from '../Footer/Footer';
import useCart from '../../hooks/useCart';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { dynamicTitle } from '../DynamicTitle/DynamicTitle';
import {  useNavigate } from 'react-router-dom';
const Shipping = () => {
    dynamicTitle("Shipping")
    const [cart] = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        const savedCart = getStoredCart();
        const price = cart.map(pd=> pd.price)
        const orderDetail = { user:user.email, product:savedCart, price:price, shipment:data, ordertime: new Date()   }
        fetch("https://young-ridge-26718.herokuapp.com/order", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(orderDetail)
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    reset();
                    clearTheCart();
                   
                }
            })
    }
    return (
        <div className="shipping">
            <Navbar/>
          <div className="container">
              <div className="row" style={{marginTop:'110px', marginBottom:'30px'}}>
                  <div className="col-md-8">
               <form onSubmit={handleSubmit(onSubmit)}>
              
                          <div className="row">
                          <div className="col">
                            <label for="exampleInputEmail1" class="form-label">Name</label>
                            <input class="form-control"  {...register("name", {required: true})} />
                            </div>
                            <div className="col">
                            <label for="exampleInputEmail1" class="form-label">Email</label>
                            <input type="text"  class="form-control" defaultValue={user.email}  {...register("email")}/>
                            </div>
                            <div className="col">
                            <label for="exampleInputEmail1" class="form-label">Phone</label>
                            <input type="text"  class="form-control" {...register("phone number", {required: true})}/>
                            </div>
                           </div>
                           <br/>
                            <div className="row">
                            <div className="col">
                            <label for="exampleInputEmail1" class="form-label">Country</label>
                            <input type="text"  class="form-control" defaultValue="Bangladesh" {...register("country")}/>
                            </div>
                            <div className="col">
                            <label for="exampleInputEmail1" class="form-label">City</label>
                            <input type="text"  class="form-control" {...register("city", {required: true})}/>
                            </div>
                            </div>
                            <br/>
                            <div className="col">
                            <label for="exampleInputEmail1" class="form-label">Address</label>
                            <textarea type="text"  class="form-control" {...register("address", {required: true})} />
                            </div>
                            <br />
                            <button type="submit" className="btn" style={{backgroundColor:'#130f40', color:'#fff'}}>Submit</button>
                       </form>
                  </div>
                  <div className="col-md-4">
                 <Cart/>
                  </div>
              </div>
          </div>
          <Footer/>
        </div>
    );
};

export default Shipping;