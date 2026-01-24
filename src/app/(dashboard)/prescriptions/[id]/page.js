'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { Printer, ArrowLeft, Edit2, FileText } from 'react-feather';
import { Button, Loading } from '@/app/components/ui';

export default function PrescriptionDetailPage({ params }) {
  const { id } = use(params);
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showInvoice, setShowInvoice] = useState(true);

  useEffect(() => {
    async function loadPrescription() {
      try {
        const res = await fetch(`/api/prescriptions/${id}`);
        if (!res.ok) throw new Error('Prescription not found');
        const data = await res.json();
        setPrescription(data);
      } catch (error) {
        console.error('Error fetching prescription:', error);
      } finally {
        setLoading(false);
      }
    }
    loadPrescription();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  // Calculate invoice totals in KHR
  const calculateTotals = () => {
    if (!prescription?.medicines) return { totalKHR: 0 };
    let totalKHR = 40000; // Consultation fee
    prescription.medicines.forEach(med => {
      const qty = parseFloat(med.quantity) || 0;
      totalKHR += (med.medicine?.costKHR || 0) * qty;
    });
    return { totalKHR };
  };

  const { totalKHR } = calculateTotals();
  const consultationFeeKHR = 40000;

  if (loading) {
    return <Loading text="Loading prescription..." />;
  }

  if (!prescription) {
    return (
      <div className="text-center py-8">
        <p className="text-[#5E6366] mb-4 text-[18px]">Prescription not found</p>
        <Link href="/prescriptions" className="text-[#142A4E] hover:underline font-semibold">
          Back to Prescriptions
        </Link>
      </div>
    );
  }

  const formatDate = (date) => {
    const d = new Date(date);
    return `ថ្ងៃ${d.getDate().toString().padStart(2, '0')} ខែ${(d.getMonth() + 1).toString().padStart(2, '0')} ឆ្នាំ${d.getFullYear()}`;
  };

  return (
    <div>
      {/* Action Buttons */}
      <div className="mb-6 print:hidden flex justify-between items-center">
        <Link href="/prescriptions" className="inline-flex items-center gap-2 text-[#142A4E] hover:underline font-semibold text-[16px]">
          <ArrowLeft size={18} />
          Back to Prescriptions
        </Link>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => setShowInvoice(!showInvoice)} className="flex items-center gap-2">
            <FileText size={18} />
            {showInvoice ? 'Hide Invoice' : 'Show Invoice'}
          </Button>
          <Link href={`/prescriptions/${id}/edit`}>
            <Button variant="secondary" className="flex items-center gap-2">
              <Edit2 size={18} />
              Edit
            </Button>
          </Link>
          <Button onClick={handlePrint} className="flex items-center gap-2">
            <Printer size={18} />
            Print / បោះពុម្ព
          </Button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">

        {/* ========== PRESCRIPTION ========== */}
        <div className="bg-white border-2 border-[#4A90D9] p-6 print:border print:p-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#4A90D9]">
            <img src="/logo/left.png" alt="Logo" className="h-14 w-auto" />
            <div className="text-center">
              <h1 className="text-[20px] font-bold text-[#4A90D9]">មន្ទីរពហុព្យាបាល សុខ លាភ មេត្រី</h1>
              <p className="text-[16px] font-semibold text-[#4A90D9]">SOK LEAP METREY POLYCLINIC</p>
            </div>
            <img src="/logo/right.png" alt="Logo" className="h-14 w-auto" />
          </div>

          {/* Title */}
          <h2 className="text-[22px] font-bold text-center text-[#4A90D9] mb-4">វេជ្ជបញ្ជា</h2>

          {/* Patient Info */}
          <div className="mb-4 text-[15px]">
            <div className="flex gap-8">
              <p><span className="font-semibold">ឈ្មោះ:</span> {prescription.patient?.name}</p>
              <p><span className="font-semibold">ភេទ</span> {prescription.patient?.gender === 'MALE' ? 'ប្រុស' : prescription.patient?.gender === 'FEMALE' ? 'ស្រី' : prescription.patient?.gender}</p>
              <p><span className="font-semibold">អាយុ</span> {prescription.patient?.age} ឆ្នាំ</p>
            </div>
            <p><span className="font-semibold">អាសយដ្ឋាន</span> {prescription.patient?.address || '...'}</p>
            <p><span className="font-semibold">រោគវិនិច្ឆ័យ</span> {prescription.diagnosis}</p>
          </div>

          {/* Medicines Table */}
          <table className="w-full border-collapse mb-4 text-[14px]">
            <thead>
              <tr className="border-b-2 border-[#4A90D9]">
                <th className="py-2 px-2 text-left font-semibold">ល.រ</th>
                <th className="py-2 px-2 text-left font-semibold">ឈ្មោះថ្នាំ</th>
                <th className="py-2 px-2 text-center font-semibold">ព្រឹក</th>
                <th className="py-2 px-2 text-center font-semibold">ថ្ងៃ</th>
                <th className="py-2 px-2 text-center font-semibold">ល្ងាច</th>
                <th className="py-2 px-2 text-center font-semibold">យប់</th>
                <th className="py-2 px-2 text-center font-semibold">ចំនួនថ្ងៃ</th>
                <th className="py-2 px-2 text-left font-semibold">របៀបប្រើប្រាស់</th>
              </tr>
            </thead>
            <tbody>
              {prescription.medicines?.map((med, index) => (
                <tr key={med.id} className="border-b border-gray-200">
                  <td className="py-2 px-2">{index + 1}.</td>
                  <td className="py-2 px-2">{med.medicine?.name}</td>
                  <td className="py-2 px-2 text-center">{med.morning || ''}</td>
                  <td className="py-2 px-2 text-center">{med.afternoon || ''}</td>
                  <td className="py-2 px-2 text-center">{med.evening || ''}</td>
                  <td className="py-2 px-2 text-center">{med.night || ''}</td>
                  <td className="py-2 px-2 text-center">{med.quantity}</td>
                  <td className="py-2 px-2">{med.instructions || ''}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Appointment & Signature */}
          <div className="flex justify-between items-start mt-8 text-[14px]">
            <div>
              <p className="mb-2"><span className="font-semibold">ថ្ងៃណាត់:</span> ............................................</p>
              <p className="text-[13px] text-gray-600">សូមយកវេជ្ជបញ្ជាមកជាមួយ លេីម្រកពិនិត្យលើកក្រោយ។</p>
            </div>
            <div className="text-right">
              <p className="mb-1">{formatDate(prescription.createdAt)}</p>
              <p className="font-semibold mb-8">គ្រូពេទ្យព្យាបាល</p>
              <p className="font-semibold text-[#4A90D9]">{prescription.doctor?.name}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-[#4A90D9] text-center text-[12px] text-gray-600">
            <p>អាសយដ្ឋាន: ផ្ទះលេខ ៤៧ដេ ផ្លូវលេខ ៣៦០, សង្កាត់ បឹងកេងកង១, ខណ្ឌ ចំការមន, ភ្នំពេញ</p>
            <p>ទូរស័ព្ទលេខ: ០៨៨-០២៣ ៦៦៦៦ ២៣៧/ ០១១ ៣៩ ៨៨៨៨</p>
          </div>
        </div>

        {/* ========== INVOICE ========== */}
        {showInvoice && (
          <div className="bg-white border-2 border-[#4A90D9] p-6 print:border print:p-4 print:break-before-page">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-[#4A90D9]">
              <img src="/logo/left.png" alt="Logo" className="h-14 w-auto" />
              <div className="text-center">
                <h1 className="text-[20px] font-bold text-[#4A90D9]">មន្ទីរពហុព្យាបាល សុខ លាភ មេត្រី</h1>
                <p className="text-[16px] font-semibold text-[#4A90D9]">SOK LEAP METREY POLYCLINIC</p>
              </div>
              <img src="/logo/right.png" alt="Logo" className="h-14 w-auto" />
            </div>

            {/* Title */}
            <h2 className="text-[22px] font-bold text-center text-[#4A90D9] mb-4">វិក្កយប័ត្រ</h2>

            {/* Patient Info */}
            <div className="mb-4 text-[15px] flex gap-8">
              <p><span className="font-semibold">ឈ្មោះ:</span> {prescription.patient?.name}</p>
              <p><span className="font-semibold">ភេទ</span> {prescription.patient?.gender === 'MALE' ? 'ប្រុស' : prescription.patient?.gender === 'FEMALE' ? 'ស្រី' : prescription.patient?.gender}</p>
              <p><span className="font-semibold">អាយុ</span> {prescription.patient?.age} ឆ្នាំ</p>
            </div>

            {/* Invoice Table */}
            <table className="w-full border-collapse mb-4 text-[14px]">
              <thead>
                <tr className="border-b-2 border-[#4A90D9] bg-[#E8F4FD]">
                  <th className="py-2 px-2 text-left font-semibold">ល.រ</th>
                  <th className="py-2 px-2 text-left font-semibold">បរិយាយ</th>
                  <th className="py-2 px-2 text-right font-semibold">តម្លៃឯកតា</th>
                  <th className="py-2 px-2 text-center font-semibold">ចំនួនដង</th>
                  <th className="py-2 px-2 text-right font-semibold">តម្លៃសរុប</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-2">1.</td>
                  <td className="py-2 px-2">Consultation</td>
                  <td className="py-2 px-2 text-right">{consultationFeeKHR.toLocaleString()} រៀល</td>
                  <td className="py-2 px-2 text-center">1</td>
                  <td className="py-2 px-2 text-right">{consultationFeeKHR.toLocaleString()} រៀល</td>
                </tr>
                {prescription.medicines?.map((med, index) => {
                  const unitPrice = med.medicine?.costKHR || 0;
                  const qty = parseFloat(med.quantity) || 0;
                  const total = unitPrice * qty;
                  return (
                    <tr key={med.id} className="border-b border-gray-200">
                      <td className="py-2 px-2">{index + 2}.</td>
                      <td className="py-2 px-2">{med.medicine?.name}</td>
                      <td className="py-2 px-2 text-right">{unitPrice.toLocaleString()} រៀល</td>
                      <td className="py-2 px-2 text-center">{med.quantity}</td>
                      <td className="py-2 px-2 text-right">{total.toLocaleString()} រៀល</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {/* Total */}
            <div className="flex justify-end mb-6">
              <div className="bg-[#E8F4FD] px-6 py-2 border border-[#4A90D9]">
                <span className="font-bold text-[16px]">{totalKHR.toLocaleString()} រៀល</span>
              </div>
            </div>

            {/* Signature */}
            <div className="flex justify-end text-[14px]">
              <div className="text-right">
                <p className="mb-1">{formatDate(prescription.createdAt)}</p>
                <p className="font-semibold mb-12">បង្កើតដោយ</p>
                <p className="font-semibold text-[#4A90D9]">{prescription.doctor?.name}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t border-[#4A90D9] text-center text-[12px] text-gray-600">
              <p>អាសយដ្ឋាន: ផ្ទះលេខ ៤៧ដេ ផ្លូវលេខ ៣៦០, សង្កាត់ បឹងកេងកង១, ខណ្ឌ ចំការមន, ភ្នំពេញ</p>
              <p>ទូរស័ព្ទលេខ: ០៨៨-០២៣ ៦៦៦៦ ២៣៧/ ០១១ ៣៩ ៨៨៨៨</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
