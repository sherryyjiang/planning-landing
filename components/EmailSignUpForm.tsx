'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCircle, Loader2 } from 'lucide-react';

export default function EmailSignUpForm() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Use the API endpoint to submit the email
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('API error:', data);
        throw new Error(data.error || 'Failed to submit email');
      }

      // Show success state
      setIsSuccess(true);
      setEmail('');
      
      // Also store in localStorage as a backup
      try {
        const storedEmails = JSON.parse(localStorage.getItem('signupEmails') || '[]');
        storedEmails.push({
          email,
          timestamp: new Date().toISOString(),
          synced: true
        });
        localStorage.setItem('signupEmails', JSON.stringify(storedEmails));
      } catch (storageErr) {
        console.warn('Could not store email in localStorage:', storageErr);
      }
    } catch (err: Error | unknown) {
      console.error('Error submitting email:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unable to submit your email at this time. Please try again later.';
      setError(errorMessage);
      
      // Store in localStorage as fallback if API fails
      try {
        const storedEmails = JSON.parse(localStorage.getItem('signupEmails') || '[]');
        storedEmails.push({
          email,
          timestamp: new Date().toISOString(),
          synced: false
        });
        localStorage.setItem('signupEmails', JSON.stringify(storedEmails));
      } catch (storageErr) {
        console.warn('Could not store email in localStorage:', storageErr);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {isSuccess ? (
        <div className="flex flex-col items-center justify-center text-center">
          <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">Thank you for signing up!</h3>
          <p className="text-gray-400">We&apos;ll keep you updated on our progress.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow h-12 bg-black/30 border-gray-800 rounded-md text-white placeholder:text-gray-500"
            required
          />
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="h-12 px-4 bg-white text-black hover:bg-gray-100 rounded-md font-medium whitespace-nowrap"
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              "Sign up"
            )}
          </Button>
          {error && <p className="absolute mt-14 text-red-500 text-sm">{error}</p>}
        </form>
      )}
    </div>
  );
} 