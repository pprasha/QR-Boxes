import React, { useRef } from "react";
import ReactToPrint from 'react-to-print';
import QRCode from "qrcode.react";
import Barcode from "react-barcode";
import {Form, Card, Button} from 'react-bootstrap';
import "./Home.css"

const apiBaseUrl = "http://192.168.0.119:8000";
const baseUrl = "http://192.168.0.119:3000";

const items = [];
// const listItems = items.map((item) =>
//   <li key={item}>
//     {item}
//   </li>
// );
const itemsCopy = [];
const box_url = baseUrl + "/box/"


class Output extends React.Component {
  render() {
    if (this.props.response === "") {
      var barcodeValue = "00000000";
    } else {
      // eslint-disable-next-line
      var barcodeValue = this.props.response;
    }
    // eslint-disable-next-line
    var barcodeValue = barcodeValue;
    return (
    <div className="output">
      <h4>Box Id: {this.props.response}</h4>
      <h4>Box Url: <a class="boxUrl" href={box_url + this.props.response}> {box_url + this.props.response}</a></h4>
      <h4>QR Code:</h4>
      <QRCode value={box_url + this.props.response} />
      <h4>Barcode:</h4>
      <Barcode 
      value={barcodeValue}
      format="CODE39"
      width={2.20}
      height={90} 
      fontSize={15}
      />
    </div>
    );
  }
}

function List({ item, index, removeItem }) {
  return (
    <div
      className="todo"
      
    >
      <span>{index+1}. {item.text}</span>
      <div>
        <Button variant="outline-danger" onClick={() => removeItem(index)}>✕</Button>
      </div>
    </div>
  );
}

// function Output({item}) {
//   return (
//     <div className="output">
//       <h3>Output:</h3>
//       <h4>Box Id: {item.id}</h4>
//     </div>
//   )
// }

// function Output(id){
//   var QRCode = require('qrcode.react');
//   console.log(box_url + id)
//   return (
//     <div className="output">
//       <h3>Output:</h3>
//       <h4>Box Id: {id}</h4>
//       <h4>Box Url: <a>{box_url + id}</a></h4>
//       <h4>QR Code:</h4>
//       {/* <QRCode value={box_url + id} /> */}
//     </div>
//   );
// }

function Home() { 
  const equals = (a, b) =>
    a.length === b.length &&
    a.every((v, i) => v === b[i]);
  
  function generate_code(items) {
    var axios = require('axios');
    // ! gives opposite Boolean
    if (items.length !== 0 && !equals(itemsCopy, items)){
      var data = '{"list": ' + JSON.stringify(items) + '}';
      var config = {
        method: 'POST',
        url: apiBaseUrl +'/items/',
        headers: { 
          'Content-Type': 'text/plain'
        },
        data : data
      };
      // console.log(config)
    
      axios(config)
      .then(function (response) {
        for (var i = 0; i < items.length; i++) {
          itemsCopy[i] = items[i];
        }
        items.length = 0;
        const newItem = [    {
          text: "This is an sample item. (Will not be attached to generated code.)"
        }];
        setItems(newItem);
        const id = (JSON.stringify(response.data[0])).replace(/"/g, ""); // RegEx to match `"` characters, with `g` for globally (instead of once)
        setResponse(id);
      })
      .catch(function (error) {
        console.log(error);
      }); 
    } else {
      items.length = 0;
      const newItem = [    {
        text: "This is an sample item. (Will not be attached to generated code.)"
      }];
      setItems(newItem);
    }    
  }

  const componentRef = useRef();
  const [value, setValue] = React.useState("");
  const [listItems, setItems] = React.useState([
    {
      text: "This is an sample item. (Will not be attached to generated code.)"
    }
  ])
  const [response, setResponse] = React.useState("");

  const handleList = e => {  
    e.preventDefault();
    if (!value) return;
    // console.log(value)
    addItem(value);
    setValue("");
  }
  
  const addItem = text => {
    const newItem = [...listItems, { text }];
    items.push(text);
    setItems(newItem);
  };

  const removeItem = index => {
    const newItem = [...listItems];
    newItem.splice(index, 1);
    items.splice(index, 1)
    setItems(newItem);
  };

  return (
    // <div>
    //   <h1>What is QR Boxes?</h1>
    //   <h3>QR Boxes is a product that alaws user to track the contents of their boxes when they are moving or shipping packages from one place to another.</h3>
    // </div>

    <div>
      <h1>Welcome To QR Boxes!</h1>
      <h3>Get started creating your boxs' QR code below.</h3>
      <div className="arrow bounce"></div>
      {/* <div class="add_list_data">
        <input type="text" id="content" name="content" placeholder="List Item"></input>
        <button class="add" onClick={add_to_list}>
          Add
        </button>
      </div> */}
      <Form className="add_list_data form-inline" onSubmit={handleList}> 
        <Form.Group>
          <Form.Control type="text" className="content" id="content" value={value} onChange={e => setValue(e.target.value)} placeholder="List Item" />
          <button className="add" type="submit">
            Add
          </button>
        </Form.Group>
      </Form>
      <div>
        {listItems.map((item, index) => (
          <Card>
            <Card.Body>
              <List
              key={index}
              index={index}
              item={item}
              removeItem={removeItem}
              />
            </Card.Body>
          </Card>
        ))}
      </div>
      <div className="generate_qr_code">
          <button type="button" onClick={() => {generate_code(items)}}>
            Generate Code
          </button>
      </div>
      <div>
        <h3 className="output">Output:</h3>
        <Output ref={componentRef} response={response} />
        <ReactToPrint
          trigger={() => <button>Print this out!</button>}
          content={() => componentRef.current}
        />
      </div>

      {/* <div className="output">
       <h3>Output:</h3>
       <h4>Box Id: {response}</h4>
       <h4>Box Url: <a>{box_url + response}</a></h4>
       <h4>QR Code:</h4>
       <QRCode value={box_url + response} />
      </div> */}


      {/* <div>
        {listItems.map((item, index) => (
          <Output
            key={index}
            item={item}
          />
        ))}
      </div> */}
        {/* <h3>Box Id: {response.item}</h3> */}
        {/* <h4>Box Url: <a>{box_url + response.id}</a></h4> */}
        {/* <h4>QR Code:</h4> */}
        {/* <QRCode value={box_url + id} /> */}
      {/* <Form className="generate_qr_code" onSubmit={generate_qr_code(items)}> 
        <Form.Group>
          <button type="submit">
            Generate Code
          </button>
        </Form.Group>
      </Form> */}
    </div>
  );
}

export default Home;