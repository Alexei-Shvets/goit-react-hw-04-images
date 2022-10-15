import { createPortal } from 'react-dom';
import React, { Component } from 'react';
import { Overlay, ModalStyled } from './Modal.styled';
import propTypes from 'prop-types';

export default class Modal extends Component {
  static propTypes = {
    largeImg: propTypes.string.isRequired,
    closeModal: propTypes.func.isRequired,
  };
  //вешаем слушателя на виндов, чтобы вызвать функцию онПрессКей
  componentDidMount() {
    window.addEventListener('keydown', this.onPressKey);
  }
  //размонтирование происходит сразу после нажатия эскейп, снимает слушателя
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onPressKey);
  }
  //закрывает модалку при нажатии вне картинки(на бэкдроп)
  onClickOverlay = ({ target, currentTarget }) => {
    if (target === currentTarget) this.props.closeModal(null);
  };
  //функция для закрытия модалки по эскейпу
  onPressKey = event => {
    if (event.code === 'Escape') this.props.closeModal(null);
  };

  render() {
    return createPortal(
      <Overlay onClick={this.onClickOverlay}>
        <ModalStyled>
          <img src={this.props.largeImg} alt="big img" />
        </ModalStyled>
      </Overlay>,
      document.querySelector('#root-modal'),
    );
  }
}