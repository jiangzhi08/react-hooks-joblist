import React, { useEffect } from "react";
import QRCode from "qrcode";
import { Container } from "react-bootstrap";
import AddForm from "./AddForm";

export default function QRCodeGeneration() {
  var canvas = document.getElementById("canvas");
  const generateQR = async (text) => {
    try {
      await QRCode.toCanvas(canvas, text);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container className="my-4">
      <AddForm generateQR={generateQR} />
      <canvas id="canvas"></canvas>
    </Container>
  );
}
