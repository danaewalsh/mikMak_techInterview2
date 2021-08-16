import React, { Component } from 'react';
const dataEndPoint = 'https://firebasestorage.googleapis.com/v0/b/mikmak-code-challenge.appspot.com/o/inventory_report.js?alt=media&token=87ee3c73-1031-4974-9912-730f8aad664e';


class App extends Component {
  constructor (props) {
    super(props);
    this.state = {

    }
  }

  async componentDidMount() {
    let response = await fetch(dataEndPoint);
    let data = await response.json();
    console.log('data', data)
  }

  formatData() {

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