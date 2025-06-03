import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch(
      "http://159.89.162.224:8000/api/v1/invites/67f896a6-bdaf-47e4-9289-29d6586e5a70/logged_in",
      {
        headers: {
          Authorization: "Bearer 1000",
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch invite data");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch invite data" },
      { status: 500 }
    );
  }
}