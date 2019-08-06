import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SearchBar extends Component {
	render() {
		const { handleSearchQuery } = this.props;
		return (
			<div className="search-books-bar">
				<Link to="/" className="search-close-icon"/>
				<div className="search-box">
					<input
						type="text"
						placeholder="Search for Your Favourite Book"
						onChange={function(e) {
							handleSearchQuery(e.target.value);
						}}
					/>
				</div>
			</div>
		);
	}
}

