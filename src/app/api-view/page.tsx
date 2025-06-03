"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Player } from "@remotion/player";
import { InvitationVideo } from "../../remotion/Invitation/Main";

interface CustomLink {
  emoji: string;
  label: string;
  url: string;
}

interface InviteData {
  name: string;
  description: string;
  location_name: string;
  start_datetime: string;
  config: {
    capacity: number;
    guest_approval: boolean;
    is_public: boolean;
    rules: string[];
    ticker_text: string;
  };
  custom_links: CustomLink[];
  host: {
    name: string;
  };
}

const ApiViewPage: React.FC = () => {
  const router = useRouter();
  const [inviteData, setInviteData] = useState<InviteData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
//   const [isRendering, setIsRendering] = useState(false);

  useEffect(() => {
    const fetchInviteData = async () => {
      try {
        const response = await fetch(
          "/api/invite",
          {
            headers: {
              "Content-Type": "application/json"
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch invite data");
        }

        const data = await response.json();
        setInviteData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInviteData();
  }, []);

  const handleRenderVideo = async () => {
    // if (!inviteData) return;
    
    // setIsRendering(true);
    // try {
    //   const res = await fetch("/api/lambda/render", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       id: "invitation",
    //       inputProps: {
    //         eventName: inviteData.name,
    //         description: inviteData.description,
    //         image: "/ast_image.webp",
    //         mp4Theme: "/Sample_Theme.mp4",
    //         location: inviteData.location_name,
    //         startDate: new Date(inviteData.start_datetime).toLocaleDateString(),
    //         startTime: new Date(inviteData.start_datetime).toLocaleTimeString(),
    //       },
    //     }),
    //   });
    //   const data = await res.json();
    //   if (data.type === "success") {
    //     window.location.href = data.data.url;
    //   }
    // } catch (error) {
    //   console.error("Error rendering video:", error);
    // }
    // setIsRendering(false);
    alert("Video Download not available");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#3B1A40] text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error || !inviteData) {
    return (
      <div className="min-h-screen bg-[#3B1A40] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl">Error: {error || "No data available"}</p>
          <button
            className="mt-4 px-4 py-2 bg-[#522C52] text-[#B7A6B7] rounded hover:bg-[#6d3a6d] transition"
            onClick={() => router.push("/create")}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#3B1A40] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <button
          className="mb-6 px-4 py-2 bg-[#522C52] text-[#B7A6B7] rounded hover:bg-[#6d3a6d] transition"
          onClick={() => router.push("/create")}
        >
          ← Back to Create
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Video Preview Section */}
          <div className="bg-[#522C52] rounded-lg p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Video Invitation</h2>
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <Player
                component={InvitationVideo}
                inputProps={{
                  eventName: inviteData.name,
                  description: inviteData.description,
                  image: "/ast_image.webp",
                  mp4Theme: "/Sample_Theme.mp4",
                  location: inviteData.location_name,
                  startDate: new Date(inviteData.start_datetime).toLocaleDateString(),
                  startTime: new Date(inviteData.start_datetime).toLocaleTimeString(),
                }}
                durationInFrames={150}
                fps={30}
                compositionWidth={1920}
                compositionHeight={1080}
                style={{ width: "100%" }}
                controls
                autoPlay
                loop
              />
            </div>
            <button
              className="mt-4 w-full py-3 bg-[#B7A6B7] text-[#522C52] rounded-lg font-semibold hover:bg-[#a48fa4] transition disabled:opacity-50"
              onClick={handleRenderVideo}
            //   disabled={isRendering}
            >
              {/* {isRendering ? "Rendering..." : "Download Video"} */}
              Download Video
            </button>
          </div>

          {/* Event Details Section */}
          <div className="bg-[#522C52] rounded-lg p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-6">Event Details</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">{inviteData.name}</h3>
                <p className="text-[#B7A6B7]">{inviteData.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-[#3B1A40] p-4 rounded-lg">
                  <p className="text-[#B7A6B7] text-sm">Date & Time</p>
                  <p className="font-semibold">
                    {new Date(inviteData.start_datetime).toLocaleString()}
                  </p>
                </div>
                <div className="bg-[#3B1A40] p-4 rounded-lg">
                  <p className="text-[#B7A6B7] text-sm">Location</p>
                  <p className="font-semibold">{inviteData.location_name}</p>
                </div>
                <div className="bg-[#3B1A40] p-4 rounded-lg">
                  <p className="text-[#B7A6B7] text-sm">Host</p>
                  <p className="font-semibold">{inviteData.host.name}</p>
                </div>
                <div className="bg-[#3B1A40] p-4 rounded-lg">
                  <p className="text-[#B7A6B7] text-sm">Capacity</p>
                  <p className="font-semibold">{inviteData.config.capacity} guests</p>
                </div>
              </div>

              {/* Rules Section */}
              <div className="bg-[#3B1A40] p-4 rounded-lg mt-6">
                <h4 className="text-lg font-semibold mb-3">Rules</h4>
                <ul className="list-disc list-inside space-y-2">
                  {inviteData.config.rules.map((rule, index) => (
                    <li key={index} className="text-[#B7A6B7]">{rule}</li>
                  ))}
                </ul>
              </div>

              {/* Custom Links */}
              <div className="bg-[#3B1A40] p-4 rounded-lg">
                <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
                <div className="grid grid-cols-1 gap-2">
                  {inviteData.custom_links.map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-[#B7A6B7] hover:text-white transition-colors"
                    >
                      <span>{link.emoji}</span>
                      <span>{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between py-3 border-b border-[#B7A6B7]/20">
                  <span>Approval Required</span>
                  <span>{inviteData.config.guest_approval ? "Yes" : "No"}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span>Event Status</span>
                  <span className="px-3 py-1 bg-[#3B1A40] rounded-full text-sm">
                    {inviteData.config.is_public ? "Public" : "Private"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiViewPage;