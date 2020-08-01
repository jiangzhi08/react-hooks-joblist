import React, { useEffect } from "react";
import QRCode from "qrcode";
import { Container } from "react-bootstrap";
import AddForm from "./AddForm";

export default function QRCodeGeneration() {
  const generateQR = async (text) => {
    try {
      let canvas = document.getElementById("canvas");
      await QRCode.toCanvas(canvas, text);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    generateQR("https://awesome-darwin-99824f.netlify.app/");
  }, []);

  return (
    <Container className="my-4">
      <AddForm generateQR={generateQR} />
      <canvas id="canvas"></canvas>
    </Container>
  );
}
