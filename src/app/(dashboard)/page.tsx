'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Users, FileText, UserCheck, Calendar, UserPlus, FilePlus } from 'react-feather';

interface Prescription {
  id: string;
  diagnosis: string;
  createdAt: string;
  patient?: { name: string };
  doctor?: { name: string };
}

export default function Dashboard() {
  const [patientsCount, setPatientsCount] = useState(0);
  const [prescriptionsCount, setPrescriptionsCount] = useState(0);
  const [doctorsCount, setDoctorsCount] = useState(0);
  const [todayPrescriptionsCount, setTodayPrescriptionsCount] = useState(0);
  const [recentPrescriptions, setRecentPrescriptions] = useState<Prescription[]>([]);
  const [dbError, setDbError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        setPatientsCount(data.patientsCount);
        setPrescriptionsCount(data.prescriptionsCount);
        setDoctorsCount(data.doctorsCount);
        setTodayPrescriptionsCount(data.todayPrescriptionsCount);
        setRecentPrescriptions(data.recentPrescriptions);
      })
      .catch(() => {
        setDbError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const statCards = [
    {
      title: 'Total Patients',
      value: patientsCount,
      color: 'bg-[#142A4E]',
      href: '/patients',
      icon: Users,
    },
    {
      title: 'Total Prescriptions',
      value: prescriptionsCount,
      color: 'bg-[#32936F]',
      href: '/prescriptions',
      icon: FileText,
    },
    {
      title: 'Active Doctors',
      value: doctorsCount,
      color: 'bg-[#677FD2]',
      href: '/doctors',
      icon: UserCheck,
    },
    {
      title: "Today's Prescriptions",
      value: todayPrescriptionsCount,
      color: 'bg-[#F0A20B]',
      href: '/prescriptions',
      icon: Calendar,
    },
  ];

  return (
    <div>
      <h1 className="text-[20px] font-bold text-[#050505] mb-6">Dashboard</h1>

      {dbError && (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-4 mb-6 text-[14px]">
          Unable to connect to the database. Showing default values.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.title}
              href={stat.href}
              className={`${stat.color} text-white rounded-lg p-6 shadow hover:shadow-lg transition`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-[14px] font-medium opacity-90">{stat.title}</h3>
                  <p className="text-[28px] font-bold mt-2">
                    {loading ? '—' : stat.value.toLocaleString()}
                  </p>
                </div>
                <Icon size={32} className="opacity-80" />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="card mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[16px] font-bold text-[#050505]">Quick Actions</h2>
        </div>
        <div className="flex flex-wrap gap-4">
          <Link href="/patients/new">
            <button type="button" className="btn-primary flex items-center gap-2">
              <UserPlus size={16} />
              New Patient
            </button>
          </Link>
          <Link href="/prescriptions/new">
            <button type="button" className="btn-primary flex items-center gap-2">
              <FilePlus size={16} />
              New Prescription
            </button>
          </Link>
        </div>
      </div>

      <div className="card">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[16px] font-bold text-[#050505]">Recent Prescriptions</h2>
        </div>

        <table className="w-full">
          <thead className="bg-[#F5F5FA]">
            <tr>
              <th className="px-4 py-3 text-left text-[12px] font-semibold text-[#5E6366]">Patient</th>
              <th className="px-4 py-3 text-left text-[12px] font-semibold text-[#5E6366]">Doctor</th>
              <th className="px-4 py-3 text-left text-[12px] font-semibold text-[#5E6366]">Diagnosis</th>
              <th className="px-4 py-3 text-left text-[12px] font-semibold text-[#5E6366]">Date</th>
              <th className="px-4 py-3 text-left text-[12px] font-semibold text-[#5E6366]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#ABAFB1]">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <td key={j} className="px-4 py-3">
                      <div className="animate-pulse rounded bg-[#E5E7EB] h-4 w-full" />
                    </td>
                  ))}
                </tr>
              ))
            ) : recentPrescriptions.length > 0 ? (
              recentPrescriptions.map((prescription) => (
                <tr key={prescription.id} className="hover:bg-[#F5F5FA]">
                  <td className="px-4 py-3 text-[12px] font-semibold text-[#050505]">{prescription.patient?.name}</td>
                  <td className="px-4 py-3 text-[12px] text-[#5E6366]">{prescription.doctor?.name}</td>
                  <td className="px-4 py-3 text-[12px] text-[#5E6366]">{prescription.diagnosis}</td>
                  <td className="px-4 py-3 text-[12px] text-[#5E6366]">{new Date(prescription.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-[12px] text-[#5E6366]">
                    <Link
                      href={`/prescriptions/${prescription.id}`}
                      className="text-[#142A4E] hover:underline font-semibold"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-[#5E6366] py-8 text-[14px]">
                  {dbError ? 'Unable to load prescriptions — database unavailable' : 'No prescriptions yet'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
