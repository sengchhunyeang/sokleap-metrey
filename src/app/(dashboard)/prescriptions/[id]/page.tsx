'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import PrescriptionDetailClient from './PrescriptionDetailClient';

export default function PrescriptionDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [prescription, setPrescription] = useState<any>(null);
  const [totalKHR, setTotalKHR] = useState(0);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const consultationFeeKHR = 40000;

  useEffect(() => {
    fetch(`/api/prescriptions/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then((data) => {
        setPrescription(data);
        let total = consultationFeeKHR;
        (data.medicines || []).forEach((med: any) => {
          const qty = parseFloat(med.quantity) || 0;
          total += (med.medicine?.costKHR || 0) * qty;
        });
        setTotalKHR(total);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse h-4 w-48 rounded bg-[#E5E7EB]" />
        <div className="max-w-3xl mx-auto"><div className="card"><div className="animate-pulse space-y-4">{Array.from({ length: 8 }).map((_, i) => <div key={i} className="h-4 rounded bg-[#E5E7EB]" />)}</div></div></div>
      </div>
    );
  }

  if (notFound || !prescription) {
    return <div className="text-center py-12 text-[#5E6366]">Prescription not found</div>;
  }

  return (
    <PrescriptionDetailClient
      prescription={prescription}
      totalKHR={totalKHR}
      consultationFeeKHR={consultationFeeKHR}
    />
  );
}
