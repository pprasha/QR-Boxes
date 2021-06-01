import React, { useRef } from "react";
// import BarcodeScannerComponent from "react-webcam-barcode-scanner";
// import Scanner from "./Scanner";
import ReactToPrint from "react-to-print";
import QRCode from "qrcode.react";
import Barcode from "react-barcode";
import { Form, Card, Modal, Container, Row, Col } from "react-bootstrap";
import { useParams, useHistory } from "react-router-dom";
import "./Box.css";

const apiBaseUrl = "http://192.168.0.102:8000";
const baseUrl = "https://192.168.0.102:3000";

const box_url = baseUrl + "/box/";

var previousBoxId;

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
      <div className="output infoOutput">
        <h4>Box Id: {this.props.response}</h4>
        <h4>
          Box Url:{" "}
          <a class="boxUrl" href={box_url + this.props.response}>
            {" "}
            {box_url + this.props.response}
          </a>
        </h4>
        <h4>QR Code:</h4>
        <QRCode value={box_url + this.props.response} />
        <h4>Barcode:</h4>
        <Barcode
          value={barcodeValue}
          format="CODE39"
          width={2.2}
          height={90}
          fontSize={15}
        />
      </div>
    );
  }
}

// Add removeItem when ready.
function List({ item, index }) {
  return (
    <div className="todo">
      <span>
        {index + 1}. {item}
      </span>
      {/* <div>
          <Button variant="outline-danger" onClick={() => removeItem(index)}>✕</Button>
        </div> */}
    </div>
  );
}

function Box() {
  var [boxId, setBoxId] = React.useState("");
  var { box_id } = useParams();
  const [listItems, setItems] = React.useState([
    "Sample Items (Will disapear when you enter box id.)",
  ]);
  var [boxIdDisplay, setBoxIdDisplay] = React.useState("");

  const history = useHistory();
  const componentRef = useRef();

  // const [infoStatus, setInfoStatus] = React.useState(false);

  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const scanData = {
  //     scanCode: ''
  // };

  // function scan(code) {
  //     scanData.scanCode = code
  //     console.log(code)
  // }

  // function infoStatusChange() {
  //     if (infoStatus === true) {
  //         // eslint-disable-next-line
  //         console.log(boxIdDisplay)
  //         setInfoStatus(!infoStatus);
  //         return (
  //             <div>
  //                 <h2>hi</h2>
  //                 <Output response={boxIdDisplay} />
  //             </div>
  //         );
  //     } else {
  //         console.log(infoStatus)
  //         setInfoStatus(!infoStatus);
  //         // document.getElementById("infoOutput").remove()
  //     }
  // }

  const getListData = (e) => {
    if (previousBoxId !== boxId) {
      if (e !== undefined) {
        e.preventDefault();
      }
      var axios = require("axios");
      // var data = boxId;
      if (!boxId) return;
      var config = {
        method: "GET",
        url: apiBaseUrl + "/box/" + boxId,
        headers: {},
      };
      // console.log(config)

      axios(config)
        .then(function (response) {
          // setItems("");
          setBoxIdDisplay("");
          // console.log(boxId)
          previousBoxId = boxId;
          setBoxIdDisplay(boxId);
          setBoxId("");
          var responseData = JSON.parse(JSON.stringify(response.data[0]));
          responseData = responseData.replace(/'/g, '"');
          responseData = JSON.parse(responseData);
          // console.log(responseData)
          var newId = [];
          for (var i in responseData) {
            newId.push(responseData[i]);
            // console.log(i)
            // addItem(String(responseData[i]))
            // addItem(responseData[i]);
          }
          setItems(newId);
          // console.log(JSON.stringify(response.data[0]));
        })
        .catch(function (error) {
          console.log(error);
          setBoxId("");
          alert("Incorrect ID or the service is down.");
        });
    } else {
        setItems(listItems);
        // document.getElementById("#content").select();
    }
  };

  if (box_id !== undefined) {
    // setBoxId(boxId)
    // getListData
    if (previousBoxId !== box_id) {
      boxId = box_id;
      history.push("/box");
      getListData();
    }
  }

  // const addItem = text => {
  //     console.log(text);
  //     const newItem = [...listItems, { text }];
  //     console.log(newItem)
  //     setItems(newItem);
  // };

  // const removeItem = index => {
  //     const newItem = [...listItems];
  //     newItem.splice(index, 1);
  //     setItems(newItem);
  // };

  return (
    <div>
      <Form className="add_list_data form-inline" onSubmit={getListData}>
        <Form.Group>
          <Form.Control
            type="text"
            className="content"
            id="content"
            value={boxId}
            onChange={(e) => setBoxId(e.target.value)}
            placeholder="Box Id"
            autoFocus={true}
          />
          <button className="add" type="submit">
            Get
          </button>
        </Form.Group>
      </Form>

      {/* variant="primary" was previous style of below Button */}
      {/* <Button onClick={handleShow}>
                Scanner
            </Button> */}
      <button onClick={handleShow}>Scanner</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="close">
          <Modal.Title>Scanner</Modal.Title>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            onClick={handleClose}
          ></button>
        </Modal.Header>
        <Modal.Body>
          The scanning feature is not avalible yet. When the feature is ready
          for online use, it will only be avalible on the app. For now you can
          use your default scanner for the qr codes and the barcodes can only be
          used for refrence purposes since it requires the app that will be
          avalible in the near future. For now you can purchase and use a
          scanner from the recommended scanners list to achive the same thing.
          We apologize in advance for any inconveniences this may present. Want
          to get notified when the app launches and the scanning feature is
          avalible, fill out the form below.
          <iframe
            title="QR Boxes App Notification Form"
            src="https://docs.google.com/forms/d/e/1FAIpQLSfzD_99hCM4-Gtp-e5h1vE4E0CI9Lg0fnjoX4RAxLQoclcplw/viewform?embedded=true"
            width="100%"
            height="995"
            frameborder="0"
            marginheight="0"
            marginwidth="0"
            scrolling="no"
          >
            Loading…
          </iframe>
        </Modal.Body>
        {/* <Scanner handleScan={scan} /> */}
        {/* <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSfzD_99hCM4-Gtp-e5h1vE4E0CI9Lg0fnjoX4RAxLQoclcplw/viewform?embedded=true" width="480" height="1161" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe> */}
        <Modal.Footer>
          <button variant="secondary" onClick={handleClose}>
            Close
          </button>
          {/* <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button> */}
          {/* <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button> */}
        </Modal.Footer>
      </Modal>
      {/* <BarcodeScannerComponent
                width={500}
                height={500}
                onUpdate={(err, result) => {
                if (result) setData(result.text)
                else setData('Not Found')
                }}
            />
            <p>{data}</p> */}
      <h2>Box Id: {boxIdDisplay}</h2>
      <div>
        {listItems.map((item, index) => (
          <Card>
            <Card.Body>
              <List
                key={index}
                index={index}
                item={item}
                // removeItem={removeItem}
              />
            </Card.Body>
          </Card>
        ))}
      </div>
      {/* <button onClick={infoStatusChange}>
                Info
            </button> */}
      <div>
        <h3 className="Info">Info:</h3>
        <Output ref={componentRef} response={boxIdDisplay} />
        <ReactToPrint
          trigger={() => <button>Print this out!</button>}
          content={() => componentRef.current}
        />
      </div>
      <h4 className="recommended-scanners">Recommended Scanners</h4>
      <Container className="amazon-products">
        <Row>
          <Col>
            <iframe
              title="amazon"
              width="120px"
              height="240px"
              marginwidth="0"
              marginheight="0"
              scrolling="no"
              frameborder="0"
              src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=qf_sp_asin_til&ad_type=product_link&tracking_id=qrboxes0b-20&marketplace=amazon&amp;region=US&placement=B00LE5VV1C&asins=B00LE5VV1C&linkId=5c3134d11d927aa1e6f2edd81e3a37d1&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"
            ></iframe>
          </Col>
          <Col>
            <iframe
              title="amazon"
              width="120px"
              height="240px"
              marginwidth="0"
              marginheight="0"
              scrolling="no"
              frameborder="0"
              src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=qf_sp_asin_til&ad_type=product_link&tracking_id=qrboxes0b-20&marketplace=amazon&amp;region=US&placement=B07CBRTWS5&asins=B07CBRTWS5&linkId=a13621c4413d57fa23449ce291246c31&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"
            ></iframe>
          </Col>
          <Col>
            <iframe
              title="amazon"
              width="120px"
              height="240px"
              marginwidth="0"
              marginheight="0"
              scrolling="no"
              frameborder="0"
              src="//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ac&ref=qf_sp_asin_til&ad_type=product_link&tracking_id=qrboxes0b-20&marketplace=amazon&amp;region=US&placement=B01GDJ2BH6&asins=B01GDJ2BH6&linkId=62475f9c7d34bad9b15c45cf33db1601&show_border=true&link_opens_in_new_window=true&price_color=333333&title_color=0066c0&bg_color=ffffff"
            ></iframe>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Box;
