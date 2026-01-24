'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Users, FileText, UserCheck, Calendar, UserPlus, FilePlus } from 'react-feather';
import { Button, Card, Table, Loading } from '@/app/components/ui';

export default function Dashboard() {
  const [stats, setStats] = useState({
    patients: 0,
    prescriptions: 0,
    doctors: 0,
    todayPrescriptions: 0,
  });
  const [recentPrescriptions, setRecentPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [patientsRes, prescriptionsRes, doctorsRes] = await Promise.all([
          fetch('/api/patients'),
          fetch('/api/prescriptions'),
          fetch('/api/doctors'),
        ]);

        const patientsData = await patientsRes.json();
        const prescriptionsData = await prescriptionsRes.json();
        const doctorsData = await doctorsRes.json();

        // Handle paginated responses
        const patients = patientsData.patients || patientsData;
        const prescriptions = prescriptionsData.prescriptions || prescriptionsData;
        const doctors = doctorsData.doctors || doctorsData;

        const today = new Date().toDateString();
        const todayPrescriptions = Array.isArray(prescriptions)
          ? prescriptions.filter((p) => new Date(p.createdAt).toDateString() === today)
          : [];

        setStats({
          patients: patientsData.total || (Array.isArray(patients) ? patients.length : 0),
          prescriptions: prescriptionsData.total || (Array.isArray(prescriptions) ? prescriptions.length : 0),
          doctors: doctorsData.total || (Array.isArray(doctors) ? doctors.length : 0),
          todayPrescriptions: todayPrescriptions.length,
        });

        setRecentPrescriptions(Array.isArray(prescriptions) ? prescriptions.slice(0, 5) : []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <Loading text="Loading dashboard..." />;
  }

  const statCards = [
    {
      title: 'Total Patients',
      value: stats.patients,
      color: 'bg-[#142A4E]',
      href: '/patients',
      icon: Users,
    },
    {
      title: 'Total Prescriptions',
      value: stats.prescriptions,
      color: 'bg-[#32936F]',
      href: '/prescriptions',
      icon: FileText,
    },
    {
      title: 'Active Doctors',
      value: stats.doctors,
      color: 'bg-[#677FD2]',
      href: '/doctors',
      icon: UserCheck,
    },
    {
      title: "Today's Prescriptions",
      value: stats.todayPrescriptions,
      color: 'bg-[#F0A20B]',
      href: '/prescriptions',
      icon: Calendar,
    },
  ];

  return (
    <div>
      <h1 className="text-[20px] font-bold text-[#050505] mb-6">Dashboard</h1>

      {/* Stats Cards */}
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
                  <p className="text-[28px] font-bold mt-2">{stat.value.toLocaleString()}</p>
                </div>
                <Icon size={32} className="opacity-80" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="mb-6">
        <Card.Header>
          <Card.Title>Quick Actions</Card.Title>
        </Card.Header>
        <div className="flex flex-wrap gap-4">
          <Link href="/patients/new">
            <Button className="flex items-center gap-2">
              <UserPlus size={16} />
              New Patient
            </Button>
          </Link>
          <Link href="/prescriptions/new">
            <Button className="flex items-center gap-2">
              <FilePlus size={16} />
              New Prescription
            </Button>
          </Link>
        </div>
      </Card>

      {/* Recent Prescriptions */}
      <Card>
        <Card.Header>
          <Card.Title>Recent Prescriptions</Card.Title>
        </Card.Header>

        <Table>
          <Table.Head>
            <tr>
              <Table.Th>Patient</Table.Th>
              <Table.Th>Doctor</Table.Th>
              <Table.Th>Diagnosis</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Actions</Table.Th>
            </tr>
          </Table.Head>
          <Table.Body>
            {recentPrescriptions.length > 0 ? (
              recentPrescriptions.map((prescription) => (
                <Table.Row key={prescription.id}>
                  <Table.Td bold>{prescription.patient?.name}</Table.Td>
                  <Table.Td>{prescription.doctor?.name}</Table.Td>
                  <Table.Td>{prescription.diagnosis}</Table.Td>
                  <Table.Td>{new Date(prescription.createdAt).toLocaleDateString()}</Table.Td>
                  <Table.Td>
                    <Link
                      href={`/prescriptions/${prescription.id}`}
                      className="text-[#142A4E] hover:underline font-semibold"
                    >
                      View
                    </Link>
                  </Table.Td>
                </Table.Row>
              ))
            ) : (
              <Table.Empty colSpan={5}>No prescriptions yet</Table.Empty>
            )}
          </Table.Body>
        </Table>
      </Card>
    </div>
  );
}
