import React, { useState, useEffect } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import Styles from "../../styles/Gallery.module.css"
import { motion, AnimatePresence } from "framer-motion"

const Gallery = ({ photos }) => {
  const [current, setCurrent] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const length = photos?.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const selectImage = (index) => {
    setCurrent(index);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  // Add a scroll event listener that closes the modal when scrolling happens
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        closeModal();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  if (!Array.isArray(photos) || photos.length <= 0) {
    return null;
  }

  return (
    <div>
      <section className={Styles.slider}>
        <AiOutlineLeft className={Styles.leftArrow} onClick={prevSlide} />
        <AiOutlineRight className={Styles.rightArrow} onClick={nextSlide} />
        {photos.map((photo, index) => {
          return (
            <div
              className={Styles.slide}
              key={index}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              {index === current && (
                <motion.img
                  src={photo}
                  alt='image'
                  className={Styles.image}
                  layoutId={`expandImage-${index}`}  // Add unique layoutId for each image
                  onClick={openModal}
                />
              )}
            </div>
          );
        })}
      </section>
      <section className="flex gap-2 flex-wrap mt-3 no-scrollbar">
        {photos.map((photo, index) => {
          return (
            <div className='flex' key={index} onClick={() => selectImage(index)}>
              <img src={photo} alt='' className={`h-24 w-24 rounded-lg object-cover cursor-pointer mr-2 ${current === index ? "border-2 border-primary" : ""}`} />
            </div>
          );
        })}
      </section>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`${Styles.modal} ${isOpen ? Styles.open : ''}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <span className={Styles.close} onClick={(e) => { e.stopPropagation(); closeModal(); }}>&times;</span>
            <motion.img
              className={`${Styles.modalContent} ${isOpen ? Styles.open : ''}`}
              src={photos[current]}
              alt="Selected"
              layoutId={`expandImage-${current}`} // Use the same unique layoutId for the current image
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;