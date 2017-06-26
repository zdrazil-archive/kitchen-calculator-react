import React from 'react';
import { ControlLabel, FormGroup, FormControl } from 'react-bootstrap';


class AmountFrom extends React.Component {
    constructor(props) {
        super(props);
        this.handleNumberInputChange = this.handleNumberInputChange.bind(this);
    }

    handleNumberInputChange(e) {
        this.props.onNumberInputChange(e.target.value);
    }

    render() {
        return (
                <FormGroup>
                <ControlLabel>How much?</ControlLabel>
                <FormControl 
                        id="convertFromValue" 
                        type="number" 
                        name="convertFromValue" 
                        min="0" 
                        max="Number.MAX_SAFE_INTEGER" 
                        step="any" 
                        onChange={this.handleNumberInputChange} />
                </FormGroup>
        )
    }
}

export default AmountFrom;
