import React, { Component } from 'react';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal';
import { AppStyled } from './App.styled.jsx';

export default class App extends Component {
  state = {
    modalNow: null,
    currentSearch: '',
  };
  //метод(вызывется в самой форме), который при сабмите формы переносит
  //введенные/сохраненные данные из стейта серчбара в стейт арр
  onSubmit = search => {
    this.setState({ currentSearch: search });
  };

  onModal = url => {
    this.setState({ modalNow: url });
  };

  render() {
    const { modalNow } = this.state;

    return (
      //onSubmit - на 13 строке это имя пропса (идет передача аргумента в функцию)
      <AppStyled>
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery
          //при сабмите формы и обновления стейта из арр
          //новые данные сетятся(записываются) в проп на 32 строке
          search={this.state.currentSearch}
          onClickToModal={this.onModal}
        />
        {modalNow && <Modal largeImg={modalNow} closeModal={this.onModal} />}
      </AppStyled>
    );
  }
}
