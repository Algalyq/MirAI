import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
  try {
    const { body } = req;
    const formData = new FormData();

    // Iterate over the form data fields and append them to the new FormData object
    for (const key in body) {
      if (body.hasOwnProperty(key)) {
        formData.append(key, body[key]);
      }
    }
    const response = await axios.post('http://localhost:8000/api/audio', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Handle the response from the API endpoint
    console.log('Response:', response.data);

    return new NextResponse({
      status: 200,
      body: 'Audio uploaded successfully',
    });
  } catch (error) {
    // Handle errors
    // console.error('Error uploading audio:', error);

    return new NextResponse({
      status: 500,
      body: 'Error uploading audio',
    });
  }
}
