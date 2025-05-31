"use client";
import React, {useState,useRef,useEffect} from "react";
import { useRouter } from "next/navigation";
import { useInviteStore } from "../../store/inviteStore";
import { TbWorld } from "react-icons/tb";
import { IoMdLock } from "react-icons/io";
import { GrLocation } from "react-icons/gr";
import { LuNotebookText } from "react-icons/lu";
import { PiPencilSimpleLineDuotone } from "react-icons/pi";
import { HiOutlineTicket } from "react-icons/hi";
import { BsPersonCheckFill } from "react-icons/bs";
import { LuArrowUpToLine } from "react-icons/lu";
import { IoShuffle } from "react-icons/io5";
import { LuChevronsUpDown } from "react-icons/lu";

const CreatePage: React.FC = () => {

  const router = useRouter();
  const { form, setForm } = useInviteStore();


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState(false);
  const [editingDescription, setEditingDescription] = useState(false);
  const [editingTicketCost, setEditingTicketCost] = useState(false);
  const [editingCapacity, setEditingCapacity] = useState(false);
  
  const mp4InputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const startDateRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "Start Date";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  };
  const formatTime = (timeStr: string) => {
    if (!timeStr) return "Start Time";
    const [hour, minute] = timeStr.split(":");
    const date = new Date();
    date.setHours(Number(hour), Number(minute));
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  const formatEndDate = (dateStr: string) => {
    if (!dateStr) return "End Date";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  };
  const formatEndTime = (timeStr: string) => {
    if (!timeStr) return "End Time";
    const [hour, minute] = timeStr.split(":");
    const date = new Date();
    date.setHours(Number(hour), Number(minute));
    return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  const handleCreate = () => {
    const response = {
      ...form,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    useInviteStore.getState().saveResponse(response);
    localStorage.setItem("inviteResponse", JSON.stringify(response));
    router.push("/view");
  }


  return (
<div className="flex justify-center items-center min-h-screen">
      <div className="w-3/4 rounded-lg  flex overflow-hidden">
        {/* Left Section (40%) */}
        <div className="w-2/5  flex flex-col items-center justify-start p-4 h-full relative">
          <img
            src={form.image}
            alt="Preview"
            className="w-full h-108 mb-6 rounded-2xl object-cover"
          />
          {/* Picture icon button */}
          <button
            type="button"
            className="absolute bottom-25 right-8 bg-[#FEFEFF] p-2 rounded-full shadow-lg hover:bg-[#6d3a6d] transition"
            onClick={() => fileInputRef.current?.click()}
            style={{ zIndex: 10 }}
            aria-label="Change image"
          >
            {/* Simple picture SVG icon */}
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
              <rect x="3" y="5" width="18" height="14" rx="2" stroke="#B7A6B7" strokeWidth="2"/>
              <circle cx="8" cy="10" r="2" stroke="#B7A6B7" strokeWidth="2"/>
              <path d="M21 19l-5.5-7-4.5 6-2.5-3-4 4" stroke="#B7A6B7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {/* Hidden file input */}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) {
                const url = URL.createObjectURL(file);
                setForm({ image: url });
              }
            }}
          />
          <div className="flex w-full gap-2 h-14 ">
  <button
    className="w-7/8 rounded-lg flex items-center bg-[#522C52] text-[#B7A6B7]  hover:bg-[#7d457d] transition px-2 py-1"
    type="button"
    onClick={() => mp4InputRef.current?.click()}
  >
    {/* Thumbnail */}
    <video
      src={form.mp4Theme}
      className="w-10 h-10 rounded object-cover mr-2"
      muted
      loop
      playsInline
      preload="metadata"
      poster="/theme_img.jpg" // Optional: add a poster image for better UX
    />
    <div className="flex justify-between w-full">
    <div className="flex flex-col items-start">
      <span className="text-xs text-[#B7A6B7]">Theme</span>
      <span className="text-base text-[#FEFEFF]">{form.mp4Title}</span>
    </div>
      <LuChevronsUpDown size={20} className="mt-2"/>
    </div>
  </button>
  <input
    type="file"
    accept="video/mp4"
    ref={mp4InputRef}
    className="hidden"
    onChange={e => {
      const file = e.target.files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        setForm({ mp4Theme: url, mp4Title: file.name });
      }
    }}
  />
  <button className="w-1/8 rounded-lg px-4 py-2 bg-[#522C52] text-[#B7A6B7]  hover:bg-[#7d457d] transition">
  <IoShuffle size={22} className="inline-block " />
  </button>
</div>
           </div>
        {/* Right Section (60%) */}
         <div className="w-3/5 p-4">
          {/* Dropdown buttons row */}
          <div className="flex justify-between mb-6">
            <div className="relative">
              <button className="px-4 py-1 bg-[#522C52] text-[#B7A6B7] rounded-md hover:bg-[#935093] transition flex items-center gap-1">
                Personal Calendar 
                 <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path d="M6 10l6 6 6-6" stroke="#B7A6B7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
               </button>
              {/* Dropdown menu placeholder */}
            </div>
              <div className="relative" ref={dropdownRef}>
              <button
                className="px-4 py-1 bg-[#522C52] text-[#B7A6B7] rounded-md hover:bg-[#935093] transition flex items-center gap-1"
                onClick={() => setIsDropdownOpen((open) => !open)}
                type="button"
              >
                   {form.publicStatus === "Public" && (
                    <TbWorld className="inline-block mr-1 text-lg" />
                                 )}
                  {form.publicStatus === "Private" && (
                   <IoMdLock className="inline-block mr-1 text-lg" />
                       )}    
                {form.publicStatus}
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <path d="M6 10l6 6 6-6" stroke="#B7A6B7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded shadow z-10">
                  <button
                    className={`block w-full text-left px-4 py-2 hover:bg-[#522C52] hover:text-[#B7A6B7] ${form.publicStatus === "Public" ? "font-bold" : ""}`}
                    onClick={() => {
                      setForm({ publicStatus: "Public" });
                      setIsDropdownOpen(false);
                    }}
                  >
                    <TbWorld className="inline-block mr-2" />
                    Public
                  </button>
                  <button
                    className={`block w-full text-left px-4 py-2 hover:bg-[#522C52] hover:text-[#B7A6B7] ${form.publicStatus === "Private" ? "font-bold" : ""}`}
                    onClick={() => {
                      setForm({ publicStatus: "Private" });
                      setIsDropdownOpen(false);
                    }}
                  >
                    <IoMdLock className="inline-block mr-2" />
                    Private
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* Form placeholder */}
            <input
            type="text"
            placeholder="Event Name"
            value={form.eventName}
            onChange={(e) => setForm({ eventName: e.target.value })}
            className="w-full px-4 py-4 border border-[#421B45] rounded mb-2 text-[#7a597d] text-6xl font-semibold focus:outline-none placeholder:text-[#5E3D61] placeholder:text-6xl placeholder:font-semibold"
          />
          <div className=" rounded-lg flex gap-4 mt-4 h-20">
            {/* Left 75% */}
            <div className="w-3/4 rounded-lg flex bg-[#522C52] text-[#B7A6B7]" >
              {/* First half: vertical steps */}
              <div className="w-1/2 flex flex-col items-start pl-6 py-4">
  {/* Start */}
  <div className="flex items-center mb-1">
    <span className="w-3 h-3 rounded-full bg-[#765279] inline-block -mt-2 mr-2"></span>
    <span className="text-base -mt-2 font-semibold">Start</span>
  </div>
  {/* Dotted line */}
  <div className="flex flex-col items-center ml-1">
    <span className="h-6 -mt-2 ml-0.3 border-l-2 border-dotted border-[#765279]"></span>
  </div>
  {/* End */}
  <div className="flex items-center mt-1">
    <span className="w-3 h-3 -mt-2.5 rounded-full border-2 border-[#765279] bg-transparent inline-block mr-2"></span>
    <span className="text-base -mt-3 font-semibold">End</span>
  </div>
</div>
              {/* Second half: blank */}
              <div className="w-1/2 grid grid-cols-2 grid-rows-2 gap-0.5 p-0.2">
      {/* Start Date */}
      <div
        className="bg-[#5E3D61] mt-1 rounded-l-xl flex items-center justify-center cursor-pointer"
        onClick={() => startDateRef.current?.showPicker()}
      >
        <span>{formatDate(form.startDate)}</span>
        <input
          ref={startDateRef}
          type="date"
          value={form.startDate}
          onChange={e => setForm({ startDate: e.target.value })}
          className="hidden"
        />
      </div>
      {/* Start Time */}
      <div
        className="bg-[#5E3D61] mt-1 mr-1 rounded-r-xl flex items-center justify-center cursor-pointer"
        onClick={() => startTimeRef.current?.showPicker()}
      >
        <span>{formatTime(form.startTime)}</span>
        <input
          ref={startTimeRef}
          type="time"
          value={form.startTime}
          onChange={e => setForm({ startTime: e.target.value })}
          className="hidden"
        />
      </div>
      {/* End Date */}
      <div
        className="bg-[#5E3D61] mb-1 rounded-l-xl flex items-center justify-center cursor-pointer"
        onClick={() => endDateRef.current?.showPicker()}
      >
        <span>{formatEndDate(form.endDate)}</span>
        <input
          ref={endDateRef}
          type="date"
          value={form.endDate}
          min={form.startDate || undefined}
          onChange={e => setForm({ endDate: e.target.value })}
          className="hidden"
        />
      </div>
      {/* End Time */}
      <div
        className="bg-[#5E3D61] mb-1 mr-1 rounded-r-xl flex items-center justify-center cursor-pointer"
        onClick={() => endTimeRef.current?.showPicker()}
      >
        <span>{formatEndTime(form.endTime)}</span>
        <input
          ref={endTimeRef}
          type="time"
          value={form.endTime}
          onChange={e => setForm({ endTime: e.target.value })}
          className="hidden"
        />
      </div>
    </div>
            </div>
            {/* Right 25%: blank */}
           <div className="w-1/4 rounded-lg bg-[#522C52] text-[#B7A6B7] flex flex-col items-start justify-center px-2.5">
              <TbWorld className="mb-1" size={22} />
               <span className="font-semibold text-base">GMT+05:30</span>
              <span className="text-xs text-[#B7A6B7]">Calcutta</span>
          </div>
          </div>
          <div
  className="w-full rounded-lg bg-[#522C52] text-[#B7A6B7] mt-6 h-16 flex flex-col items-start justify-center px-6 cursor-pointer"
  onClick={() => !form.location && setEditingLocation(true)}
>
  {editingLocation ? (
    <input
      type="text"
      autoFocus
      value={form.location}
      onChange={e => setForm({ location: e.target.value })}
      onBlur={() => setEditingLocation(false)}
      onKeyDown={e => {
        if (e.key === "Enter") setEditingLocation(false);
      }}
      className="w-full bg-transparent text-xl font-semibold focus:outline-none placeholder:text-[#B7A6B7]"
      placeholder="Enter location or link"
    />
  ) : form.location ? (
    <span className="text-xl font-semibold text-[#FEFEFF]">{form.location}</span>
  ) : (
    <span className="flex items-center">
      <GrLocation size={25} className="mr-2 -ml-2 -mt-4 text-lg" />
      <span>
        <span className="text-xl font-semibold">Add Event Location</span>
        <br />
        <span className="text-sm font-medium text-[#B7A6B7]">Offline Location or virtual link</span>
      </span>
    </span>
  )}
</div>
          <div
  className="w-full bg-[#522C52] text-[#B7A6B7] rounded-lg mt-4 h-10 flex flex-col items-start justify-center cursor-pointer px-4"
  onClick={() => !form.description && setEditingDescription(true)}
>
  {editingDescription ? (
    <textarea
      autoFocus
      value={form.description}
      onChange={e => setForm({ description: e.target.value })}
      onBlur={() => setEditingDescription(false)}
      onKeyDown={e => {
        if (e.key === "Enter" && !e.shiftKey) {
          setEditingDescription(false);
        }
      }}
      className="w-full bg-transparent text-base font-semibold focus:outline-none placeholder:text-[#B7A6B7] resize-none"
      placeholder="Enter event description"
      rows={2}
    />
  ) : form.description ? (
    <span className="text-base font-semibold text-[#FEFEFF] w-full">{form.description}</span>
  ) : (
   <span className="flex items-center">
      <LuNotebookText size={22} className="mr-2 " />
      <span className="text-xl font-semibold mb-1">Add Description</span>
    </span>
  )}
</div>
          <h3 className="mt-5 mb-4 text-lg font-semibold text-[#B7A6B7]">Event Options</h3>
          {/* Options list */}
          <div className="w-full flex flex-col rounded-lg bg-[#522C52] text-[#B7A6B7] ">
            <div className="flex justify-between  rounded px-4 py-2">
             <span className="text-left font-semibold flex items-center">
           <HiOutlineTicket className="mr-2" size={20} />
             Tickets
           </span>
          <span
            className="text-right cursor-pointer"
            onClick={() => setEditingTicketCost(true)}
          > 
          {editingTicketCost ? (
           <input
              type="number"
              min="0"
              autoFocus
              value={form.ticketCost}
              onChange={e => setForm({ ticketCost: e.target.value })}
               onBlur={() => setEditingTicketCost(false)}
              onKeyDown={e => {
          if (e.key === "Enter") setEditingTicketCost(false);
        }}
        className="w-20 bg-transparent border-b border-[#B7A6B7] text-right text-[#FEFEFF] focus:outline-none"
        placeholder="0"
      />
    ) : form.ticketCost ? (
      <>₹{form.ticketCost}</>
    ) : (
     <div className="flex items-center">
        Free
        <PiPencilSimpleLineDuotone className="ml-1" size={18} />
      </div> 
    )}
  </span>
            </div>
            <div className="w-full flex">
  <div className="ml-12 flex-1 border-b border-white opacity-30" />
</div>
            <div className="flex justify-between rounded px-4 py-2 items-center">
  <span className="text-left font-semibold flex items-center">
    <BsPersonCheckFill className="mr-2" size={20} />
    Require Approval
  </span>
  <button
    type="button"
    className={`w-12 h-6 flex items-center rounded-full transition-colors duration-200 focus:outline-none ${
      form.requireApproval ? "bg-[#B7A6B7]" : "bg-gray-400"
    }`}
    onClick={() => setForm({ requireApproval: !form.requireApproval })}
    aria-pressed={form.requireApproval}
  >
    <span
      className={`inline-block w-5 h-5 transform bg-white rounded-full shadow transition-transform duration-200 ${
        form.requireApproval ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>
</div>
<div className="w-full flex">
  <div className="ml-12 flex-1 border-b border-white opacity-30" />
</div>
             <div className="flex justify-between  rounded px-4 py-2">
              <span className="text-left font-semibold flex items-center">
    <LuArrowUpToLine className="mr-2" size={20} />
    Capacity
  </span>
          <span
            className="text-right cursor-pointer"
            onClick={() => setEditingCapacity(true)}
          > 
          {editingCapacity ? (
           <input
              type="number"
              min="0"
              autoFocus
              value={form.capacity}
              onChange={e => setForm({ capacity: e.target.value })}
               onBlur={() => setEditingCapacity(false)}
              onKeyDown={e => {
          if (e.key === "Enter") setEditingCapacity(false);
        }}
        className="w-20 bg-transparent border-b border-[#B7A6B7] text-right text-[#FEFEFF] focus:outline-none"
        placeholder="0"
      />
    ) : form.capacity ? (
      <>{form.capacity}</>
    ) : (
      <div className="flex items-center">
        Unlimited
        <PiPencilSimpleLineDuotone className="ml-1" size={18} />
      </div>
    )}
  </span>
            </div>
          </div>
            <button 
            className="w-full mt-6 py-3 bg-[#FEFEFF] text-[#522C52] rounded text-lg font-semibold hover:bg-[#6d3a6d] hover:text-[#FEFEFF] transition"
            onClick={handleCreate}
            type="button"
            >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
export default CreatePage;

