import React, { Component } from 'react';
import axios from 'axios';

const dataEndPoint = 'https://firebasestorage.googleapis.com/v0/b/mikmak-code-challenge.appspot.com/o/inventory_report.js?alt=media&token=87ee3c73-1031-4974-9912-730f8aad664e';


class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      candyInfo: [],
      loaded: false,
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
      let revenue = Math.round(100 * (item.sold * productSpecifics.price))/100;
      productDetails.inventoryValue = inventoryValue;
      productDetails.revenue = revenue;

      // push each set of candy details to the arrayOfProducts array
      arrayOfProducts.push(productDetails);
    })

    // store the data in state
    this.setState({
      candyInfo: arrayOfProducts,
      loaded: true
    })
  }

  render() {
    const { candyInfo, loaded } = this.state;
    return (
      <>
      {loaded ? (
       <div>
         {/* <List candies={candyInfo}/> */}
         {candyInfo.map((candy) => {
           return (
           <div key={candy.sku} style={containerDivStyle}>
             <img src={candy.image} style={imageStyle}></img>
            <div style={{height: "100px"}}>
              <div>{candy.name}</div>
              <div>Number Sold {candy.sold}</div>
              <div>Revenue ${candy.revenue}</div>
              <br/>
              <div>Outstanding Inventory {candy.remainingStock}</div>
              <div>Inventory Value ${candy.inventoryValue}</div>
            </div>
           </div>)

         })}
       </div>
      ) : <div>Candy Information Loading</div>}
      </>
    );
  }
}

export default App;

const containerDivStyle = {
  display: "flex",
  flexDirection: "row",
  margin: "20px"
}

const imageStyle = {
  height: "100px",
  objectFit: "contain",
  margin: "10px"
}