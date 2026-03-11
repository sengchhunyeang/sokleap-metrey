'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Edit2, FilePlus, Eye } from 'react-feather';
import { Button, Input, Select, Card, Badge } from '@/app/components/ui';
import { CardHeader, CardTitle } from '@/app/components/ui/Card';
import type { Patient } from '@/types';

interface PatientDetailClientProps {
  patient: Patient;
}

export default function PatientDetailClient({ patient: initialPatient }: PatientDetailClientProps) {
  const [patient, setPatient] = useState(initialPatient);
  const [editing, setEditing] = useState(false);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch(`/api/patients/${patient.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          gender: formData.get('gender'),
          age: formData.get('age'),
          phone: formData.get('phone'),
          address: formData.get('address'),
        }),
      });

      if (res.ok) {
        const updated = await res.json();
        setPatient({ ...patient, ...updated });
        setEditing(false);
      }
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <Link href="/patients" className="inline-flex items-center gap-2 text-[#142A4E] hover:underline font-semibold text-[14px]">
          <ArrowLeft size={16} />
          Back to Patients
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Patient Info</CardTitle>
            <button
              onClick={() => setEditing(!editing)}
              className="inline-flex items-center gap-1 text-[#142A4E] hover:underline text-[12px] font-semibold"
            >
              <Edit2 size={12} />
              {editing ? 'Cancel' : 'Edit'}
            </button>
          </CardHeader>

          {editing ? (
            <form onSubmit={handleUpdate} className="space-y-3">
              <Input name="name" defaultValue={patient.name} required placeholder="Name" />
              <Select
                name="gender"
                defaultValue={patient.gender}
                options={[
                  { value: 'MALE', label: 'Male' },
                  { value: 'FEMALE', label: 'Female' },
                  { value: 'OTHER', label: 'Other' },
                ]}
              />
              <Input name="age" type="number" defaultValue={patient.age} placeholder="Age" />
              <Input name="phone" type="tel" defaultValue={patient.phone || ''} placeholder="Phone" />
              <textarea
                name="address"
                defaultValue={patient.address || ''}
                placeholder="Address"
                className="form-input"
                rows={2}
              ></textarea>
              <Button type="submit">Save Changes</Button>
            </form>
          ) : (
            <div className="space-y-3">
              <div>
                <span className="text-[#5E6366] text-[12px]">Name</span>
                <p className="font-semibold text-[#050505]">{patient.name}</p>
              </div>
              <div>
                <span className="text-[#5E6366] text-[12px]">Gender</span>
                <p>
                  <Badge variant={patient.gender === 'MALE' ? 'pending' : 'success'}>
                    {patient.gender}
                  </Badge>
                </p>
              </div>
              <div>
                <span className="text-[#5E6366] text-[12px]">Age</span>
                <p className="text-[#050505]">{patient.age} years</p>
              </div>
              <div>
                <span className="text-[#5E6366] text-[12px]">Phone</span>
                <p className="text-[#050505]">{patient.phone || '-'}</p>
              </div>
              <div>
                <span className="text-[#5E6366] text-[12px]">Address</span>
                <p className="text-[#050505]">{patient.address || '-'}</p>
              </div>
            </div>
          )}

          <div className="mt-6">
            <Link href={`/prescriptions/new?patientId=${patient.id}`}>
              <Button className="w-full flex items-center justify-center gap-2">
                <FilePlus size={16} />
                New Prescription
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Prescription History</CardTitle>
          </CardHeader>

          {patient.prescriptions && patient.prescriptions.length > 0 ? (
            <div className="space-y-4">
              {patient.prescriptions.map((prescription: any) => (
                <div
                  key={prescription.id}
                  className="border border-[#ABAFB1] rounded-lg p-4 hover:bg-[#F5F5FA]"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-[#050505]">
                        {prescription.diagnosis}
                      </p>
                      <p className="text-[12px] text-[#5E6366]">
                        Dr. {prescription.doctor?.name}
                      </p>
                      <p className="text-[12px] text-[#ABAFB1]">
                        {new Date(prescription.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Link
                      href={`/prescriptions/${prescription.id}`}
                      className="inline-flex items-center gap-1 text-[#142A4E] hover:underline text-[12px] font-semibold"
                    >
                      <Eye size={12} />
                      View Details
                    </Link>
                  </div>
                  {prescription.medicines?.length > 0 && (
                    <div className="mt-2">
                      <Badge variant="default">
                        {prescription.medicines.length} medicines
                      </Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[#5E6366] text-center py-4 text-[14px]">
              No prescriptions yet
            </p>
          )}
        </Card>
      </div>
    </div>
  );
}
