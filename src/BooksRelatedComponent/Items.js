import React, { Component } from 'react';
import ShelfChanger from './ShelfChanger';

export default class BookItem extends Component {
	getAuthor = function(book) {
		if (typeof book.authors !== 'undefined') {
			return book.authors.join(', ');
		}
		return '';
	};
	bookCoverStyle = function(book) {
		var style = { width: 128, height: 193 };
		if (typeof book.imageLinks !== 'undefined') {
			style.backgroundImage = `url("${book.imageLinks.thumbnail}")`;
		}
		return style;
	};
	render() {
		const { book, bookShelfChangeStatus } = this.props;
		let authors = this.getAuthor(book);
		var bookCoverStyle = this.bookCoverStyle(book);
		return (
			<li>
				<div className="book">
					<div className="book-top">
						<div className="book-cover" style={bookCoverStyle} />
						<ShelfChanger
							shelf={book.shelf}
							bookShelfChangeStatus={function(newShelf) {
								return bookShelfChangeStatus(newShelf);
							}}
						/>
					</div>
					<div className="book-title">{book.title}</div>
					<div className="book-authors">{authors}</div>
				</div>
			</li>
		);
	}
}
