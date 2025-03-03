'use client';

import { Button } from "@/components/ui/button";

export default function SignUpButton() {
  const handleSignUp = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSe7jsrFsEnPcHb67QG0u0cUa4h_cysz1TlVXRDBrDey2VGYZg/viewform?usp=pp_url&entry.477117138=peek-ai-planning', '_blank');
  };

  return (
    <Button 
      size="lg" 
      onClick={handleSignUp}
      className="px-8 py-6 text-lg"
    >
      sign up
    </Button>
  );
} 
