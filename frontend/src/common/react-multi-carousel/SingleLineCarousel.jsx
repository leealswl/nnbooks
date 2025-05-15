import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CarouselCard from "../BookCard/CarouselCard";
import "../../styles/SingleLineCarousel.style.css";

const SingleLineCarousel = ({ books, libraryBookStatus }) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div>
      <div>
        <Carousel
          infinite={true}
          centerMode={true}
          itemClass="book-slider p-1"
          containerClass="carousel-container"
          responsive={responsive}
          libraryBookStatus={libraryBookStatus}
        >
          {books?.map((book) => (
            <CarouselCard bookID={book.bookID} key={book.bookID} libraryBookStatus={libraryBookStatus}/>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default SingleLineCarousel;
