"use client";
import React, { useEffect } from "react";
import { useInviteStore, InviteResponse } from "../../store/inviteStore";
import { useRouter } from "next/navigation";
import { Player } from "@remotion/player";
import { InvitationVideo } from "../../remotion/Invitation/Main";

const ViewPage: React.FC = () => {
  const { response, saveResponse } = useInviteStore();
  const router = useRouter();
  // const [isRendering, setIsRendering] = useState(false);
  
  useEffect(() => {
    if (!response) {
      const stored = localStorage.getItem("inviteResponse");
      if (stored) {
        saveResponse(JSON.parse(stored) as InviteResponse);
      }
    }
  }, [response, saveResponse]);

  if (!response) {
    return <div className="text-center mt-10 text-lg text-gray-500">No invite found.</div>;
  }

  const handleRenderVideo = async () => {
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
    //         eventName: response.eventName,
    //         description: response.description,
    //         image: response.image,
    //         mp4Theme: response.mp4Theme,
    //         location: response.location,
    //         startDate: response.startDate,
    //         startTime: response.startTime,
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
                  eventName: response.eventName,
                  description: response.description,
                  image: response.image,
                  mp4Theme: response.mp4Theme,
                  location: response.location,
                  startDate: response.startDate,
                  startTime: response.startTime,
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
              // disabled={isRendering}
            >
          
            </button>
          </div>

          {/* Event Details Section */}
          <div className="bg-[#522C52] rounded-lg p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-6">Event Details</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold mb-2">{response.eventName}</h3>
                <p className="text-[#B7A6B7]">{response.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-[#3B1A40] p-4 rounded-lg">
                  <p className="text-[#B7A6B7] text-sm">Date & Time</p>
                  <p className="font-semibold">
                    {response.startDate} at {response.startTime}
                  </p>
                </div>
                <div className="bg-[#3B1A40] p-4 rounded-lg">
                  <p className="text-[#B7A6B7] text-sm">Location</p>
                  <p className="font-semibold">{response.location}</p>
                </div>
                <div className="bg-[#3B1A40] p-4 rounded-lg">
                  <p className="text-[#B7A6B7] text-sm">Ticket Price</p>
                  <p className="font-semibold">
                    {response.ticketCost ? `₹${response.ticketCost}` : "Free"}
                  </p>
                </div>
                <div className="bg-[#3B1A40] p-4 rounded-lg">
                  <p className="text-[#B7A6B7] text-sm">Capacity</p>
                  <p className="font-semibold">{response.capacity || "Unlimited"}</p>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between py-3 border-b border-[#B7A6B7]/20">
                  <span>Approval Required</span>
                  <span>{response.requireApproval ? "Yes" : "No"}</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span>Event Status</span>
                  <span className="px-3 py-1 bg-[#3B1A40] rounded-full text-sm">
                    {response.publicStatus}
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

export default ViewPage;