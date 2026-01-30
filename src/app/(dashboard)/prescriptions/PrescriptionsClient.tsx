'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { FilePlus, Eye, Trash2, Search, Edit2, Printer } from 'react-feather';
import { Button, Card, Table, Badge, Pagination } from '@/app/components/ui';
import { TableHead, TableBody, TableRow, TableTh, TableTd, TableEmpty } from '@/app/components/ui/Table';
import { SkeletonTableRows } from '@/app/components/ui/Skeleton';
import type { PrescriptionWithRelations, PaginationData } from '@/types';

interface PrescriptionsClientProps {
  initialPrescriptions: PrescriptionWithRelations[];
  initialPagination: PaginationData;
}

export default function PrescriptionsClient({ initialPrescriptions, initialPagination }: PrescriptionsClientProps) {
  const [prescriptions, setPrescriptions] = useState(initialPrescriptions);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(initialPagination);
  const limit = 10;
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    searchTimeoutRef.current = setTimeout(() => {
      setPage(1);
      fetchPrescriptions(1, value);
    }, 300);
  };

  async function fetchPrescriptions(currentPage = page, searchQuery = search) {
    try {
      setLoading(true);
      const params = new URLSearchParams({ page: currentPage.toString(), limit: limit.toString() });
      if (searchQuery) params.append('search', searchQuery);
      const res = await fetch(`/api/prescriptions?${params}`);
      const data = await res.json();
      setPrescriptions(data.prescriptions || []);
      setPagination({ total: data.total || 0, totalPages: data.totalPages || 1 });
      setPage(currentPage);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
      setPrescriptions([]);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
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

  const handlePrint = (id: string) => {
    const printWindow = window.open(`/prescriptions/${id}/print`, '_blank', 'width=800,height=600');
    printWindow?.focus();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[20px] font-bold text-[#050505]">Prescriptions ({pagination.total})</h1>
        <Link href="/prescriptions/new">
          <Button className="flex items-center gap-2">
            <FilePlus size={16} />
            New Prescription
          </Button>
        </Link>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ABAFB1]" />
          <input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search by NSSF ID, Patient Name, or Diagnosis..."
            className="form-input pl-10"
          />
        </div>
      </div>

      <Card>
        <Table>
          <TableHead>
            <tr>
              <TableTh>Date</TableTh>
              <TableTh>NSSF ID</TableTh>
              <TableTh>Patient</TableTh>
              <TableTh>Doctor</TableTh>
              <TableTh>Diagnosis</TableTh>
              <TableTh>Medicines</TableTh>
              <TableTh>Actions</TableTh>
            </tr>
          </TableHead>
          <TableBody>
            {loading ? (
              <SkeletonTableRows rows={10} cols={7} />
            ) : prescriptions.length > 0 ? (
              prescriptions.map((prescription) => (
                <TableRow key={prescription.id}>
                  <TableTd>{new Date(prescription.createdAt).toLocaleDateString()}</TableTd>
                  <TableTd bold>{prescription.patient?.nssfId || '-'}</TableTd>
                  <TableTd>
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
                  </TableTd>
                  <TableTd>{prescription.doctor?.name}</TableTd>
                  <TableTd>{prescription.diagnosis}</TableTd>
                  <TableTd>
                    <Badge variant="default">
                      {prescription.medicines?.length || 0}
                    </Badge>
                  </TableTd>
                  <TableTd>
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
                  </TableTd>
                </TableRow>
              ))
            ) : (
              <TableEmpty colSpan={7}>
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
              </TableEmpty>
            )}
          </TableBody>
        </Table>
      </Card>

      <Pagination
        currentPage={page}
        totalPages={pagination.totalPages}
        onPageChange={(newPage: number) => fetchPrescriptions(newPage, search)}
      />
    </div>
  );
}
