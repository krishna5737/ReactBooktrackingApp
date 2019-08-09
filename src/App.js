import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Search from './BooksRelatedComponent/Search';
import Shelf from './BooksRelatedComponent/Shelf';

import './css/App.css';

class BooksApp extends Component {
	state = {
		books: []
	};

	componentDidMount() {
		BooksAPI.getAll().then((books) => this.setState({ books }));
	}

	render() {
		const { books } = this.state;
		let Reading = books.filter(function(book) {
			return book.shelf === 'currentlyReading';
		});
		let wantToRead = books.filter(function(book) {
			return book.shelf === 'wantToRead';
		});
		let read = books.filter(function(book) {
			return book.shelf === 'read';
		});

		return (
			<div className="app">
				<Switch>
					<Route
						exact
						path="/"
						render={() => (
							<div>
								<div className="books-header">
									<h1>My Book Place</h1>
								</div>
								<div className="books-content">
									<div>
										<Shelf
											title="Currently Reading"
											books={Reading}
											bookShelfChangeStatus={(book, newShelf) =>
												this.onBookUpdate(book, newShelf)
											}
										/>
										<Shelf
											title="Want to Read"
											books={wantToRead}
											bookShelfChangeStatus={(book, newShelf) =>
												this.onBookUpdate(book, newShelf)
											}
										/>
										<Shelf
											title="Read"
											books={read}
											bookShelfChangeStatus={(book, newShelf) =>
												this.onBookUpdate(book, newShelf)
											}
										/>
									</div>
								</div>
								<div className="open-search">
									<Link to="/search">Add a book</Link>
								</div>
							</div>
						)}
					/>
					<Route
						path="/search"
						render={() => (
							<Search
								booksOnShelf={books}
								bookShelfChangeStatus={(book, newShelf) =>
									this.onBookUpdate(book, newShelf)
								}
							/>
						)}
					/>
				</Switch>
			</div>
		);
	}
	onBookUpdate(book, shelf) {
		const updateBookIndex = this.state.books.findIndex(function(b) {
			return b.id === book.id;
		});
		const booksList = this.state.books;

		if (updateBookIndex > -1) {
			booksList[updateBookIndex].shelf = shelf;
		} else {
			book.shelf = shelf;
			booksList.push(book);
		}

		this.setState({
			books: booksList
		});

		BooksAPI.update(book, shelf);
	}
}

export default BooksApp;
