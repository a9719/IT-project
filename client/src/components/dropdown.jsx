import React from 'react'
import {Card, Accordion, CardGroup} from 'react-bootstrap'

export const dropdown = props => (
    <Accordion>
        <Card >
            <Accordion.Toggle as = {Card.Body} eventKey = '0'>
                <h2 style={{textAlign: 'center', paddingBlock:'10px',fontFamily:'Times New Roman'}}>{props.header} </h2>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
                <Card.Body>{props.info}</Card.Body>
            </Accordion.Collapse>
        </Card>
    </Accordion>        
    )
export default dropdown;