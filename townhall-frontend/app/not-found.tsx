import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        {/* Bauhaus 404 visual */}
        <div className="relative w-64 h-64 mx-auto mb-8">
          <div className="absolute top-0 left-0 w-32 h-32 bg-bauhaus-blue" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-bauhaus-red" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-bauhaus-yellow flex items-center justify-center">
            <span className="text-4xl font-black">404</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-black uppercase mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/">
            <Button variant="primary" size="lg">
              Go Home
            </Button>
          </Link>
          <Link href="/events">
            <Button variant="outline" size="lg">
              View Events
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
