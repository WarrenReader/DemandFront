//MODULES
import React from 'react';

//CSS, ASSETS
import './Products.css';

//COMPONENT
export default class Products extends React.Component {
   render() {
      return(
            <div className="products-parent-container">

               <div className="products-container-left">
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

                  <div className="products-container-right">
                  <h1>Product Details</h1>
                  <div className="products-right">

							<div className="product-details-top">
								<div className="product-details-top-left">
										<span>Product Name:</span>
										<span>Date Created:</span>
										<span>Created By:</span>
								</div>
								<div className="product-details-top-right">
										<span>Price:</span>
										<span>Estimated Profit Margin:</span>
										<span>Roadmap:</span>
								</div>
							</div>

							<div className="products-container-bottom">
								<div className="products-container-bottom-left">
									<span>Clients Subscribed:</span>
									<div className="product-client-list"></div>
								</div>

								<div className="products-container-bottom-right">
									<span>Notes:</span>
									<div className="product-notes"></div>
								</div>

							</div>

                  </div>
                  </div>

            </div>
      )
   }
}

