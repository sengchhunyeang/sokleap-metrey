'use client';

import { useEffect, useState, useRef } from 'react';
import { UserPlus, Edit2, Trash2, Search } from 'react-feather';
import { Button, Input, Card, Table, Badge, Pagination, Loading } from '@/app/components/ui';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;
  const searchTimeoutRef = useRef(null);

  const [showForm, setShowForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    specialty: '',
    phone: '',
  });

  useEffect(() => {
    fetchDoctors(1, '');
  }, []);

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      setPage(1);
      fetchDoctors(1, search);
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [search]);

  async function fetchDoctors(currentPage = page, searchQuery = search) {
    try {
      setLoading(true);
      const params = new URLSearchParams({ page: currentPage, limit });
      if (searchQuery) params.append('search', searchQuery);
      const res = await fetch(`/api/doctors?${params}`);
      const data = await res.json();
      setDoctors(data.doctors || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
      setPage(currentPage);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e) => {
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

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
    setFormData({
      name: doctor.name,
      specialty: doctor.specialty || '',
      phone: doctor.phone || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
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

  const toggleActive = async (doctor) => {
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
        <h1 className="text-[20px] font-bold text-[#050505]">Doctors ({total})</h1>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <UserPlus size={16} />
          Add Doctor
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ABAFB1]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or specialty..."
            className="form-input pl-10"
          />
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <Card className="mb-6">
          <Card.Header>
            <Card.Title>{editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}</Card.Title>
          </Card.Header>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="Doctor name"
            />
            <Input
              label="Specialty"
              value={formData.specialty}
              onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
              placeholder="e.g. General, Cardiology"
            />
            <Input
              label="Phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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

      {/* Doctors Table */}
      <Card>
        {loading ? (
          <Loading text="Loading doctors..." />
        ) : (
          <Table>
            <Table.Head>
              <tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Specialty</Table.Th>
                <Table.Th>Phone</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Actions</Table.Th>
              </tr>
            </Table.Head>
            <Table.Body>
              {doctors.length > 0 ? (
                doctors.map((doctor) => (
                  <Table.Row key={doctor.id}>
                    <Table.Td bold>{doctor.name}</Table.Td>
                    <Table.Td>{doctor.specialty || '-'}</Table.Td>
                    <Table.Td>{doctor.phone || '-'}</Table.Td>
                    <Table.Td>
                      <button onClick={() => toggleActive(doctor)}>
                        <Badge variant={doctor.isActive ? 'success' : 'danger'}>
                          {doctor.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                      </button>
                    </Table.Td>
                    <Table.Td>
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
                    </Table.Td>
                  </Table.Row>
                ))
              ) : (
                <Table.Empty colSpan={5}>
                  No doctors found.
                </Table.Empty>
              )}
            </Table.Body>
          </Table>
        )}
      </Card>

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => fetchDoctors(newPage, search)}
      />
    </div>
  );
}
