import React, { Component } from 'react';

export default class ShelfChanger extends Component {
	render() {
		const { bookShelfChangeStatus, shelf } = this.props;
		return (
			<div className="book-shelf-changer">
				<select
					value={shelf}
					onChange={function(e) {
						return bookShelfChangeStatus(e.target.value);
					}}
				>
					<option id="move" value="-1" disabled>
						Move to...
					</option>
					<option id="reading" value="currentlyReading">
						Currently Reading
					</option>
					<option id="wantToRead" value="wantToRead">
						Want to Read
					</option>
					<option id="read" value="read">
						Read
					</option>
					<option id="none" value="none">
						None
					</option>
				</select>
			</div>
		);
	}
}

