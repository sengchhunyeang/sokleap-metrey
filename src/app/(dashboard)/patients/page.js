'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { UserPlus, Search, Eye, Trash2 } from 'react-feather';
import { Button, Card, Table, Badge, Pagination, Loading } from '@/app/components/ui';

export default function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });
  const limit = 10;
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    fetchPatients(page, search);
  }, [page]);

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      setPage(1);
      fetchPatients(1, search);
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [search]);

  async function fetchPatients(currentPage = page, searchQuery = search) {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: limit.toString(),
      });
      if (searchQuery) {
        params.set('search', searchQuery);
      }
      const res = await fetch(`/api/patients?${params}`);
      const data = await res.json();
      setPatients(data.patients || []);
      setPagination(data.pagination || { total: 0, totalPages: 1 });
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this patient?')) return;

    try {
      const res = await fetch(`/api/patients/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPatients(patients.filter((p) => p.id !== id));
      }
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[20px] font-bold text-[#050505]">
          Patients ({pagination.total.toLocaleString()})
        </h1>
        <Link href="/patients/new">
          <Button className="flex items-center gap-2">
            <UserPlus size={16} />
            Add Patient
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ABAFB1]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by NSSF ID, name, or phone..."
            className="form-input pl-10"
          />
        </div>
      </div>

      {/* Patients Table */}
      <Card>
        {loading ? (
          <Loading text="Loading patients..." />
        ) : (
          <Table>
            <Table.Head>
              <tr>
                <Table.Th>NSSF ID</Table.Th>
                <Table.Th>Name</Table.Th>
                <Table.Th>Gender</Table.Th>
                <Table.Th>Age</Table.Th>
                <Table.Th>Phone</Table.Th>
                <Table.Th>Actions</Table.Th>
              </tr>
            </Table.Head>
            <Table.Body>
              {patients.length > 0 ? (
                patients.map((patient) => (
                  <Table.Row key={patient.id}>
                    <Table.Td bold className="font-mono">{patient.nssfId || '-'}</Table.Td>
                    <Table.Td>
                      <div className="font-semibold text-[#050505]">
                        {patient.khmerName || patient.name}
                      </div>
                      {patient.nameLatin && (
                        <div className="text-[#5E6366] text-[10px]">{patient.nameLatin}</div>
                      )}
                    </Table.Td>
                    <Table.Td>
                      <Badge variant={patient.gender === 'MALE' ? 'pending' : 'success'}>
                        {patient.gender}
                      </Badge>
                    </Table.Td>
                    <Table.Td>{patient.age}</Table.Td>
                    <Table.Td>{patient.phone || '-'}</Table.Td>
                    <Table.Td>
                      <Link
                        href={`/patients/${patient.id}`}
                        className="inline-flex items-center gap-1 text-[#142A4E] hover:underline font-semibold mr-3"
                      >
                        <Eye size={14} />
                        View
                      </Link>
                      <button
                        onClick={() => handleDelete(patient.id)}
                        className="inline-flex items-center gap-1 text-[#F4645B] hover:underline font-semibold"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </Table.Td>
                  </Table.Row>
                ))
              ) : (
                <Table.Empty colSpan={6}>
                  No patients found.{' '}
                  <Link href="/patients/new" className="text-[#142A4E] hover:underline font-semibold">
                    Add your first patient
                  </Link>
                </Table.Empty>
              )}
            </Table.Body>
          </Table>
        )}
      </Card>

      {/* Pagination */}
      <Pagination
        currentPage={page}
        totalPages={pagination.totalPages}
        onPageChange={(newPage) => {
          setPage(newPage);
          fetchPatients(newPage, search);
        }}
      />
    </div>
  );
}
