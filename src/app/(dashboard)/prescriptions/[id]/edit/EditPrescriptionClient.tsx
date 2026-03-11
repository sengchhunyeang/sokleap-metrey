'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, X } from 'react-feather';
import { Button, Select, Card, Alert, Loading } from '@/app/components/ui';
import type { Doctor, PrescriptionWithRelations } from '@/types';

interface EditPrescriptionClientProps {
  prescription: PrescriptionWithRelations & { patient?: any };
  doctors: Doctor[];
}

interface MedicineEntry {
  medicineId: string;
  medicineName: string;
  dosage: string;
  frequency: string;
  timing: string;
  quantity: string;
  instructions: string;
}

export default function EditPrescriptionClient({ prescription, doctors }: EditPrescriptionClientProps) {
  const router = useRouter();
  const id = prescription.id;

  const [selectedDoctor, setSelectedDoctor] = useState(prescription.doctorId || '');
  const [diagnosis, setDiagnosis] = useState(prescription.diagnosis || '');
  const [appointmentDate, setAppointmentDate] = useState(
    prescription.appointmentDate ? new Date(prescription.appointmentDate).toISOString().split('T')[0] : ''
  );
  const [prescriptionMedicines, setPrescriptionMedicines] = useState<MedicineEntry[]>(
    prescription.medicines?.map((med: any) => ({
      medicineId: med.medicineId,
      medicineName: med.medicine?.name || '',
      dosage: med.dosage || '',
      frequency: med.frequency || '',
      timing: med.timing || '',
      quantity: med.quantity || '',
      instructions: med.instructions || '',
    })) || []
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Diagnosis search state
  const [diagnosisSearch, setDiagnosisSearch] = useState(prescription.diagnosis || '');
  const [diagnosisResults, setDiagnosisResults] = useState<any[]>([]);
  const [showDiagnosisDropdown, setShowDiagnosisDropdown] = useState(false);
  const [searchingDiagnosis, setSearchingDiagnosis] = useState(false);
  const diagnosisSearchRef = useRef<HTMLDivElement>(null);
  const diagnosisTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Medicine search state
  const [medicineSearchIndex, setMedicineSearchIndex] = useState<string | null>(null);
  const [medicineSearch, setMedicineSearch] = useState('');
  const [medicineResults, setMedicineResults] = useState<any[]>([]);
  const [showMedicineDropdown, setShowMedicineDropdown] = useState(false);
  const [searchingMedicine, setSearchingMedicine] = useState(false);
  const medicineSearchRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const medicineTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (diagnosisSearchRef.current && !diagnosisSearchRef.current.contains(event.target as Node)) {
        setShowDiagnosisDropdown(false);
      }
      const clickedInsideMedicine = Object.values(medicineSearchRefs.current).some(ref => ref && ref.contains(event.target as Node));
      if (!clickedInsideMedicine) {
        setShowMedicineDropdown(false);
        setMedicineSearchIndex(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (diagnosisTimeoutRef.current) clearTimeout(diagnosisTimeoutRef.current);
    if (diagnosisSearch.length < 1) { setDiagnosisResults([]); setShowDiagnosisDropdown(false); return; }
    diagnosisTimeoutRef.current = setTimeout(async () => {
      setSearchingDiagnosis(true);
      try {
        const res = await fetch(`/api/diagnoses?search=${encodeURIComponent(diagnosisSearch)}&limit=15`);
        const data = await res.json();
        setDiagnosisResults(data.diagnoses || []);
        setShowDiagnosisDropdown(true);
      } catch (err) { console.error('Error searching diagnoses:', err); }
      finally { setSearchingDiagnosis(false); }
    }, 300);
    return () => { if (diagnosisTimeoutRef.current) clearTimeout(diagnosisTimeoutRef.current); };
  }, [diagnosisSearch]);

  useEffect(() => {
    if (medicineTimeoutRef.current) clearTimeout(medicineTimeoutRef.current);
    if (medicineSearch.length < 1) { setMedicineResults([]); setShowMedicineDropdown(false); return; }
    medicineTimeoutRef.current = setTimeout(async () => {
      setSearchingMedicine(true);
      try {
        const res = await fetch(`/api/medicines?search=${encodeURIComponent(medicineSearch)}&limit=15`);
        const data = await res.json();
        setMedicineResults(data.medicines || []);
        setShowMedicineDropdown(true);
      } catch (err) { console.error('Error searching medicines:', err); }
      finally { setSearchingMedicine(false); }
    }, 300);
    return () => { if (medicineTimeoutRef.current) clearTimeout(medicineTimeoutRef.current); };
  }, [medicineSearch]);

  const handleSelectDiagnosis = (item: any) => { setDiagnosis(item.name); setDiagnosisSearch(item.name); setShowDiagnosisDropdown(false); };
  const clearDiagnosisSelection = () => { setDiagnosis(''); setDiagnosisSearch(''); setDiagnosisResults([]); };
  const updateMedicine = (index: number, field: string, value: string) => { const updated = [...prescriptionMedicines]; (updated[index] as any)[field] = value; setPrescriptionMedicines(updated); };
  const removeMedicine = (index: number) => { setPrescriptionMedicines(prescriptionMedicines.filter((_, i) => i !== index)); };
  const addMedicine = (medicine: any) => {
    setPrescriptionMedicines([...prescriptionMedicines, { medicineId: medicine.id, medicineName: medicine.name, dosage: '', frequency: '', timing: '', quantity: '', instructions: '' }]);
    setMedicineSearch(''); setShowMedicineDropdown(false); setMedicineSearchIndex(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(''); setSaving(true);
    if (!selectedDoctor || !diagnosis) { setError('Please fill in all required fields'); setSaving(false); return; }
    try {
      const res = await fetch(`/api/prescriptions/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ patientId: prescription.patientId, doctorId: selectedDoctor, diagnosis, appointmentDate: appointmentDate || null, medicines: prescriptionMedicines.filter((m) => m.medicineId) }),
      });
      if (!res.ok) { const result = await res.json(); throw new Error(result.error || 'Failed to update prescription'); }
      router.push(`/prescriptions/${id}`);
    } catch (err: any) { setError(err.message); }
    finally { setSaving(false); }
  };

  return (
    <div>
      <div className="mb-6">
        <Link href={`/prescriptions/${id}`} className="inline-flex items-center gap-2 text-[#142A4E] hover:underline font-semibold text-[14px]">
          <ArrowLeft size={16} /> Back to Prescription
        </Link>
      </div>

      <Card>
        <h1 className="text-[20px] font-bold text-[#050505] mb-6">Edit Prescription</h1>
        {error && <Alert variant="error" className="mb-4">{error}</Alert>}

        <div className="mb-6 p-4 bg-[#F5F5FA] rounded">
          <label className="form-label">Patient</label>
          <div className="text-[14px]">
            <strong className="text-[#050505]">{prescription.patient?.nssfId || 'No NSSF ID'}</strong>
            <span className="text-[#5E6366] ml-2">{prescription.patient?.khmerName || prescription.patient?.name}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Select label="Doctor *" value={selectedDoctor} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedDoctor(e.target.value)} required
            options={[{ value: '', label: 'Select Doctor' }, ...doctors.map((d) => ({ value: d.id, label: `${d.name}${d.specialty ? ` - ${d.specialty}` : ''}` }))]} />

          {/* Diagnosis */}
          <div>
            <label className="form-label">Diagnosis *</label>
            <div className="relative" ref={diagnosisSearchRef}>
              <div className="flex">
                <input type="text" value={diagnosisSearch} onChange={(e) => { setDiagnosisSearch(e.target.value); setDiagnosis(e.target.value); }}
                  onFocus={() => { if (diagnosisResults.length > 0) setShowDiagnosisDropdown(true); }} placeholder="Search diagnosis..." className="form-input" required />
                {diagnosis && <button type="button" onClick={clearDiagnosisSelection} className="ml-1 px-3 text-[#F4645B] font-bold">✕</button>}
              </div>
              {showDiagnosisDropdown && diagnosisResults.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
                  {diagnosisResults.map((item: any) => (<div key={item.id} onClick={() => handleSelectDiagnosis(item)} className="p-3 hover:bg-[#F5F5FA] cursor-pointer text-[14px]">{item.name}</div>))}
                </div>
              )}
            </div>
          </div>

          {/* Appointment Date */}
          <div>
            <label className="form-label">Appointment Date</label>
            <input type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} className="form-input" />
          </div>

          {/* Medicines */}
          <div>
            <label className="form-label">Medicines</label>
            <div className="relative mb-4" ref={(el) => { medicineSearchRefs.current['add'] = el; }}>
              <input type="text" value={medicineSearchIndex === 'add' ? medicineSearch : ''} onChange={(e) => { setMedicineSearch(e.target.value); setMedicineSearchIndex('add'); }}
                onFocus={() => setMedicineSearchIndex('add')} placeholder="+ Type medicine name to add..." className="w-full px-4 py-3 text-[14px] border border-[#E0E0E0] rounded-lg" />
              {medicineSearchIndex === 'add' && showMedicineDropdown && medicineResults.length > 0 && (
                <div className="absolute z-20 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {medicineResults.map((item: any) => (<div key={item.id} onClick={() => addMedicine(item)} className="px-4 py-3 hover:bg-[#F5F5FA] cursor-pointer text-[14px]">{item.name}</div>))}
                </div>
              )}
            </div>

            {prescriptionMedicines.length > 0 ? (
              <div className="space-y-3">
                {prescriptionMedicines.map((med, index) => (
                  <div key={index} className="bg-white border border-[#E0E0E0] rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-[#142A4E] text-white rounded-full flex items-center justify-center text-[12px] font-bold">{index + 1}</span>
                        <span className="font-semibold text-[15px]">{med.medicineName}</span>
                      </div>
                      <button type="button" onClick={() => removeMedicine(index)} className="text-[#BDBDBD] hover:text-[#F44336]"><X size={18} /></button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                      <div><label className="text-[11px] text-[#757575] block mb-1">Dosage</label><input type="text" value={med.dosage || ''} onChange={(e) => updateMedicine(index, 'dosage', e.target.value)} placeholder="e.g., 500mg" className="w-full px-3 py-2 text-[13px] border border-[#E0E0E0] rounded" /></div>
                      <div><label className="text-[11px] text-[#757575] block mb-1">Frequency</label><select value={med.frequency || ''} onChange={(e) => updateMedicine(index, 'frequency', e.target.value)} className="w-full px-3 py-2 text-[13px] border border-[#E0E0E0] rounded"><option value="">Select...</option><option value="1x">Once daily</option><option value="2x">Twice daily</option><option value="3x">3 times daily</option></select></div>
                      <div><label className="text-[11px] text-[#757575] block mb-1">When to take</label><select value={med.timing || ''} onChange={(e) => updateMedicine(index, 'timing', e.target.value)} className="w-full px-3 py-2 text-[13px] border border-[#E0E0E0] rounded"><option value="">Select...</option><option value="before">Before meals</option><option value="after">After meals</option><option value="morning">Morning</option><option value="night">At night</option></select></div>
                      <div><label className="text-[11px] text-[#757575] block mb-1">Quantity</label><input type="text" value={med.quantity || ''} onChange={(e) => updateMedicine(index, 'quantity', e.target.value)} placeholder="e.g., 30" className="w-full px-3 py-2 text-[13px] border border-[#E0E0E0] rounded" /></div>
                    </div>
                    <div><label className="text-[11px] text-[#757575] block mb-1">Instructions</label><input type="text" value={med.instructions || ''} onChange={(e) => updateMedicine(index, 'instructions', e.target.value)} placeholder="Special instructions..." className="w-full px-3 py-2 text-[13px] border border-[#E0E0E0] rounded" /></div>
                  </div>
                ))}
              </div>
            ) : (<div className="text-center py-8 text-[#ABAFB1] text-[14px]">No medicines added yet.</div>)}
          </div>

          {/* Submit */}
          <div className="flex gap-4 pt-4 border-t border-[#ABAFB1]">
            <Button type="submit" loading={saving} className="flex items-center gap-2"><Save size={16} /> Update Prescription</Button>
            <Link href={`/prescriptions/${id}`}><Button variant="secondary" className="flex items-center gap-2"><X size={16} /> Cancel</Button></Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
