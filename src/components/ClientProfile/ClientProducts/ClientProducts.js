//MODULES
import React from 'react';
import axios from 'axios';
import Moment from 'react-moment';

//CSS, ASSETS
import './ClientProducts.css';

//COMPONENTS
export default class ClientProducts extends React.Component {
   constructor() {
      super()
      this.state = {
         products: []
      }
   }

   componentWillMount() {
      axios.get(`/api/client-products/${this.props.clientId}`).then(result =>
         this.setState({products: result.data}))
   }

   render() {

      const {products} = this.state;

      const existingProducts = products.map((e, index) => 
			<tr key={index}>
					<td>{e.product_name}</td>
					<td>{e.price}</td>
					<td><Moment format="MM-DD-YYYY">{e.date_created}</Moment></td>
					<td>{e.roadmap}</td>
					<td>
					<button className="edit">Edit</button>
					<button className="delete">Delete</button>
					</td>
			</tr>
      )

      console.log(this.state.products[0]);

      return(
         <div className="client-profile-products">

            <table>         
               <thead>
                  <tr>
                     <th>Product</th>
                     <th>Price</th>
                     <th>Sign Up Date</th>
                     <th>Roadmap</th>
                     <th>Action</th>
                  </tr>
               </thead>

               <tbody>
						{existingProducts}
               </tbody>
            </table>

         </div>
      )
   }
}