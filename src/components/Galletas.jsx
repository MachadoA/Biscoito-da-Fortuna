import React, { useEffect, useState } from 'react';
import styles from './galletas.module.css';
import fechado from '.././img/cookie_with_coffe_mobile.jpg';
import closed from '.././img/cookie_with_coffe_desktop.jpg';
import aberto from '.././img/open_with_coffe_mobile.jpg';
import open from '.././img/open_with_coffe_desktop.jpg';
import Button from './Button';
import axios from 'axios';


export default function Galletas() {
  const [img, setImg] = useState(fechado);
  const [imgDesktop, setImgDesktop] = useState(closed);
  const [isVisible, setIsVisible] = useState(false);
  const [phrases, setPhrases] = useState([]);
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    const searchSentences = async () => {
      try {
        // const response = await axios.get('https://biscoito-sabedoria.netlify.app/data/phrases.json');
        const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';
        const response = await axios.get(`${baseUrl}/data/phrases.json`);
        
        const sentences = response.data;

        if (sentences.phrases && sentences.phrases.length > 0) {
          setPhrases(sentences.phrases);;
        }
      } catch (error) {
        console.error('Erro ao buscar frases:', error);
      }
    };

    searchSentences();
  }, [currentId]);

  const restart = () => {
    const imgOriginal = fechado;
    const imgMain = closed;
    setImg(imgOriginal);
    setImgDesktop(imgMain)
    setIsVisible(false);
  };


  const breakCookie = () => {
    const newId = Math.floor(Math.random() * phrases.length);
    setCurrentId(newId);
    const imgSegunda = aberto;
    const secondImg = open;
    setImg(imgSegunda);
    setImgDesktop(secondImg)
    setIsVisible(true);
  };

  return (
    <>
      <section className={styles.container}>
        <img src={img} alt="Biscoito" className={styles.imgMobile} />
        <img src={imgDesktop} alt="Biscoito" className={styles.imgDesktop} />
        <h1 className={styles.textPhrase} style={{ visibility: isVisible ? 'visible' : 'hidden' }}>{phrases[currentId] && phrases[currentId].phrase}</h1>
        <p className={styles.textAuthor} style={{ visibility: isVisible ? 'visible' : 'hidden' }}>Autor: {phrases[currentId] && phrases[currentId].author}</p>
        <div className={styles.btnDisplay}>
          <Button onClick={breakCookie} label="Abrir biscoito" />
          <Button onClick={restart} label="Reiniciar" />
        </div>
      </section>
    </>
  );
}
