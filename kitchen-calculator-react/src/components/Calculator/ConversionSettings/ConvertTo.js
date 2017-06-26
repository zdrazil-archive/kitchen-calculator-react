import React from 'react';
import { ControlLabel, FormGroup, FormControl } from 'react-bootstrap';

function getOptionList(options) {
    const optionItems = Object.keys(options).map((key) =>
        <option key={key} value={options[key]}>{key}</option>
    );
    
    return optionItems;
}

class ConvertTo extends React.Component {
    constructor(props) {
       super(props);
       this.handleToValueSelected = this.handleToValueSelected.bind(this);
    }

    handleToValueSelected(e) {
        this.props.onSelectedValue(e.target.value);
    }

    render() {
        return (
                <FormGroup>
                    <ControlLabel>Convert to:</ControlLabel>
                    <FormControl 
                        componentClass="select" 
                        id="convertToList" 
                        class="u-full-width"
                        onChange={this.handleToValueSelected}
                        >
                            {getOptionList(this.props.options)}
                    </FormControl>
                </FormGroup>
            );
    }
}

export default ConvertTo;