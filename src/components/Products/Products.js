//MODULES
import React from 'react';

//CSS, ASSETS
import './Products.css';

//COMPONENT
export default class Products extends React.Component {
   render() {
      return(
         <div>
            <div className="products-parent-container">

               <div className="product-container-left">
                  <h1>Products</h1>
                  <div className="products-left">
                     
                     <div className="product-list">
                        <div className="unique-product">
                           <span>Name:</span>
                           <span>Price:</span>
                           <span>Subscribed:</span>
                        </div>

                        <div className="unique-product">
                           <span>Name:</span>
                           <span>Price:</span>
                           <span>Subscribed:</span>
                        </div>
                        
                        <div className="unique-product">
                           <span>Name:</span>
                           <span>Price:</span>
                           <span>Subscribed:</span>
                        </div>

                        <div className="unique-product">
                           <span>Name:</span>
                           <span>Price:</span>
                           <span>Subscribed:</span>
                        </div>

                        <div className="unique-product">
                           <span>Name:</span>
                           <span>Price:</span>
                           <span>Subscribed:</span>
                        </div>

                     </div>
                  </div>
               </div>

               <div className="product-container-right">
                  <h1>Product Details</h1>
                  <div className="products-right">
                  </div>
               </div>
               
            </div>
         </div>
      )
   }
}