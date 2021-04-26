import React from "react";
import QRCode from "qrcode.react";

const box_url = "http://127.0.0.1:8000/box/"

function Output(props) {
  return (
    <div className="output">
        <h3>Output:</h3>
        <h4>Box Id: {props.response}</h4>
        <h4>Box Url: <a href={box_url + props}> {box_url + props.response}</a></h4>
        <h4>QR Code:</h4>
        <QRCode value={box_url + props.response} />
    </div>
  );
}

export default Output;