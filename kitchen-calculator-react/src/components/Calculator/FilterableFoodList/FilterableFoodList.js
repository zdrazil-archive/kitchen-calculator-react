import React from 'react';
import SearchInput from './SearchInput';
import FoodList from './FoodList';


class FilterableFoodList extends React.Component {
    constructor(props) {
       super(props);
        this.state = {
            filterText: '',
            selectedFood: '',
            foodList: ['abc']
        };

       this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
       this.handleSelectedFood = this.handleSelectedFood.bind(this);
    }

    componentDidMount() {
        this.getFoodList(this.state.filterText);
    }

    handleFilterTextInput(filterText) {
        this.setState({
            filterText: filterText
        });
        this.getFoodList(filterText);
    }

    handleSelectedFood(selectedFood) {
        this.props.onSelectedFood(selectedFood);
    }


    getFoodList(query) {
        const url = '/foods/search?query=' + query;
        fetch(url)
            .then(
            response => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response
                response.json().then( data => {
                    this.setState({
                        foodList: data
                    });
                });
            }
        )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });

    }

    render() {
        return (
            <div className="Filterable-food-list">
                <SearchInput 
                    filterText={this.state.filterText}
                    onFilterTextInput = {this.handleFilterTextInput} />
                <FoodList 
                    foodList={this.state.foodList}
                    onSelectedFood = {this.handleSelectedFood} />
            </div>
        )
    }
}

export default FilterableFoodList;