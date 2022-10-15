import React, { useState } from 'react';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery';
import Modal from 'components/Modal';
import { AppStyled } from './App.styled.jsx';

export default function App() {
  const [modalNow, setModalNow] = useState(null);
  const [currentSearch, setCurrentSearch] = useState('');
  const [page, setPage] = useState(1);
  
  const onSubmit = search => {
    setCurrentSearch(search);
    setPage(1);
  };

  const onModal = url => {
    setModalNow(url);
  };

  const setNextPage = nextPage => {
    setPage(page => page + nextPage);
  };

    return (      
      <AppStyled>
        <Searchbar onSubmit={onSubmit} />
        <ImageGallery          
          search={currentSearch}
          onClickToModal={onModal}
          page={page}
          setPage={setNextPage}
        />
        {modalNow && <Modal largeImg={modalNow} closeModal={onModal} />}
      </AppStyled>
    );
  }

