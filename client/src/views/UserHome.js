import React from 'react'
import httpClient from '../httpClient'

class UserHome extends React.Component {
	state = {
		rows: [],
		categories: []
	};

	componentDidMount() {
		const payments = [];
		const categories = [];
		httpClient.getAllPaymentsForAUser()
			.then(allPayments => {
				allPayments.forEach(payment => {
					payments.push({
						_id: payment._id,
						name: payment.name,
						category: payment.category,
						date: payment.date,
						price: payment.price,
						committed: payment.committed
					})
				})
				this.setState({
					rows: [...this.state.rows, ...payments]
				})
			})
		httpClient.getAllCategoriesForAUser()
		.then(allCategories => {
			allCategories.forEach(category => {
				categories.push({
					_id: category._id,
					name: category.name
				})
			})
			this.setState({
				categories: [...this.state.categories, ...categories]
			})
		})

	}
	onInputChange = idx => e => {
		const { name, value } = e.target;
		const rows = [...this.state.rows];
		rows[idx] = {
			...rows[idx],
		  	[name]: value
		};
		this.setState({
		  rows
		});
	};

	onAddRow = () => {
		const item = {
			name: "",
			category: this.state.categories[0],
			date: "",
			price: 0,
			committed: false
		};
		this.setState({
		  rows: [...this.state.rows, item]
		});
	};

	onRemoveSpecificRow = (idx) => async () => {
		const IdOfRowToBeDeleted = this.state.rows[idx]._id;
		if (IdOfRowToBeDeleted) {
			const success = await httpClient.deletePayment(IdOfRowToBeDeleted);
			if (!success) {
				return;
			}
		}
		const rows = [...this.state.rows]
		rows.splice(idx, 1)
		this.setState({ rows })
	}

	onCommitRow = (idx) => async () => {
		const payment = this.state.rows[idx];
		const data = await httpClient.createPayment(payment);
		if (data.success) {
			const rows = this.state.rows;
			rows[idx].committed = true;
			rows[idx]._id = data.data._id;
			this.setState({rows})
		}
	}

	render() {
		return (
			<div className='UserHome'>
				<h1>Welcome to the UserHome!</h1>
				<div className="container">
					<div>
						<div >
						<table
							id="tab_logic"
						>
							<thead>
								<tr>
									<th> # </th>
									<th> Name </th>
									<th> Category </th>
									<th> Date </th>
									<th> Price </th>
									<th />
									<th />
								</tr>
							</thead>
							<tbody>
								{this.state.rows.map((item, idx) => (
									<tr id="addr0" key={idx}>
										<td>{idx}</td>
										<td>
											<input
											type="text"
											name="name"
											value={this.state.rows[idx].name}
											onChange={this.onInputChange(idx)}
											className="form-control"
											/>
										</td>
										<td>
										<select 
											id="mySelect"
											name="category"
											onChange={this.onInputChange(idx)}>
											{this.state.categories.map((category) => {
												return (<option value={category.name}>{category.name}</option>);
											})}
										</select>
										</td>
										<td>
											<input
											type="date"
											name="date"
											value={this.state.rows[idx].date}
											onChange={this.onInputChange(idx)}
											className="form-control"
											/>
										</td>
										<td>
											<input
											type="number"
											name="price"
											value={this.state.rows[idx].price}
											onChange={this.onInputChange(idx)}
											className="form-control"
											/>
										</td>
										<td>
											<button
											onClick={this.onRemoveSpecificRow(idx)}
											>
											Remove
											</button>
										</td>
										{ item.committed === false &&
										<td>
											<button
											onClick={this.onCommitRow(idx)}
											>
											Commit Row
											</button>
										</td> 
										}
									</tr>
								))}
							</tbody>
						</table>
						<button 
							onClick={this.onAddRow}
							className="btn btn-primary">
							Add Row
						</button>
						</div>
					</div>
					</div>
			</div>
			
		)
	}
}

export default UserHome