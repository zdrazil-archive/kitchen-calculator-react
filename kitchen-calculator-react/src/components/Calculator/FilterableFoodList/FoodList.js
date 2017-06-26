import React from 'react';
import ReactScrollableList from 'react-scrollable-list';
import { ControlLabel, FormGroup, FormControl } from 'react-bootstrap';

// function getFoodList(foodNames) {
//     const idList = foodNames.reduce((listItems, foodName) => {
//         const listItem = { id: foodName, content: <a>{foodName}</a>};
//         listItems.push(listItem);
//         return listItems
//     }, []);
//     return idList
// }

function getOptionList(foodItems) {
    const optionItems = foodItems.map((item) =>
        <option key={item} value={item}>{item}</option>
    );
    return optionItems;
}

class FoodList extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelection = this.handleSelection.bind(this);
    }

    handleSelection(e) {
        this.props.onSelectedFood(e.target.value);
    }

    render() {
        return (
            <FormGroup>
                <FormControl 
                    componentClass="select" 
                    id="convertToList" 
                    class="u-full-width" 
                    size="20" 
                    onChange={this.handleSelection}>
                        {getOptionList(this.props.foodList)}
                </FormControl>
            </FormGroup>
        )
    }
}

export default FoodList;
