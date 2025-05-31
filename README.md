# My Video Invitation App

This project is a modern web application for creating and sharing event invitations with video themes. Users can customize event details, upload images and MP4 video themes, and preview their invitation in a visually rich interface.

---

## Features

- **Create Invitations:**  
  Fill out a form with event name, date, time, location, description, ticketing, and more.

- **Image & Video Theme Upload:**  
  Upload a custom image and an MP4 video to use as the invitation’s theme.

- **Live Preview:**  
  Instantly preview your invitation with all selected media and details.

- **Persistent State:**  
  All form data is managed with Zustand and saved to localStorage for a seamless experience.

- **View Page:**  
  See a full preview of your invitation with all entered details and media.

---

## Getting Started

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/my-video.git
cd my-video
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Run the Development Server

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

1. Go to `/create` to start a new invitation.
2. Fill in all event details, upload an image and a video theme.
3. Click **Create** to save and preview your invitation on the `/view` page.
4. You can download the uploaded video theme directly, but **rendering a custom video invitation is currently not available** (see below).

---

## Download Video Feature

> **Note:**  
> The "Download Video" feature (which would render a custom video invitation using Remotion Lambda and AWS) is **currently not available** due to issues with AWS Lambda deployment and configuration.  
> You can still download the uploaded MP4 theme directly, but rendering a new video from the invitation data is disabled for now.

---

## Technologies Used

- **Next.js** (App Router)
- **React**
- **TypeScript**
- **Tailwind CSS**
- **Zustand** (state management)
- **Remotion** (video composition, preview only)
- **react-icons**

---

## Environment Variables

If you plan to use AWS Lambda for video rendering in the future, set up your `.env` file with the following (currently not required):

```
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
REMOTION_AWS_REGION=your-region
REMOTION_AWS_ROLE_ARN=your-role-arn
```

---

## Known Issues

- **Video Rendering/Download:**  
  Rendering and downloading a custom video invitation is not available due to AWS Lambda issues.  

- **Remotion Lambda:**  
  If you wish to enable this in the future, ensure your AWS credentials and Lambda setup are correct, and redeploy using `node deploy.mjs`.

---



## Acknowledgements

- [Remotion](https://www.remotion.dev/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

---