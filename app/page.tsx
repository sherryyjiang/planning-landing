import { CheckCircle } from "lucide-react";
import { GradientBackground } from "@/components/ui/gradient-background";
import Image from "next/image";
import EmailSignUpForm from "@/components/EmailSignUpForm";
import WhatsAppButton from "@/components/WhatsAppButton";
import EmailAdmin from "@/components/EmailAdmin";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col relative overflow-hidden">
      <GradientBackground />
      <main className="flex-1 z-10">
        <section className="container mx-auto px-4 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            {/* Logo */}
            <div className="mx-auto mb-8 flex justify-center">
              <div className="relative h-16 w-16 md:h-20 md:w-20">
                <Image
                  src="/peek_logo.png"
                  alt="Peek Logo"
                  width={80}
                  height={80}
                  className="rounded-full"
                  priority
                />
              </div>
            </div>

            {/* Brand */}
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-white">peek</h1>

            {/* Tagline */}
            <p className="text-xl md:text-2xl text-gray-400 mb-8">a financial plan that actually fits your life, not your parents</p>

            <div className="w-full max-w-md mx-auto">
              <EmailSignUpForm />
              <div className="mt-4 flex items-center justify-center gap-1 text-sm text-gray-500">
                <CheckCircle className="h-4 w-4 text-white/70" />
                <span>
                  10K+ have signed up already for early access
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white">here&apos;s how it works</h2>
              <p className="mt-4 text-gray-400">
                peek uses AI to help you create a plan to achieve financial freedom on your own terms
              </p>
            </div>
            <div className="mt-16 grid gap-0 md:grid-cols-3 max-w-5xl mx-auto">
              <div className="flex flex-col items-center text-center px-1">
                <div className="mb-6 h-[500px] w-full relative overflow-hidden">
                  <Image
                    src="/Add assets.png"
                    alt="Add assets screen"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="px-4 md:px-6 max-w-xs">
                  <p className="text-base md:text-lg font-medium text-gray-200">connect your accounts instantly</p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center px-1">
                <div className="mb-6 h-[500px] w-full relative overflow-hidden bg-black rounded-3xl">
                  <Image
                    src="/Planning_insights.png"
                    alt="Financial planning insights screen"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="px-4 md:px-6 max-w-xs">
                  <p className="text-base md:text-lg font-medium text-gray-200">get financial insights in seconds</p>
                </div>
              </div>
              <div className="flex flex-col items-center text-center px-1">
                <div className="mb-6 h-[500px] w-full relative overflow-hidden">
                  <Image
                    src="/Planning_chat.png"
                    alt="Financial planning chat screen"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="px-4 md:px-6 max-w-xs">
                  <p className="text-base md:text-lg font-medium text-gray-200">get step-by-step guidance to build and manage your plan</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="join" className="py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter text-white">join our community</h2>
              <p className="mt-4 text-gray-400">be the first to know about new features and updates</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <WhatsAppButton />
              </div>
            </div>
        </div>
        </section>
      </main>
      <footer className="border-t border-gray-800/30 bg-black/30 z-10">
        <div className="container mx-auto px-4 py-6 md:px-6">
          <div className="flex justify-center">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} peek. all rights reserved.</p>
          </div>
        </div>
      </footer>
      
      {/* Admin Panel */}
      <EmailAdmin />
    </div>
  );
}
