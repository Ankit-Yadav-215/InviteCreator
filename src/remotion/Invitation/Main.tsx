import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Img,
  Video,
  Audio
} from 'remotion';
import { loadFont } from "@remotion/google-fonts/Inter";

loadFont();

export const InvitationVideo: React.FC<{
  eventName: string;
  description: string;
  image: string;
  mp4Theme: string;
  location: string;
  startDate: string;
  startTime: string;
}> = ({ eventName, description, image, mp4Theme, location, startDate, startTime }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const opacity = spring({
    frame,
    fps,
    config: { damping: 100 },
  });

  const slideUp = spring({
    frame: frame - 30,
    fps,
    config: { damping: 100 },
  });

  return (
    <AbsoluteFill className="bg-[#3B1A40]">
      <Sequence durationInFrames={durationInFrames}>
        <Video src={mp4Theme} className="absolute w-full h-full object-cover opacity-50" />
        <Audio src={mp4Theme}/>
        <AbsoluteFill className="bg-black/30">
          <div
            style={{ opacity }}
            className="w-full h-full flex flex-col items-center justify-center text-white p-8"
          >
            <Img src={image} className="w-128 h-128 object-cover rounded-full mb-8" />
            <h1 
              className="text-6xl font-bold mb-4 text-center"
              style={{
                transform: `translateY(${(1 - slideUp) * 100}px)`,
                opacity: slideUp,
              }}
            >
              {eventName}
            </h1>
            <p 
              className="text-2xl mb-6 text-center max-w-2xl"
              style={{
                transform: `translateY(${(1 - slideUp) * 100}px)`,
                opacity: slideUp,
              }}
            >
              {description}
            </p>
            <div
              className="flex flex-col items-center"
              style={{
                transform: `translateY(${(1 - slideUp) * 100}px)`,
                opacity: slideUp,
              }}
            >
              <p className="text-xl mb-2">📍 {location}</p>
              <p className="text-xl">
                🗓️ {startDate} at {startTime}
              </p>
            </div>
          </div>
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};