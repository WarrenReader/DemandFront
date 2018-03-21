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
				, products_id: ''
			}
			, productNotes: []
			, editProductStatus: ''
		}
		this.handleEditProduct = this.handleEditProduct.bind(this);
		this.handleEditButton = this.handleEditButton.bind(this);
		this.handleSaveButton = this.handleSaveButton.bind(this);
		this.handleCancelButton = this.handleCancelButton.bind(this);
		this.handleNewNote = this.handleNewNote.bind(this);
	}


	componentWillMount() {
		axios.get(`/api/products/?agencyId=${this.props.user.agencies_id}`).then(res => 
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
		product.products_id = selectedProduct.products_id;
		this.setState({product});

		//LOAD PRODUCT NOTES
		axios.get(`/api/get-product-notes/?products_id=${this.state.products[index].products_id}`).then(result => {
			this.setState({productNotes: result.data});
		})
	}


	handleEditButton() {

		if(this.state.product.name !== ''){
			//CHANGE edit ON STATE TO BE true
			this.setState((prevState) => {
				return {edit: !prevState.edit}
			})

			//CHANGE editProductStatus ON STATE TO BE ''
			this.setState({editProductStatus: ''})

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

      axios.put('/api/update-product', this.state.product).then(result => {
			this.setState({editProductStatus: result.status});

			//UPDATE TASK LIST
			axios.get(`/api/products/?agencyId=${this.props.user.agencies_id}`).then(res => 
				this.setState({products: res.data}))
		})
   }


	handleCancelButton() {
		//CHANGE edit ON STATE TO BE false
		this.setState((prevState) => {
			return {edit: !prevState.edit}
		})

		//CHANGE EDIT TASK FIELDS TO BE UNEDITABLE
		let inputFields = Array.from(document.getElementsByClassName('edit-field'));
		inputFields.forEach(e => e.setAttribute("disabled", "true"));

		const product = Object.assign({}, this.state.product)
		product.name = '';
		product.created_on = '';
		product.first_name = '';
		product.last_name = '';
		product.price = '';
		product.products_id = '';
		this.setState({product});
	}

	handleNewNote() {
		let note = prompt('New Note');

		if(note !== null) {
			const newNote = {
				date: new Date(),
				agency_employees_id: this.props.user.agency_employees_id,
				note,
				products_id: this.state.product.products_id
			}
					
			axios.post('/api/create-note', {newNote}).then(
				//RELOAD PRODUCT NOTES
				//NOT WORKING CORRECTLY
				axios.get(`/api/get-product-notes/?products_id=${this.state.product.products_id}`).then(result => {
					this.setState({productNotes: result.data});
				})
			)
		}
	}


   render() {
		const {edit, products, product, productNotes, editProductStatus} = this.state;
		const existingProducts = products.map((e, index) => 
			<div key={e.name} className="unique-product">
				<span>Name: <span>{e.name}</span></span>
				<span>Price: <span>{e.price}</span></span>
				<span>Subscribed: <span>N/A</span></span>
				<a onClick={this.handleEditProduct.bind(this, index)}>View Details</a>
			</div>
		);

		const notes = productNotes.map((e, index) => 
			<div key={index} className="unique-note">
				<span>Date: <span><Moment format="MM-DD-YYYY">{e.created_on}</Moment></span></span>
				<span>Author: <span>{`${e.first_name} ${e.last_name}`}</span></span>
				<span>Note: <span className="note">{e.note}</span></span>
			</div>
		);
		

      return(
            <div className="products-parent-container">

               <div className="products-container-left">
                  <h1>Existing Products</h1>
                  <div className="products-left">
                     
                     <div className="product-list">
								{existingProducts}
                     </div>
                  </div>
               </div>

                  <div className="products-container-right">
						<h1>Product Details</h1>
						{editProductStatus === 200 ? <div className="edit-product-status">Update Successful</div> : ''}
                  <div className="products-right">

							<div className="product-details-top">
								<div className="product-details-top-left">
										<span>Product Name</span>
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

										<span>Date Created</span>
										{product.created_on === '' ? <span className="static-span">N/A</span> :
										<span className="static-span"><Moment format="YYYY-MM-DD">{product.created_on}</Moment></span>
										}

										<span>Created By</span>
										{product.first_name === '' ? <span className="static-span">N/A</span> : 
										<span className="static-span">{`${product.first_name} ${product.last_name}`}</span>
										}

								</div>
								<div className="product-details-top-right">
										<span>Price</span>
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

										<span>Estimated Profit Margin</span>
										<span className="static-span">N/A</span>


										<span>Roadmap</span>
										<span className="static-span">N/A</span>

								</div>

							</div>

							{edit === false ? 
								<div className="products-button-container">
									<button
										className="settings-edit-button"
										onClick={this.handleEditButton}>
										Edit Product Details
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
									<span>Clients Subscribed</span>
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
									<span>
										Product Notes
										{this.state.product.name !== '' ? <a className="add-note" onClick={this.handleNewNote}>
											Add Note +
										</a> : ''}
									</span>
									
									<div className="product-notes">
										{notes}
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