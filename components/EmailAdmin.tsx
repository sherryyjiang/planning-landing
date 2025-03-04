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
  const [emails, setEmails] = useState<StoredEmail[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Load emails from localStorage
    const storedEmails = JSON.parse(localStorage.getItem('signupEmails') || '[]');
    setEmails(storedEmails);
  }, [isVisible]); // Reload when visibility changes

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

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

  // Hidden admin panel, only visible when toggled
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button 
        onClick={toggleVisibility} 
        variant="outline" 
        size="sm"
        className="opacity-30 hover:opacity-100"
      >
        {isVisible ? 'Hide Admin' : 'Admin'}
      </Button>
      
      {isVisible && (
        <div className="absolute bottom-12 right-0 w-96 bg-black border border-gray-800 rounded-lg p-4 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-medium">Collected Emails ({emails.length})</h3>
            <div className="space-x-2">
              <Button size="sm" onClick={copyToClipboard}>Copy</Button>
              <Button size="sm" variant="secondary" onClick={clearEmails} className="bg-red-600 hover:bg-red-700 text-white">Clear</Button>
            </div>
          </div>
          
          <div className="max-h-80 overflow-y-auto">
            {emails.length === 0 ? (
              <p className="text-gray-400 text-center py-4">No emails collected yet</p>
            ) : (
              <ul className="space-y-2">
                {emails.map((item, index) => (
                  <li key={index} className="text-sm text-white bg-gray-900 p-2 rounded flex justify-between items-start">
                    <div>
                      <div>{item.email}</div>
                      <div className="text-xs text-gray-400">
                        {new Date(item.timestamp).toLocaleString()}
                      </div>
                    </div>
                    <div className="flex items-center">
                      {item.synced ? (
                        <div className="flex items-center text-green-500" aria-label="Synced to Supabase">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                      ) : (
                        <button 
                          onClick={() => syncEmail(item.email, index)}
                          className="flex items-center text-xs text-yellow-500 hover:text-yellow-400"
                          aria-label="Not synced to Supabase. Click to sync."
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Sync
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 