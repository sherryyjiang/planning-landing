'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';

type StoredEmail = {
  email: string;
  timestamp: string;
  synced?: boolean;
};

export default function EmailAdmin() {
  // Always set isVisible to false and don't provide a way to make it visible
  const [emails, setEmails] = useState<StoredEmail[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Load emails from localStorage
    const storedEmails = JSON.parse(localStorage.getItem('signupEmails') || '[]');
    setEmails(storedEmails);
  }, [isVisible]); // Reload when visibility changes

  const copyToClipboard = () => {
    const emailText = emails.map(item => `${item.email} (${new Date(item.timestamp).toLocaleString()})`).join('\n');
    navigator.clipboard.writeText(emailText);
    alert('Emails copied to clipboard!');
  };

  const clearEmails = () => {
    if (confirm('Are you sure you want to clear all stored emails?')) {
      localStorage.removeItem('signupEmails');
      setEmails([]);
    }
  };

  const syncEmail = async (email: string, index: number) => {
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to sync email');
      }

      // Update localStorage
      const updatedEmails = [...emails];
      updatedEmails[index].synced = true;
      localStorage.setItem('signupEmails', JSON.stringify(updatedEmails));
      setEmails(updatedEmails);
    } catch (error) {
      console.error('Error syncing email:', error);
      alert('Failed to sync email to Supabase');
    }
  };

  // Return null to completely hide the component
  return null;
} 