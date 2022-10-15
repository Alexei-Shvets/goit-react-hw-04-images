import React, { Component } from 'react';
import { SearchbarStyled } from './Searchbar.styled';
import { AiOutlineSearch } from 'react-icons/ai';
import propTypes from 'prop-types';
export default class Searchbar extends Component {
  state = {
    search: '',
  };

  handleInputSearch = ({ target }) => {
    return this.setState({ [target.name]: target.value });
  };
  //метод, который записывает/сохраняет в локальный стейт на 6 строке
  //введенные данныe. На 20 строке условие, если в инпут ничего не введено, 
  //то выводится алерт
  submitForm = event => {
    event.preventDefault();
    const { search } = this.state;
    //метод трим убираем пробелы слева-справа, чтобы не обхитрили пользователи
    if (search.trim() === '') return alert('You do not write anything');
    //при сабмите этой формы, вызывается метод из арр(13 строка) onSubmit(строка вызова в арр - 27) и 
    //передается ему значение сохраненное в стейте формы
    this.props.onSubmit(search);
    this.setState({ search: '' });
  };
  // onSubmit на 32 - это регистрация события на компоненте форм.
  render() {
    const { search } = this.state;
    return (
      <SearchbarStyled>
        
        <form onSubmit={this.submitForm}>
          <button type="submit">
            <AiOutlineSearch stroke="black" size={25} />
          </button>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos 📷"
            name="search"
            value={search}
            onChange={this.handleInputSearch}
          />
        </form>
      </SearchbarStyled>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};