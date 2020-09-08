import React from 'react';
import {Card, Nav} from 'react-bootstrap';
import image from './blank-profile.png';

import "./thumbnailsize.css"


export const testCard = props => (
    <Nav>
        <Nav.Link href={props.link}>
            <Card style={{ width: '22rem' }}>
                <Card.Img src={image} alt/>
                <Card.Header> {props.name} </Card.Header>
                <Card.Body>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                </Card.Body>
            </Card>
        </Nav.Link>
    </Nav>
  )
  
  export default testCard;