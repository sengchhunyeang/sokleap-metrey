'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import EditPrescriptionClient from './EditPrescriptionClient';

export default function EditPrescriptionPage() {
  const params = useParams();
  const id = params.id as string;
  const [prescription, setPrescription] = useState<any>(null);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`/api/prescriptions/${id}`).then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      }),
      fetch('/api/doctors').then((res) => res.json()),
    ])
      .then(([prescriptionData, doctorsData]) => {
        setPrescription(prescriptionData);
        setDoctors(doctorsData.doctors || []);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse h-4 w-48 rounded bg-[#E5E7EB]" />
        <div className="card"><div className="animate-pulse space-y-4">{Array.from({ length: 10 }).map((_, i) => <div key={i} className="h-4 rounded bg-[#E5E7EB]" />)}</div></div>
      </div>
    );
  }

  if (notFound || !prescription) {
    return <div className="text-center py-12 text-[#5E6366]">Prescription not found</div>;
  }

  return <EditPrescriptionClient prescription={prescription} doctors={doctors} />;
}
