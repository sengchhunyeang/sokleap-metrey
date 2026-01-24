'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, X } from 'react-feather';
import { Button, Input, Select, Card, Alert } from '@/app/components/ui';

export default function NewPatientPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      gender: formData.get('gender'),
      age: formData.get('age'),
      phone: formData.get('phone'),
      address: formData.get('address'),
    };

    try {
      const res = await fetch('/api/patients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || 'Failed to create patient');
      }

      router.push('/patients');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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

      <Card className="max-w-2xl">
        <h1 className="text-[20px] font-bold text-[#050505] mb-6">
          Add New Patient
        </h1>

        {error && (
          <Alert variant="error" className="mb-4">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            name="name"
            required
            placeholder="Enter patient name"
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Gender"
              name="gender"
              required
              options={[
                { value: '', label: 'Select Gender' },
                { value: 'MALE', label: 'Male' },
                { value: 'FEMALE', label: 'Female' },
                { value: 'OTHER', label: 'Other' },
              ]}
            />

            <Input
              label="Age"
              name="age"
              type="number"
              required
              min="0"
              max="150"
              placeholder="Age"
            />
          </div>

          <Input
            label="Phone"
            name="phone"
            type="tel"
            placeholder="Phone number"
          />

          <div>
            <label className="form-label">Address</label>
            <textarea
              name="address"
              rows="3"
              className="form-input"
              placeholder="Enter address"
            ></textarea>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" loading={loading} className="flex items-center gap-2">
              <Save size={16} />
              Save Patient
            </Button>
            <Link href="/patients">
              <Button variant="secondary" className="flex items-center gap-2">
                <X size={16} />
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
