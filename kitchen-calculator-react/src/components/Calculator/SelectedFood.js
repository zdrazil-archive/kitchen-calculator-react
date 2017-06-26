import React from 'react';
import { ControlLabel, FormGroup, FormControl } from 'react-bootstrap';

function ConvertFrom(props) {
    return (
        <FormGroup>
            <ControlLabel>Food you've selected for conversion:</ControlLabel>
            <h5>Not Selected</h5>
        </FormGroup>
    );
}

export default ConvertFrom;
