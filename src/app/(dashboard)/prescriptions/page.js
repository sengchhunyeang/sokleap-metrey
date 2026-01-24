'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { FilePlus, Eye, Trash2, Search, Edit2, Printer } from 'react-feather';
import { Button, Card, Table, Badge, Pagination, Loading } from '@/app/components/ui';

export default function PrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    fetchPrescriptions(1, '');
  }, []);

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setPage(1);
      fetchPrescriptions(1, search);
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [search]);

  async function fetchPrescriptions(currentPage = page, searchQuery = search) {
    try {
      setLoading(true);
      const params = new URLSearchParams({ page: currentPage, limit });
      if (searchQuery) params.append('search', searchQuery);
      const res = await fetch(`/api/prescriptions?${params}`);
      const data = await res.json();
      setPrescriptions(data.prescriptions || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
      setPage(currentPage);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
      setPrescriptions([]);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this prescription?')) return;

    try {
      const res = await fetch(`/api/prescriptions/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchPrescriptions(page, search);
      }
    } catch (error) {
      console.error('Error deleting prescription:', error);
    }
  };

  const handlePrint = (id) => {
    // Open print page in new window
    const printWindow = window.open(`/prescriptions/${id}/print`, '_blank', 'width=800,height=600');
    printWindow.focus();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[20px] font-bold text-[#050505]">Prescriptions ({total})</h1>
        <Link href="/prescriptions/new">
          <Button className="flex items-center gap-2">
            <FilePlus size={16} />
            New Prescription
          </Button>
        </Link>
      </div>

      {/* Search Box */}
      <div className="mb-6">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ABAFB1]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by NSSF ID, Patient Name, or Diagnosis..."
            className="form-input pl-10"
          />
        </div>
      </div>

      <Card>
        {loading ? (
          <Loading text="Loading prescriptions..." />
        ) : (
          <Table>
            <Table.Head>
              <tr>
                <Table.Th>Date</Table.Th>
                <Table.Th>NSSF ID</Table.Th>
                <Table.Th>Patient</Table.Th>
                <Table.Th>Doctor</Table.Th>
                <Table.Th>Diagnosis</Table.Th>
                <Table.Th>Medicines</Table.Th>
                <Table.Th>Actions</Table.Th>
              </tr>
            </Table.Head>
            <Table.Body>
              {prescriptions.length > 0 ? (
                prescriptions.map((prescription) => (
                  <Table.Row key={prescription.id}>
                    <Table.Td>{new Date(prescription.createdAt).toLocaleDateString()}</Table.Td>
                    <Table.Td bold>{prescription.patient?.nssfId || '-'}</Table.Td>
                    <Table.Td>
                      <div>
                        <span className="font-semibold text-[#050505]">
                          {prescription.patient?.khmerName || prescription.patient?.name}
                        </span>
                        {prescription.patient?.nameLatin && (
                          <span className="text-[#5E6366] text-[12px] block">
                            {prescription.patient?.nameLatin}
                          </span>
                        )}
                      </div>
                    </Table.Td>
                    <Table.Td>{prescription.doctor?.name}</Table.Td>
                    <Table.Td>{prescription.diagnosis}</Table.Td>
                    <Table.Td>
                      <Badge variant="default">
                        {prescription.medicines?.length || 0}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Link
                        href={`/prescriptions/${prescription.id}`}
                        className="inline-flex items-center gap-1 text-[#142A4E] hover:underline font-semibold mr-3"
                      >
                        <Eye size={14} />
                        View
                      </Link>
                      <Link
                        href={`/prescriptions/${prescription.id}/edit`}
                        className="inline-flex items-center gap-1 text-[#32936F] hover:underline font-semibold mr-3"
                      >
                        <Edit2 size={14} />
                        Edit
                      </Link>
                      <button
                        onClick={() => handlePrint(prescription.id)}
                        className="inline-flex items-center gap-1 text-[#677FD2] hover:underline font-semibold mr-3"
                      >
                        <Printer size={14} />
                        Print
                      </button>
                      <button
                        onClick={() => handleDelete(prescription.id)}
                        className="inline-flex items-center gap-1 text-[#F4645B] hover:underline font-semibold"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </Table.Td>
                  </Table.Row>
                ))
              ) : (
                <Table.Empty colSpan={7}>
                  {search ? (
                    <span>No prescriptions found for &quot;{search}&quot;</span>
                  ) : (
                    <>
                      No prescriptions yet.{' '}
                      <Link href="/prescriptions/new" className="text-[#142A4E] hover:underline font-semibold">
                        Create your first prescription
                      </Link>
                    </>
                  )}
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
        onPageChange={(newPage) => fetchPrescriptions(newPage, search)}
      />
    </div>
  );
}
