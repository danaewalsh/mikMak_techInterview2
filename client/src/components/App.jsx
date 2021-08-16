import React, { Component } from 'react';
import axios from 'axios';
const dataEndPoint = 'https://firebasestorage.googleapis.com/v0/b/mikmak-code-challenge.appspot.com/o/inventory_report.js?alt=media&token=87ee3c73-1031-4974-9912-730f8aad664e';


class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      candyInfo: [],
    }
    this.formatData = this.formatData.bind(this);
  }

  componentDidMount() {
    // pull candy data from the end point
    axios.get(dataEndPoint)
    .then(({data}) => {
      // formatData function creates a more useable array data structure and assigns it to state
      this.formatData(data.inventory_report, data.product_info);
    })
  }

  formatData(inventoryReport, productInfo) {
    let arrayOfProducts = [];
    inventoryReport.forEach((item) => {
      let sku = item.sku;
      let productSpecifics = productInfo[sku];
      let productDetails = {
        ...productSpecifics,
        ...item
      }

      // create and add the last info for each candy (inventoryValue)
      let inventoryValue = Math.round(100 * (item.remainingStock * productSpecifics.price))/100;
      productDetails.inventoryValue = inventoryValue;

      // push each set of candy details to the arrayOfProducts array
      arrayOfProducts.push(productDetails);
    })

    // store the data in state
    this.setState({
      candyInfo: arrayOfProducts
    })
  }

  render() {
    return (
      <div>
        Hello World
      </div>
    );
  }
}

export default App;