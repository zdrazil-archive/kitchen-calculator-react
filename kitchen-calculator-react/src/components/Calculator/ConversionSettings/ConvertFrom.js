import React from 'react';
import { ControlLabel, FormGroup, FormControl } from 'react-bootstrap';

function getOptionList(options) {
    const optionItems = options.map((item) =>
        <option key={item.toString()}>{item}</option>
    );

    return optionItems;
}


class ConvertFrom extends React.Component {
    constructor(props) {
       super(props);
       this.handleFromValueSelected = this.handleFromValueSelected.bind(this);
    }

    handleFromValueSelected(e) {
        this.props.onSelectedValue(e.target.value);
    }

    render() {
        return (
            <FormGroup>
                <ControlLabel>Convert from:</ControlLabel>
                <FormControl 
                    componentClass="select" 
                    id="convertFromList" 
                    className="u-full-width"
                    onChange={this.handleFromValueSelected}
                    >
                    {getOptionList(this.props.options)}
                </FormControl>
            </FormGroup>
        );
    }
}

export default ConvertFrom;
