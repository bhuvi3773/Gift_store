import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowLeft, ArrowRight, Close, Zoom } from './Icons.jsx';

export default function Lightbox({ images, index = 0, name, open, onClose }) {
  const [active, setActive] = useState(index);
  const closeRef = useRef(null);

  useEffect(() => {
    if (open) setActive(index);
  }, [open, index]);

  useEffect(() => {
    if (!open) return undefined;
    document.body.classList.add('is-locked');
    closeRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') setActive((current) => (current + 1) % images.length);
      if (event.key === 'ArrowLeft') setActive((current) => (current - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.classList.remove('is-locked');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, images.length, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${name} image gallery`}>
      <button type="button" className="lightbox__scrim" onClick={onClose} aria-label="Close gallery" tabIndex={-1} />
      <div className="lightbox__top">
        <span className="lightbox__label">
          <Zoom size={15} /> {name}
        </span>
        <button ref={closeRef} type="button" className="lightbox__close" onClick={onClose} aria-label="Close gallery">
          <Close size={22} />
        </button>
      </div>

      <div className="lightbox__stage">
        <button
          type="button"
          className="lightbox__nav lightbox__nav--prev"
          onClick={() => setActive((current) => (current - 1 + images.length) % images.length)}
          aria-label="Previous image"
        >
          <ArrowLeft size={22} />
        </button>
        <img src={images[active]} alt={`${name} — gallery view ${active + 1}`} />
        <button
          type="button"
          className="lightbox__nav lightbox__nav--next"
          onClick={() => setActive((current) => (current + 1) % images.length)}
          aria-label="Next image"
        >
          <ArrowRight size={22} />
        </button>
      </div>

      <div className="lightbox__bottom">
        <span className="lightbox__count">
          {active + 1} / {images.length}
        </span>
        <div className="lightbox__thumbs">
          {images.map((image, imageIndex) => (
            <button
              key={image}
              type="button"
              className={imageIndex === active ? 'is-active' : ''}
              onClick={() => setActive(imageIndex)}
              aria-label={`View image ${imageIndex + 1}`}
            >
              <img src={image} alt="" />
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}
