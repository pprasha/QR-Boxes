import React from "react";
// import BarcodeScannerComponent from "react-webcam-barcode-scanner";
// import Scanner from "./Scanner";
import { Form, Card, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";

const apiBaseUrl = "http://192.168.0.119:8000";
// const baseUrl = "http://192.168.0.119:3000";

var previousBoxId;

// Add removeItem when ready.
function List({ item, index}) {
    return (
      <div
        className="todo"
        
      >
        <span>{index+1}. {item}</span>
        {/* <div>
          <Button variant="outline-danger" onClick={() => removeItem(index)}>✕</Button>
        </div> */}
      </div>
    );
}

function Box() {
    var [boxId, setBoxId] = React.useState("")
    const { box_id } = useParams();
    const [listItems, setItems] = React.useState(["Sample Items (Will disapear when you enter box id.)"])

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

    const getListData = (e) => {
        if (previousBoxId !== boxId) {
            if (e !== undefined){
                e.preventDefault();
            }
            var axios = require('axios');
            var data = boxId;
            if (!boxId) return;
            var config = {
            method: 'GET',
            url: apiBaseUrl + '/box/' + data,
            headers: { }
            };
            // console.log(config)
        
            axios(config)
            .then(function (response) {
                // setItems("");
                previousBoxId = data;
                var responseData = JSON.parse(JSON.stringify(response.data[0]));
                responseData = responseData.replace(/'/g, '"');
                responseData = JSON.parse(responseData)
                console.log(responseData)
                var newId = []
                for (var i in responseData){
                    newId.push(responseData[i])
                    // console.log(i)
                    // addItem(String(responseData[i]))
                    // addItem(responseData[i]);
                }
                setItems(newId);
                // console.log(JSON.stringify(response.data[0]));
            })
            .catch(function (error) {
            console.log(error);
            });
        }
    }

    if (box_id !== undefined) {
        // setBoxId(boxId)
        // getListData
        boxId = box_id
        getListData();
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
                    <Form.Control type="text" className="content" id="content" value={boxId} onChange={e => setBoxId(e.target.value)} placeholder="Box Id" />
                    <button className="add" type="submit">
                        Get
                    </button>
                </Form.Group>
            </Form>

            {/* variant="primary" was previous style of below Button */}
            {/* <Button onClick={handleShow}>
                Scanner
            </Button> */}
            <button onClick={handleShow}>
                Scanner
            </button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header className="close">
                <Modal.Title>Scanner</Modal.Title>
                <button type="button" class="btn-close" aria-label="Close" onClick={handleClose} ></button>
                </Modal.Header>
                <Modal.Body>
                    The scanning feature is not avalible yet. When the feature is ready it will only be avalible on the app. For now you can use your default scanner for the qr codes and the barcodes can only be used for refrence purposes since it requires the app that will be avalible in the near future. We apologize in advance for any inconveniences this may present. Want to get notified when the app launches and the scanning feature is avalible, fill out the form below.
                    <iframe title="QR Boxes App Notification Form" src="https://docs.google.com/forms/d/e/1FAIpQLSfzD_99hCM4-Gtp-e5h1vE4E0CI9Lg0fnjoX4RAxLQoclcplw/viewform?embedded=true" width="100%" height="995" frameborder="0" marginheight="0" marginwidth="0" scrolling="no">Loading…</iframe>
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
            <h2>Box Id: { boxId }</h2>
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

        </div>
    );
}

export default Box;