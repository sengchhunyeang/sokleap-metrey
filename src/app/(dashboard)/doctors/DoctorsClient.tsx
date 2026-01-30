'use client';

import { useState, useRef } from 'react';
import { UserPlus, Edit2, Trash2, Search } from 'react-feather';
import { Button, Input, Card, Table, Badge, Pagination } from '@/app/components/ui';
import { CardHeader, CardTitle } from '@/app/components/ui/Card';
import { TableHead, TableBody, TableRow, TableTh, TableTd, TableEmpty } from '@/app/components/ui/Table';
import { SkeletonTableRows } from '@/app/components/ui/Skeleton';
import type { Doctor, PaginationData } from '@/types';

interface DoctorsClientProps {
  initialDoctors: Doctor[];
  initialPagination: PaginationData;
}

export default function DoctorsClient({ initialDoctors, initialPagination }: DoctorsClientProps) {
  const [doctors, setDoctors] = useState(initialDoctors);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(initialPagination);
  const limit = 10;
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    phone: '',
  });

  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      setPage(1);
      fetchDoctors(1, value);
    }, 300);
  };

  async function fetchDoctors(currentPage = page, searchQuery = search) {
    try {
      setLoading(true);
      const params = new URLSearchParams({ page: currentPage.toString(), limit: limit.toString() });
      if (searchQuery) params.append('search', searchQuery);
      const res = await fetch(`/api/doctors?${params}`);
      const data = await res.json();
      setDoctors(data.doctors || []);
      setPagination({ total: data.total || 0, totalPages: data.totalPages || 1 });
      setPage(currentPage);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (editingDoctor) {
        const res = await fetch(`/api/doctors/${editingDoctor.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          fetchDoctors(page, search);
        }
      } else {
        const res = await fetch('/api/doctors', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          fetchDoctors(page, search);
        }
      }

      resetForm();
    } catch (error) {
      console.error('Error saving doctor:', error);
    }
  };

  const handleEdit = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name,
      specialty: doctor.specialty || '',
      phone: doctor.phone || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this doctor?')) return;

    try {
      const res = await fetch(`/api/doctors/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchDoctors(page, search);
      }
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  const toggleActive = async (doctor: Doctor) => {
    try {
      const res = await fetch(`/api/doctors/${doctor.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...doctor, isActive: !doctor.isActive }),
      });
      if (res.ok) {
        fetchDoctors(page, search);
      }
    } catch (error) {
      console.error('Error updating doctor:', error);
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingDoctor(null);
    setFormData({ name: '', specialty: '', phone: '' });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[20px] font-bold text-[#050505]">Doctors ({pagination.total})</h1>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <UserPlus size={16} />
          Add Doctor
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ABAFB1]" />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search by name or specialty..."
            className="form-input pl-10"
          />
        </div>
      </div>

      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>{editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}</CardTitle>
          </CardHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Name"
              value={formData.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="Doctor name"
            />
            <Input
              label="Specialty"
              value={formData.specialty}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, specialty: e.target.value })}
              placeholder="e.g. General, Cardiology"
            />
            <Input
              label="Phone"
              type="tel"
              value={formData.phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Phone number"
            />
            <div className="flex gap-2">
              <Button type="submit">
                {editingDoctor ? 'Update' : 'Save'}
              </Button>
              <Button type="button" variant="secondary" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <Card>
        <Table>
          <TableHead>
            <tr>
              <TableTh>Name</TableTh>
              <TableTh>Specialty</TableTh>
              <TableTh>Phone</TableTh>
              <TableTh>Status</TableTh>
              <TableTh>Actions</TableTh>
            </tr>
          </TableHead>
          <TableBody>
            {loading ? (
              <SkeletonTableRows rows={10} cols={5} />
            ) : doctors.length > 0 ? (
              doctors.map((doctor) => (
                <TableRow key={doctor.id}>
                  <TableTd bold>{doctor.name}</TableTd>
                  <TableTd>{doctor.specialty || '-'}</TableTd>
                  <TableTd>{doctor.phone || '-'}</TableTd>
                  <TableTd>
                    <button onClick={() => toggleActive(doctor)}>
                      <Badge variant={doctor.isActive ? 'success' : 'danger'}>
                        {doctor.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </button>
                  </TableTd>
                  <TableTd>
                    <button
                      onClick={() => handleEdit(doctor)}
                      className="inline-flex items-center gap-1 text-[#142A4E] hover:underline font-semibold mr-3"
                    >
                      <Edit2 size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(doctor.id)}
                      className="inline-flex items-center gap-1 text-[#F4645B] hover:underline font-semibold"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </TableTd>
                </TableRow>
              ))
            ) : (
              <TableEmpty colSpan={5}>
                No doctors found.
              </TableEmpty>
            )}
          </TableBody>
        </Table>
      </Card>

      <Pagination
        currentPage={page}
        totalPages={pagination.totalPages}
        onPageChange={(newPage: number) => fetchDoctors(newPage, search)}
      />
    </div>
  );
}
