import { createPortal } from 'react-dom';
import React, { useEffect } from 'react';
import { Overlay, ModalStyled } from './Modal.styled';
import propTypes from 'prop-types';


export default function Modal({ largeImg, closeModal }) {
  useEffect(() => {
    window.addEventListener('keydown', onPressKey);
    return () => window.removeEventListener('keydown', onPressKey);
  }, []);

  //закрывает модалку при нажатии вне картинки(на бэкдроп)
  const onClickOverlay = ({ target, currentTarget }) => {
    if (target === currentTarget) closeModal(null);
  };
  //функция для закрытия модалки по эскейпу
  const onPressKey = event => {
    if (event.code === 'Escape') closeModal(null);
  };

    return createPortal(
      <Overlay onClick={onClickOverlay}>
        <ModalStyled>
          <img src={largeImg} alt="big img" />
        </ModalStyled>
      </Overlay>,
      document.querySelector('#root-modal'),
    );
}
  
  Modal.propTypes = {
    largeImg: propTypes.string.isRequired,
    closeModal: propTypes.func.isRequired,
};