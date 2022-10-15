import React, { useState, useEffect } from 'react';
import api from '../../service/pixabayApi';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';
import { List } from './ImageGallery.styled';
import propTypes from 'prop-types';
import Spinner from 'components/Spinner';

//в этом файле делаю http запросы(начинка пиксебейАпи импортируется внутри данного компонента)
export default function ImageGallery({
  search,
  onClickToModal,
  page,
  setPage,
}) {
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);

    useEffect(() => {
    if (!search) return;

    if (page === 1) {
      setImages([]);
      setStatus('idle');
      setError(null);
    }

    setStatus('pending');
    api(search, page)
      .then(resp => {
        setImages(images => [...images, ...resp.hits]);
        setStatus('resolved');
        scrollToBottom();
      })
      .catch(error => {
        setError(error.message);
        setStatus('rejected');
        setImages([]);
      });
  }, [search, page]);

  const onClickButton = () => {
    setPage(1);
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.clientHeight,
      behavior: 'smooth',
    });
  };  

    if (status === 'rejected') {
      return <h1>{error}</h1>;
    }

    return (
      //если длина массива картинок больше нуля, рендерится
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
                  onClickToModal={onClickToModal}
                  largeImageURL={largeImageURL}
                />
              );
            })}
          </List>
        )}
        {status === 'pending' && <Spinner />}
        {status === 'resolved' && <Button onClickButton={onClickButton} />}
      </>
    );
}
  
  ImageGallery.propTypes = {
    search: propTypes.string.isRequired,
    onClickToModal: propTypes.func.isRequired,
};