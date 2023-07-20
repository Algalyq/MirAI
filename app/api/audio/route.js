import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
  try {
    const { body } = req;

    if (!body || typeof body !== 'object') {
      throw new Error('Invalid request body. Expected object or FormData.');
    }

    const formData = new FormData(body);

    const response = await axios.post('http://localhost:8000/api/audio', formData);

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