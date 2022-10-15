import React, { Component } from 'react';
import api from '../../service/pixabayApi';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';
import { List } from './ImageGallery.styled';
import propTypes from 'prop-types';
import Spinner from 'components/Spinner';

//в этом файле/компоненте делаю http 
//запросы(начинка пиксебейАпи импортируется внутри данного компонента)
export default class ImageGallery extends Component {
  static propTypes = {
    search: propTypes.string.isRequired,
    onClickToModal: propTypes.func.isRequired,
  };
  // в этом стейте хранятся данные, которые пришли с апишки(бэкэнда) после фетча
  state = {
    status: 'idle',
    error: null,
    images: [],
    page: 1,
  };
  //стреляет когда компонент обновляется(стейт)
  //search это имя пропса на 26 строке в арр(значение - this.state.currentSearch)
  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.search;
    const nextSearch = this.props.search;
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    //проверяю, если предыдущий пропс(значение в стейте) и текущий не равны - я делаю новый стейт
    //и фетч(строка 45 - апи)
    //с одной страницей и массивом картинок
    //данная проверка делается, чтобы компонент не зациклился
    if (prevSearch !== nextSearch) {
      this.setState({ page: 1, images: [] });
    }

    if (
      (prevSearch !== nextSearch && nextPage === 1) ||
      prevPage !== nextPage
    ) {
      this.setState({
        status: 'pending',
      });
      api(nextSearch, this.state.page)
        .then(resp => {
          this.setState(state => {
            return {
              images: [...state.images, ...resp.hits],
              status: 'resolved',
            };
          });
          this.scrollToBottom();
        })
        .catch(error => {
          this.setState({
            error: error.message,
            status: 'rejected',
            page: 1,
            images: [],
          });
        });
    }
  }

  onClickButton = () => {
    this.setState(state => ({
      page: state.page + 1,
    }));
  };

  scrollToBottom = () => {
    window.scrollTo({
      top: document.body.clientHeight,
      behavior: 'smooth',
    });
  };

  render() {
    const { status, error, images } = this.state;

    if (status === 'rejected') {
      return <h1>{error}</h1>;
    }

    return (
      //если в стейте длина массива картинок больше нуля, рендерится
      //список список, в котором формируются лишки (картинки)
      <>
        {images.length !== 0 && (
          <List>
            {images.map(({ id, webformatURL, tags, largeImageURL }) => {
              return (
                <ImageGalleryItem
                  key={id}
                  url={webformatURL}
                  tags={tags}
                  onClickToModal={this.props.onClickToModal}
                  largeImageURL={largeImageURL}
                />
              );
            })}
          </List>
        )}
        {status === 'pending' && <Spinner />}
        {status === 'resolved' && <Button onClickButton={this.onClickButton} />}
      </>
    );
  }
}