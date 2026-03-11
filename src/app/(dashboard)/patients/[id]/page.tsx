'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import PatientDetailClient from './PatientDetailClient';

export default function PatientDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [patient, setPatient] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/patients/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data) => setPatient(data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse h-4 w-32 rounded bg-[#E5E7EB]" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="card"><div className="animate-pulse space-y-4">{Array.from({ length: 5 }).map((_, i) => <div key={i} className="h-4 rounded bg-[#E5E7EB]" />)}</div></div>
          <div className="card lg:col-span-2"><div className="animate-pulse space-y-4">{Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-4 rounded bg-[#E5E7EB]" />)}</div></div>
        </div>
      </div>
    );
  }

  if (notFound || !patient) {
    return <div className="text-center py-12 text-[#5E6366]">Patient not found</div>;
  }

  return <PatientDetailClient patient={patient} />;
}
