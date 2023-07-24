import axios from 'axios'
import { NextResponse } from 'next/server'

// forces to not cache the response to get a different question every request
export const dynamic = 'force-dynamic';

/**
 * Retrieves a random Jeopardy question
 */
export async function GET() {
  const backendUrl = 'http://localhost:8000'; // Replace with your actual backend API URL
  const url = 'https://backend-project-5m5f.onrender.com'
    
  const res = await axios.get(`${backendUrl}/api/question`)

  const question_data = res.data

  if (!question_data) {
    return NextResponse.json({
      message: 'No question was found in the response.'
    }, {
      status: 500
    })
  }

  return NextResponse.json({
    question: question_data.msg
  })
}