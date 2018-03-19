//MODULES
import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Moment from 'react-moment';

//CSS, ASSETS
import './Products.css';

//COMPONENT
class Products extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			edit: false
			, products: []
			, product: {
				name: ''
				, created_on: ''
				, first_name: 'N/A'
				, last_name: ''
				, price: ''
				, estimated_profit_margin: 'N/A'
				, roadmap: 'N/A'
				, product_id: ''
			}
		}
		this.handleEditProduct = this.handleEditProduct.bind(this);
		this.handleEditButton = this.handleEditButton.bind(this);
		this.handleSaveButton = this.handleSaveButton.bind(this);
		this.handleCancelButton = this.handleCancelButton.bind(this);
	}


	componentWillMount() {
		axios.get(`/api/products/?agencyId=${this.props.user.agency_id}`).then(res => 
			this.setState({products: res.data})
	)}


	handleEditProduct(index) {
		const {products} = this.state;
		const selectedProduct = products[index];

		const product = Object.assign({}, this.state.product)
		product.name = selectedProduct.name;
		product.created_on = selectedProduct.created_on;
		product.first_name = selectedProduct.first_name;
		product.last_name = selectedProduct.last_name;
		product.price = selectedProduct.price;
		product.product_id = selectedProduct.product_id;
		this.setState({product});
	}


	handleEditButton() {

		if(this.state.product.name !== ''){
			//CHANGE edit ON STATE TO BE true
			this.setState((prevState) => {
				return {edit: !prevState.edit}
			})

			//CHANGE EDIT TASK FIELDS TO BE EDITABLE
			let inputFields = Array.from(document.getElementsByClassName('edit-field'));
			inputFields.forEach(e => e.removeAttribute("disabled"));
		}
	}
	

	handleSaveButton() {
      //CHANGE edit ON STATE TO BE false
      this.setState((prevState) => {
         return {edit: !prevState.edit}
      })

      //CHANGE EDIT TASK FIELDS TO BE UNEDITABLE
      let inputFields = Array.from(document.getElementsByClassName('edit-field'));
      inputFields.forEach(e => e.setAttribute("disabled", "true"));

      axios.put('/api/update-product', this.state.product).then(result => console.log(result))
   }


	handleCancelButton() {
		//CHANGE edit ON STATE TO BE false
		this.setState((prevState) => {
			return {edit: !prevState.edit}
		})

		//CHANGE EDIT TASK FIELDS TO BE UNEDITABLE
		let inputFields = Array.from(document.getElementsByClassName('edit-field'));
		inputFields.forEach(e => e.setAttribute("disabled", "true"));
	}


   render() {
		const {edit, products, product} = this.state;
		const existingProducts = products.map((e, index) => 
			<div key={e.name} className="unique-product">
				<span>Name: {e.name}</span>
				<span>Price: {e.price}</span>
				<span>Subscribed: N/A</span>
				<a onClick={this.handleEditProduct.bind(this, index)}>View Details</a>
			</div>
		);
		
		console.log('product', this.state.product)
		console.log('products', this.state.products)

      return(
            <div className="products-parent-container">

               <div className="products-container-left">
                  <h1>Products</h1>
                  <div className="products-left">
                     
                     <div className="product-list">
								{existingProducts}
                     </div>
                  </div>
               </div>

                  <div className="products-container-right">
                  <h1>Product Details</h1>
                  <div className="products-right">

							<div className="product-details-top">
								<div className="product-details-top-left">
										<span>Product Name:</span>
										<input 
											className="edit-field"
											type='text' 
											placeholder="Select A Product"
											value={product.name}
											onChange={e => {
												const product = Object.assign({}, this.state.product);
												product.name = e.target.value;
												this.setState({product});
											}}
											disabled />

										<span>Date Created:</span>
										{product.created_on === '' ? <span className="static-span">N/A</span> :
										<span className="static-span"><Moment format="YYYY-MM-DD">{product.created_on}</Moment></span>
										}

										

										

										<span>Created By:</span>
										<span className="static-span">{`${product.first_name} ${product.last_name}`}</span>


								</div>
								<div className="product-details-top-right">
										<span>Price:</span>
										<input 
											className="edit-field"
											type='text'
											value={product.price}
											onChange={e => {
												const product = Object.assign({}, this.state.product);
												product.price = e.target.value;
												this.setState({product});
											}}
											disabled />

										<span>Estimated Profit Margin:</span>
										<span className="static-span">N/A</span>


										<span>Roadmap:</span>
										<span className="static-span">N/A</span>

								</div>

							</div>

							{edit === false ? 
								<div className="products-button-container">
									<button
										className="settings-edit-button"
										onClick={this.handleEditButton}>
										Edit
									</button>
								</div>
								:
								<div className="products-button-container">
								<button
									className="products-cancel-button"
									onClick={this.handleCancelButton}>
									Cancel
								</button>
								<button 
									className="settings-save-button"
									onClick={this.handleSaveButton}>
									Save
								</button>
								</div>
							}

							<div className="products-container-bottom">
								<div className="products-container-bottom-left">
									<span>Clients Subscribed:</span>
									<div className="product-client-list">

										<div className="unique-client-row">
											<span>Client:</span>
											<span>Product Added:</span>
											<span>Price:</span>
										</div>

										<div className="unique-client-row">
											<span>Client:</span>
											<span>Product Added:</span>
											<span>Price:</span>
										</div>

										<div className="unique-client-row">
											<span>Client:</span>
											<span>Product Added:</span>
											<span>Price:</span>
										</div>

										<div className="unique-client-row">
											<span>Client:</span>
											<span>Product Added:</span>
											<span>Price:</span>
										</div>

										<div className="unique-client-row">
											<span>Client:</span>
											<span>Product Added:</span>
											<span>Price:</span>
										</div>

									</div>
								</div>

								<div className="products-container-bottom-right">
									<span>Product Notes:</span>
									<div className="product-notes">

										<div className="unique-note">
											<span>Date:</span>
											<span>Creator:</span>
											<span>Note:</span>
										</div>

										<div className="unique-note">
											<span>Date:</span>
											<span>Creator:</span>
											<span>Note:</span>
										</div>

										<div className="unique-note">
											<span>Date:</span>
											<span>Creator:</span>
											<span>Note:</span>
										</div>
										
										<div className="unique-note">
											<span>Date:</span>
											<span>Creator:</span>
											<span>Note:</span>
										</div>

										<div className="unique-note">
											<span>Date:</span>
											<span>Creator:</span>
											<span>Note:</span>
										</div>

									</div>
								</div>

							</div>

                  </div>
                  </div>

            </div>
      )
   }
}



function mapStateToProps(state) {
	return{
		user: state.user
	}
}

export default connect(mapStateToProps)(Products)