import React from "react";
import { Form, Card } from 'react-bootstrap';
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