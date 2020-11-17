import React from 'react';
import styled from 'styled-components';
import Carousel from 'react-bootstrap/Carousel';
import resume from './images/carousel/resume.jpg';
import studying from './images/carousel/studying.jpg';
import working from './images/carousel/working.jpg';

const Styles = styled.div 
`
.carousel-img {
  max-width: 1300px;
  height: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.carousel {
  padding-bottom: 10em;
}

.caption {
  position: absolute;
  top: 80%;
  background-color: whitesmoke;
  display: inline-block;
  border-radius: 10px;
  text-align: center;
  align-items: center;
  height: 120px;
  opacity: 0.8;
}

.caption p {
  color: black;
}
`

export const CarouselHomepage = () => (
  
    <React.Fragment className="carousel">
      <Styles>
        <Carousel>
        <Carousel.Item>
            <img
            className="carousel-img"
            src={resume}
            alt="First slide"
            />
        </Carousel.Item>

        <Carousel.Item>
            <img
            className="carousel-img"
            src={studying}
            alt="Third slide"
            />
        </Carousel.Item>

        <Carousel.Item>
            <img
                className="carousel-img"
                src={working}
                alt="Third slide"
            />
        </Carousel.Item>
        </Carousel>
      </Styles>
    </React.Fragment>
)

export default CarouselHomepage;