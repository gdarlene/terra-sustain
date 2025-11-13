import React from 'react';

type Props = {
  logo:string;
  title: string;
  paragraph:string;
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  submitText: string;
  footer?: React.ReactNode;
};

export const AuthCard: React.FC<Props> = ({
  logo,
  title,
  paragraph,
  children,
  onSubmit,
  submitText,
  footer,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className='logo mb-5 text-center'>
          <h1 className=' text-primary font-extrabold text-3xl'>
            {logo}
          </h1>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-5">
            {title}
          </h2>
          <p className='font-medium text-center text-gray-600 mb-5'>
            {paragraph}
          </p>

          <form onSubmit={onSubmit} className="space-y-5">
            {children}

            <button
              type="submit"
              className="w-full py-3 px-4 bg-primary hover:bg-primary/90 text-white font-medium rounded-md transition"
            >
              {submitText}
            </button>
          </form>

          {footer && <div className="mt-6 text-center text-sm">{footer}</div>}
        </div>
      </div>
    </div>
  );
};