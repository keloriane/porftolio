import React, { useEffect, useRef } from "react";
import BreathScene from "@/superHi/breath";

const Breath = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shaderSceneRef = useRef<BreathScene | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize the CatShaderScene
    shaderSceneRef.current = new BreathScene(canvasRef.current);

    // Cleanup when the component unmounts
    return () => {
      shaderSceneRef.current?.dispose();
      shaderSceneRef.current = null;
    };
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default Breath;
