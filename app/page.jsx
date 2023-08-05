import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import Landing from "@/components/home/landing";
import Chat from "@/components/home/chat"

export default async function Home() {
  const session = await getServerSession(authOptions);
  const backendUrl = 'http://localhost:8000'; // Replace with your actual backend API URL
  const url = 'https://backend-project-5m5f.onrender.com'

       
  fetch(`${url}/api/`)
  .then(response => {
    // Handle the response here
    console.log('GET request response:', response);
  })
  .catch(error => {
    // Handle errors here
    console.error('Error sending GET request:', error);
  });
  return (
    session !== null ? (
      <Chat />
    ) : (
      <Landing />
    )
  );
}
