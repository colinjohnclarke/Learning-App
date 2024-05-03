import React, { useState, useRef } from "react";
import AudioPlayButton from "./AudioPlayButton";
import AudioPauseButton from "./AudioPauseButton";

function AudioPlayerFromSanity({ data }) {
  const [playButtonPressed, setPlayButtonPressed] = useState(false);

  const asset = data[0]?.asset;
  const assetRefParts = asset?._ref.split("-");
  console.log("🚀 ~ AudioPlayerFromSanity ~ assetRefParts:", assetRefParts);

  const assetId = assetRefParts[1];
  const format = assetRefParts[2];
  const projectId = "bkqykpjz";
  const dataset = "production";

  const assetUrl = `https://cdn.sanity.io/files/${projectId}/${dataset}/${assetId}.mp3`;

  const [audio, setAudio] = useState(new Audio(assetUrl));

  const playAudio = () => {
    try {
      console.log("play");
      audio.play();
      setPlayButtonPressed(true);
    } catch (error) {
      console.log("audio cannot be played");
    }
  };

  const pauseAudio = () => {
    try {
      console.log("play");
      audio.pause();
      setPlayButtonPressed(false);
    } catch (error) {
      console.log("audio cannot be played");
    }
  };
  return (
    <>
      {!playButtonPressed ? (
        <AudioPlayButton playAudio={playAudio} />
      ) : (
        <AudioPauseButton pauseAudio={pauseAudio} />
      )}
    </>
  );
}

export default AudioPlayerFromSanity;
