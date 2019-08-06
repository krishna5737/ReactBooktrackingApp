import React, { Component } from 'react';
import Items from './Items.js';

export default class Shelf extends Component {
	render() {
		const { books, bookShelfChangeStatus } = this.props;
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{this.props.title}</h2>
				<div className="bookshelf-books">
					<ol className="books-list">
						{books.map(function(book) {
							return React.createElement(Items, {
								key: book.id,
								book: book,
								bookShelfChangeStatus: (function(_bookShelfChangeStatus) {
									function bookShelfChangeStatus(_x) {
										return _bookShelfChangeStatus.apply(this, arguments);
									}

									bookShelfChangeStatus.toString = function() {
										return _bookShelfChangeStatus.toString();
									};

									return bookShelfChangeStatus;
								})(function(newShelf) {
									return bookShelfChangeStatus(book, newShelf);
								})
							});
						})}
					</ol>
				</div>
			</div>
		);
	}
}

