import React from 'react';
import { XCircleIcon } from '@heroicons/react/24/outline';

const Unauthorized: React.FC = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 lg:px-8">
      <div className="text-center">
        <XCircleIcon className="mx-auto h-16 w-16 text-red-500" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Access Denied
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, you do not have the necessary permissions to view this page.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="/"
            className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Go back
          </a>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;