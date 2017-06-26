import React from 'react';
import { ControlLabel, FormGroup, FormControl } from 'react-bootstrap';


class SearchInput extends React.Component {
    constructor(props) {
       super(props);
       this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
    }

    handleFilterTextInputChange(e) {
        this.props.onFilterTextInput(e.target.value);
    }

    render() {
        return (
            <FormGroup>
                <ControlLabel for="foodToConvert">Search for food to convert:</ControlLabel>
                <FormControl 
                    type="search"
                    name="foodSearch" 
                    value={this.props.filterText}
                    onChange={this.handleFilterTextInputChange} />
            </FormGroup>
        );
    }
}
        

export default SearchInput;
