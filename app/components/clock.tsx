"use client";

import Clock from "react-live-clock";

export default function HeaderClock() {
  return (
    <Clock
      className="clock"
      format="HH:mm:ss"
      timezone="Europe/London"
      noSsr
      ticking
    />
  );
}
