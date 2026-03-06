'use client'

import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

export default function FeedbackWidget() {
  const [feedback, setFeedback] = useState('')

  const submitFeedback = () => {
    // Simulate submission
    toast.success('Feedback submitted!')
    setFeedback('')
  }

  return (
    <div className="mt-8 p-4 border border-gray-300 dark:border-gray-700 rounded-md">
      <h3 className="text-lg font-semibold mb-2">Feedback</h3>
      <textarea
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Your feedback..."
        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600"
        data-testid="feedback-input"
      />
      <button
        onClick={submitFeedback}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        data-testid="feedback-submit"
      >
        Submit
      </button>
      <Toaster />
    </div>
  )
}