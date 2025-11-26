import React from 'react';

type Props = {
  logo: string;
  title: string;
  paragraph: string;
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className='logo mb-6 text-center'>
          <h1 className='text-primary font-extrabold text-3xl sm:text-4xl'>
            {logo}
          </h1>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 transition-transform transform hover:scale-[1.02]">
          {/* Title */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4 sm:mb-5">
            {title}
          </h2>

          {/* Paragraph */}
          <p className='font-medium text-center text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base'>
            {paragraph}
          </p>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
            {children}

            <button
              type="submit"
              className="w-full py-3 sm:py-3.5 px-4 bg-secondary text-[#fbfff5] shadow hover:bg-secondary/80 focus:bg-secondary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary font-medium rounded-md transition"
            >
              {submitText}
            </button>
          </form>

          {/* Footer */}
          {footer && <div className="mt-6 text-center text-sm text-gray-500">{footer}</div>}
        </div>
      </div>
    </div>
  );
};