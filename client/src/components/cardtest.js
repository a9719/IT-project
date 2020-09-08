import React from 'react';
import {Card, Nav, Button} from 'react-bootstrap';
import styled from 'styled-components';
import image from './blank-profile.png';


export const testCard = () => (
    <Nav>
        <Nav.Link href="/register">
            <Card style={{ width: '19rem' }}>
                <Card.Img variant="top" src={image} />
                <Card.Header> Jonh doe </Card.Header>
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