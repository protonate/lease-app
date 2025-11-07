'use client';

import dynamic from 'next/dynamic';

const LeaseForm = dynamic(() => import('@/components/LeaseForm'), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <LeaseForm />
    </main>
  );
}
