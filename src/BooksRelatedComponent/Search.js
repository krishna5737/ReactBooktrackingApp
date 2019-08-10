import React, { Component } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import * as BooksAPI from './../BooksAPI';
import {debounce} from 'lodash';
export default class Search extends Component {
    state = {
        books: []
    };
    resetSearchResults() {
        this.setState({books: [] });
    }
    searchBooksRaw(query) {
        const { booksOnShelf } = this.props;
        if (query === '') {
            this.resetSearchResults();
        } else {
            BooksAPI.search(query).then((books) => {
                if (typeof books === 'undefined' || books.error === 'empty query')
                    return this.resetSearchResults();
                books.map(function(book) {
                    var bookIndex = booksOnShelf.findIndex(function(bookOnShelf) {
                        return bookOnShelf.id === book.id;
                    });
                    if (bookIndex > -1) {
                        book.shelf = booksOnShelf[bookIndex].shelf;
                    } else {
                        book.shelf = 'none';
                    }
                    return book;
                });
                this.setState({books: books});
            });
        }
    }
    searchBooks = debounce(query => {
        this.searchBooksRaw(query);
    }, 500)
    render() {
        const { bookShelfChangeStatus } = this.props;
        return (
            <div className="search-books">
                <SearchBar handleSearchQuery={(query) => this.searchBooks(query)} />
                <SearchResults
                    books={this.state.books}
                    bookShelfChangeStatus={function(book, newShelf) {
                        return bookShelfChangeStatus(book, newShelf);
                    }}
                />
            </div>
        );
    }
}