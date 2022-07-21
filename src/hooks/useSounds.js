import { useState, useEffect, useRef } from "react";
import * as Tone from "tone";

import Tom from "assets/Tom.wav";
import Tamborine from "assets/Tamborine.wav";
import Loops from "assets/Loops.wav";
import Crash from "assets/Crash.wav";

export default function useSound() {
  const mySampler = useRef(null);

  const [isTomPlayed, isTomPlayedChange] = useState(false);
  const [isTamborinePlayed, isTamborinePlayedChange] = useState(false);
  const [isLoopsPlayed, isLoopsPlayedChange] = useState(false);
  const [isCrashPlayed, isCrashPlayedChange] = useState(false);

  useEffect(() => {
    const sampler = new Tone.Sampler({
      C4: Tom,
      "D#4": Tamborine,
      "F#4": Loops,
      A4: Crash,
    }).toDestination();

    Tone.loaded().then(() => {
      mySampler.current = sampler;
    });
  }, []);

  function soundPlay(note) {
    mySampler.current.triggerAttackRelease([note], 4);
  }

  function handleKeyDown({ key }) {
    switch (key) {
      case "a":
        isTomPlayedChange(true);
        window.setTimeout(() => isTomPlayedChange(false), 300);
        soundPlay("C4");
        break;
      case "z":
        isTamborinePlayedChange(true);
        window.setTimeout(() => isTamborinePlayedChange(false), 300);
        soundPlay("D#4");
        break;
      case "e":
        isLoopsPlayedChange(true);
        window.setTimeout(() => isLoopsPlayedChange(false), 300);
        soundPlay("F#4");
        break;
      case "r":
        isCrashPlayedChange(true);
        window.setTimeout(() => isCrashPlayedChange(false), 300);
        soundPlay("A4");
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function handSampleChange(note, file) {
    let fileURL = URL.createObjectURL(file);
    let buffer = new Tone.Buffer(fileURL);
    mySampler.current.add(note, buffer, () =>
      alert("Sample successfully changed")
    );
  }

  const buttonList = [
    {
      soundPlay: () => soundPlay("C4"),
      isPlayed: isTomPlayed,
      id: "Tom",
      handSampleChange: (e) => handSampleChange("C4", e.target.files[0]),
    },
    {
      soundPlay: () => soundPlay("D#4"),
      isPlayed: isTamborinePlayed,
      id: "Tamborine",
      handSampleChange: (e) => handSampleChange("D#4", e.target.files[0]),
    },
    {
      soundPlay: () => soundPlay("F#4"),
      isPlayed: isLoopsPlayed,
      id: "Loops",
      handSampleChange: (e) => handSampleChange("F#4", e.target.files[0]),
    },
    {
      soundPlay: () => soundPlay("A4"),
      isPlayed: isCrashPlayed,
      id: "Crash",
      handSampleChange: (e) => handSampleChange("A4", e.target.files[0]),
    },
  ];
  return { buttonList };
}
