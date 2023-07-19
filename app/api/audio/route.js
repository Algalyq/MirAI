import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
  try {
    const { body } = req;
    const formData = new FormData(body);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    console.log(formData)
    const response = await axios.post('http://localhost:8000/api/audio', formData,config);

    console.log('Response:', response.data);

    return new NextResponse({
      status: 200,
      body: 'Audio uploaded successfully',
    });
  } catch (error) {
    console.error('Error uploading audio:', error);

    return new NextResponse({
      status: 500,
      body: 'Error uploading audio',
    });
  }
}
