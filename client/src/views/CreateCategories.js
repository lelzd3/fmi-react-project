import React from 'react'
import httpClient from '../httpClient'

class CreateCategories extends React.Component {
	state = {
		rows: []
	};

	componentDidMount() {
		const categories = [];
		httpClient.getAllCategoriesForAUser()
			.then(allCategories => {
				allCategories.forEach(category => {
					categories.push({
						_id: category._id,
						name: category.name
					})
				})
				this.setState({
					rows: [...this.state.rows, ...categories]
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
			name: ""
		};
		this.setState({
		  rows: [...this.state.rows, item]
		});
	};

	onCommitRow = (idx) => async () => {
		const category = this.state.rows[idx];
		const data = await httpClient.createCategories(category);
		if (data.success) {
			const rows = this.state.rows;
			rows[idx]._id = data.data._id;
			this.setState({rows})
		}
	}

	render() {
		return (
			<div className='CreateCategories'>
				<h1>Welcome to the Categories!</h1>
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
										{ !item._id &&
										<td>
											<button
											onClick={this.onCommitRow(idx)}
											>
											Commit Category
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
							Add Category
						</button>
						</div>
					</div>
					</div>
			</div>
			
		)
	}
}

export default CreateCategories