import React from 'react';
import {FormControl, FormGroup, Grid, Row, Col} from 'react-bootstrap';

import FilterableFoodList from './FilterableFoodList';
import Amount from './ConversionSettings/Amount';
import ConvertFrom from './ConversionSettings/ConvertFrom';
import ConvertTo from './ConversionSettings/ConvertTo';
import ResetButton from './ResetButton';
import ResultAmount from './ResultAmount';



function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
}

function isRightObject(object, value) {
    return getKeyByValue(object, value) != undefined;
}



class CalculatorForm extends React.Component {
    constructor(props) {
        super(props);

        const convertFrom = [1, 2, 3];
        const convertTo = {
            grams: 1,
            miligrams: 1000,
            kilograms: 0.001,
            ounce: 0.035274,
            pounds: 0.0022046
        };


        this.handleSelectedFood = this.handleSelectedFood.bind(this);
        this.handleAmountValue = this.handleAmountValue.bind(this);
        this.handleSelectedFromValue = this.handleSelectedFromValue.bind(this);
        this.handleSelectedToValue = this.handleSelectedToValue.bind(this);



        this.state = {
            foodUnits: [],
            selectedFoodUnit: {},
            convertFrom: convertFrom,
            selectedFood: '',
            selectedConvertFrom: '',
            selectedConvertTo: '',
            convertTo: convertTo,
            amountValue: 0
        }
    }

    getFoodInfo(foodName) {
        const url = 'food?name=' + foodName;
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
                            foodUnits: data
                        });
                        this.setConvertFrom(this.state.foodUnits);
                    });
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });

    }

    setConvertFrom(foodUnits) {
        this.setState({
            convertFrom: foodUnits.map(item => item['msre_desc'])
        });
    }

    setUnitInfo(foodUnits, unit_desc) {
        const selectedFoodUnit = foodUnits.filter(item => isRightObject(item, unit_desc));
        this.setState({
            selectedFoodUnit: selectedFoodUnit[0]
        });
    }

    handleSelectedFood(foodName) {
        this.setState({
            selectedFood: foodName
        });
        this.getFoodInfo(foodName);

        this.setState({
            selectedFoodUnit: this.state.foodUnits[0],
            selectedConvertTo: this.state.convertTo["grams"]
        });
    }

    handleAmountValue(amountValue) {
        this.setState({
            amountValue: amountValue
        })
    }

    handleSelectedFromValue(selectedConvertFrom) {
        this.setState({
            selectedConvertFrom: selectedConvertFrom
        });
        this.setUnitInfo(this.state.foodUnits, selectedConvertFrom);
    }
    
    handleSelectedToValue(selectedConvertTo) {
        this.setState({
            selectedConvertTo: selectedConvertTo
        })
    }
    
   
    render() {
        return (
            <form>
                <Grid>
                    <Row className="show-grid">
                        <Col md={5} sm={6}>
                            <FilterableFoodList
                                onSelectedFood={this.handleSelectedFood} />
                        </Col>
                        <Col md={3} sm={6}>
                            <ConvertFrom
                                options={this.state.convertFrom}
                                onSelectedValue={this.handleSelectedFromValue}/>
                            <Amount
                                amountValue={this.state.amountValue}
                                onNumberInputChange={this.handleAmountValue} />
                            <ConvertTo 
                                options={this.state.convertTo}
                                onSelectedValue={this.handleSelectedToValue} /> 
                        </Col>
                        <Col md={3} sm={6} smOffset={3} mdOffset={0}>
                            <ResetButton />
                            <ResultAmount />
                        </Col>
                    </Row>
                </Grid>
            </form>
        );
    }
}

export default CalculatorForm;
