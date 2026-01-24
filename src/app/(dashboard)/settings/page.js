'use client';

import { useEffect, useState } from 'react';
import { Users, UserCheck, Package, User, Search, FileText } from 'react-feather';
import {
  Button,
  Input,
  Select,
  Badge,
  Card,
  Table,
  Tabs,
  FileUpload,
  Alert,
  Loading,
  Pagination,
} from '@/app/components/ui';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('patients');

  // Doctors state
  const [doctors, setDoctors] = useState([]);
  const [doctorCount, setDoctorCount] = useState(0);
  const [doctorPage, setDoctorPage] = useState(1);
  const [doctorTotalPages, setDoctorTotalPages] = useState(1);
  const [doctorSearch, setDoctorSearch] = useState('');

  // Medicines state
  const [medicines, setMedicines] = useState([]);
  const [medicineCount, setMedicineCount] = useState(0);
  const [medicinePage, setMedicinePage] = useState(1);
  const [medicineTotalPages, setMedicineTotalPages] = useState(1);
  const [medicineSearch, setMedicineSearch] = useState('');

  // Users state
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [userPage, setUserPage] = useState(1);
  const [userTotalPages, setUserTotalPages] = useState(1);
  const [userSearch, setUserSearch] = useState('');

  // Patients state
  const [patients, setPatients] = useState([]);
  const [patientCount, setPatientCount] = useState(0);
  const [patientPage, setPatientPage] = useState(1);
  const [patientTotalPages, setPatientTotalPages] = useState(1);
  const [patientSearch, setPatientSearch] = useState('');

  // Diagnoses state
  const [diagnoses, setDiagnoses] = useState([]);
  const [diagnosisCount, setDiagnosisCount] = useState(0);
  const [diagnosisPage, setDiagnosisPage] = useState(1);
  const [diagnosisTotalPages, setDiagnosisTotalPages] = useState(1);
  const [diagnosisSearch, setDiagnosisSearch] = useState('');

  const [loading, setLoading] = useState(true);

  // Form states
  const [showDoctorForm, setShowDoctorForm] = useState(false);
  const [showMedicineForm, setShowMedicineForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showDiagnosisForm, setShowDiagnosisForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Patient import states
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  async function fetchAllData() {
    setLoading(true);
    try {
      const [doctorsRes, medicinesRes, usersRes, patientsRes, diagnosesRes] = await Promise.all([
        fetch('/api/doctors?page=1&limit=10'),
        fetch('/api/medicines?page=1&limit=20'),
        fetch('/api/users?page=1&limit=10'),
        fetch('/api/patients?page=1&limit=10'),
        fetch('/api/diagnoses?page=1&limit=20'),
      ]);

      const doctorsData = await doctorsRes.json();
      setDoctors(doctorsData.doctors || []);
      setDoctorCount(doctorsData.total || 0);
      setDoctorTotalPages(doctorsData.totalPages || 1);

      const medicinesData = await medicinesRes.json();
      setMedicines(medicinesData.medicines || []);
      setMedicineCount(medicinesData.total || 0);
      setMedicineTotalPages(medicinesData.totalPages || 1);

      const usersData = await usersRes.json();
      setUsers(usersData.users || []);
      setUserCount(usersData.total || 0);
      setUserTotalPages(usersData.totalPages || 1);

      const patientsData = await patientsRes.json();
      setPatients(patientsData.patients || []);
      setPatientCount(patientsData.pagination?.total || 0);
      setPatientTotalPages(patientsData.pagination?.totalPages || 1);

      const diagnosesData = await diagnosesRes.json();
      setDiagnoses(diagnosesData.diagnoses || []);
      setDiagnosisCount(diagnosesData.total || 0);
      setDiagnosisTotalPages(diagnosesData.totalPages || 1);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  // Patients fetch
  async function fetchPatients(page = 1, search = '') {
    try {
      const params = new URLSearchParams({ page, limit: 10 });
      if (search) params.append('search', search);
      const res = await fetch(`/api/patients?${params}`);
      const data = await res.json();
      setPatients(data.patients || []);
      setPatientCount(data.pagination?.total || 0);
      setPatientTotalPages(data.pagination?.totalPages || 1);
      setPatientPage(page);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  }

  const handlePatientSearch = (e) => {
    const value = e.target.value;
    setPatientSearch(value);
    setPatientPage(1);
    fetchPatients(1, value);
  };

  // Doctors fetch
  async function fetchDoctors(page = 1, search = '') {
    try {
      const params = new URLSearchParams({ page, limit: 10 });
      if (search) params.append('search', search);
      const res = await fetch(`/api/doctors?${params}`);
      const data = await res.json();
      setDoctors(data.doctors || []);
      setDoctorCount(data.total || 0);
      setDoctorTotalPages(data.totalPages || 1);
      setDoctorPage(page);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  }

  const handleDoctorSearch = (e) => {
    const value = e.target.value;
    setDoctorSearch(value);
    setDoctorPage(1);
    fetchDoctors(1, value);
  };

  // Medicines fetch
  async function fetchMedicines(page = 1, search = '') {
    try {
      const params = new URLSearchParams({ page, limit: 20 });
      if (search) params.append('search', search);
      const res = await fetch(`/api/medicines?${params}`);
      const data = await res.json();
      setMedicines(data.medicines || []);
      setMedicineCount(data.total || 0);
      setMedicineTotalPages(data.totalPages || 1);
      setMedicinePage(page);
    } catch (error) {
      console.error('Error fetching medicines:', error);
    }
  }

  const handleMedicineSearch = (e) => {
    const value = e.target.value;
    setMedicineSearch(value);
    setMedicinePage(1);
    fetchMedicines(1, value);
  };

  // Users fetch
  async function fetchUsers(page = 1, search = '') {
    try {
      const params = new URLSearchParams({ page, limit: 10 });
      if (search) params.append('search', search);
      const res = await fetch(`/api/users?${params}`);
      const data = await res.json();
      setUsers(data.users || []);
      setUserCount(data.total || 0);
      setUserTotalPages(data.totalPages || 1);
      setUserPage(page);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  const handleUserSearch = (e) => {
    const value = e.target.value;
    setUserSearch(value);
    setUserPage(1);
    fetchUsers(1, value);
  };

  // Diagnoses fetch
  async function fetchDiagnoses(page = 1, search = '') {
    try {
      const params = new URLSearchParams({ page, limit: 20 });
      if (search) params.append('search', search);
      const res = await fetch(`/api/diagnoses?${params}`);
      const data = await res.json();
      setDiagnoses(data.diagnoses || []);
      setDiagnosisCount(data.total || 0);
      setDiagnosisTotalPages(data.totalPages || 1);
      setDiagnosisPage(page);
    } catch (error) {
      console.error('Error fetching diagnoses:', error);
    }
  }

  const handleDiagnosisSearch = (e) => {
    const value = e.target.value;
    setDiagnosisSearch(value);
    setDiagnosisPage(1);
    fetchDiagnoses(1, value);
  };

  // Patient import handler
  const handleFileUpload = async (file) => {
    setImporting(true);
    setImportResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/patients/import', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      setImportResult(result);

      if (result.success) {
        fetchPatients(patientPage, patientSearch);
      }
    } catch (error) {
      setImportResult({ error: 'Failed to upload file: ' + error.message });
    } finally {
      setImporting(false);
    }
  };

  // Doctor handlers
  const handleSaveDoctor = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      specialty: formData.get('specialty'),
      phone: formData.get('phone'),
      isActive: formData.get('isActive') === 'true',
    };

    try {
      const url = editingItem ? `/api/doctors/${editingItem.id}` : '/api/doctors';
      const method = editingItem ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        fetchDoctors(doctorPage, doctorSearch);
        setShowDoctorForm(false);
        setEditingItem(null);
        e.target.reset();
      }
    } catch (error) {
      console.error('Error saving doctor:', error);
    }
  };

  const handleDeleteDoctor = async (id) => {
    if (!confirm('Are you sure you want to delete this doctor?')) return;
    try {
      const res = await fetch(`/api/doctors/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchDoctors(doctorPage, doctorSearch);
      }
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  // Medicine handlers
  const handleSaveMedicine = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      description: formData.get('description'),
      costUSD: parseFloat(formData.get('costUSD')) || 0,
      costKHR: parseFloat(formData.get('costKHR')) || 0,
    };

    try {
      const url = editingItem ? `/api/medicines/${editingItem.id}` : '/api/medicines';
      const method = editingItem ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        fetchMedicines(medicinePage, medicineSearch);
        setShowMedicineForm(false);
        setEditingItem(null);
        e.target.reset();
      }
    } catch (error) {
      console.error('Error saving medicine:', error);
    }
  };

  const handleDeleteMedicine = async (id) => {
    if (!confirm('Are you sure you want to delete this medicine?')) return;
    try {
      const res = await fetch(`/api/medicines/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchMedicines(medicinePage, medicineSearch);
      }
    } catch (error) {
      console.error('Error deleting medicine:', error);
    }
  };

  // User handlers
  const handleSaveUser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      role: formData.get('role'),
    };
    if (!editingItem) {
      data.password = formData.get('password');
    }

    try {
      const url = editingItem ? `/api/users/${editingItem.id}` : '/api/register';
      const method = editingItem ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        fetchUsers(userPage, userSearch);
        setShowUserForm(false);
        setEditingItem(null);
        e.target.reset();
      }
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      const res = await fetch(`/api/users/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchUsers(userPage, userSearch);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Diagnosis handlers
  const handleSaveDiagnosis = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
    };

    try {
      const url = editingItem ? `/api/diagnoses/${editingItem.id}` : '/api/diagnoses';
      const method = editingItem ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        fetchDiagnoses(diagnosisPage, diagnosisSearch);
        setShowDiagnosisForm(false);
        setEditingItem(null);
        e.target.reset();
      }
    } catch (error) {
      console.error('Error saving diagnosis:', error);
    }
  };

  const handleDeleteDiagnosis = async (id) => {
    if (!confirm('Are you sure you want to delete this diagnosis?')) return;
    try {
      const res = await fetch(`/api/diagnoses/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchDiagnoses(diagnosisPage, diagnosisSearch);
      }
    } catch (error) {
      console.error('Error deleting diagnosis:', error);
    }
  };

  const tabs = [
    { id: 'patients', label: 'Patients', icon: Users, count: patientCount },
    { id: 'doctors', label: 'Doctors', icon: UserCheck, count: doctorCount },
    { id: 'medicines', label: 'Medicines', icon: Package, count: medicineCount },
    { id: 'diagnoses', label: 'Diagnoses', icon: FileText, count: diagnosisCount },
    { id: 'users', label: 'Users', icon: User, count: userCount },
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setShowDoctorForm(false);
    setShowMedicineForm(false);
    setShowUserForm(false);
    setShowDiagnosisForm(false);
    setEditingItem(null);
    setImportResult(null);
  };

  if (loading) {
    return <Loading text="Loading settings..." />;
  }

  return (
    <div>
      <h1 className="text-[20px] font-bold text-[#050505] mb-6">Settings</h1>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={handleTabChange} />

      {/* Patients Tab */}
      {activeTab === 'patients' && (
        <Card>
          <Card.Header>
            <Card.Title>Import Patients from Excel</Card.Title>
          </Card.Header>

          <FileUpload
            accept=".xlsx,.xls"
            onUpload={handleFileUpload}
            loading={importing}
            title="Upload an Excel file (.xlsx, .xls) with patient data"
            description="Required columns: NSSF ID, NAME LATIN, KHMER NAME, SEX, AGE"
            buttonText="Select Excel File"
            loadingText="Importing..."
            className="mb-6"
          />

          {importResult && (
            <Alert
              variant={importResult.success ? 'success' : 'error'}
              title={importResult.success ? 'Import Successful' : 'Import Failed'}
              className="mb-6"
            >
              {importResult.success ? (
                <>
                  <p>{importResult.message}</p>
                  <div className="flex gap-4 mt-2">
                    <span>Imported: <strong>{importResult.imported}</strong></span>
                    <span>Skipped: <strong>{importResult.skipped}</strong></span>
                    <span>Total: <strong>{importResult.total}</strong></span>
                  </div>
                </>
              ) : (
                <p>{importResult.error}</p>
              )}
            </Alert>
          )}

          <h3 className="text-[14px] font-semibold text-[#050505] mb-4">
            Patients ({patientCount} total)
          </h3>

          {/* Search Box */}
          <div className="mb-4">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ABAFB1]" />
              <input
                type="text"
                value={patientSearch}
                onChange={handlePatientSearch}
                placeholder="Search patients..."
                className="form-input pl-10"
              />
            </div>
          </div>

          <Table>
            <Table.Head>
              <tr>
                <Table.Th>NSSF ID</Table.Th>
                <Table.Th>Name (Latin)</Table.Th>
                <Table.Th>Khmer Name</Table.Th>
                <Table.Th>Gender</Table.Th>
                <Table.Th>Age</Table.Th>
              </tr>
            </Table.Head>
            <Table.Body>
              {patients.length > 0 ? (
                patients.map((patient) => (
                  <Table.Row key={patient.id}>
                    <Table.Td bold>{patient.nssfId || '-'}</Table.Td>
                    <Table.Td>{patient.nameLatin || patient.name}</Table.Td>
                    <Table.Td>{patient.khmerName || '-'}</Table.Td>
                    <Table.Td>
                      <Badge variant={patient.gender === 'MALE' ? 'pending' : 'success'}>
                        {patient.gender}
                      </Badge>
                    </Table.Td>
                    <Table.Td>{patient.age}</Table.Td>
                  </Table.Row>
                ))
              ) : (
                <Table.Empty colSpan={5}>
                  No patients found. Upload an Excel file to import patients.
                </Table.Empty>
              )}
            </Table.Body>
          </Table>

          <Pagination
            currentPage={patientPage}
            totalPages={patientTotalPages}
            onPageChange={(page) => fetchPatients(page, patientSearch)}
          />
        </Card>
      )}

      {/* Doctors Tab */}
      {activeTab === 'doctors' && (
        <Card>
          <Card.Header>
            <Card.Title>Manage Doctors ({doctorCount})</Card.Title>
            <Button onClick={() => { setShowDoctorForm(!showDoctorForm); setEditingItem(null); }}>
              {showDoctorForm ? 'Cancel' : '+ Add Doctor'}
            </Button>
          </Card.Header>

          {/* Search Box */}
          <div className="mb-4">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ABAFB1]" />
              <input
                type="text"
                value={doctorSearch}
                onChange={handleDoctorSearch}
                placeholder="Search doctors..."
                className="form-input pl-10"
              />
            </div>
          </div>

          {showDoctorForm && (
            <form onSubmit={handleSaveDoctor} className="mb-6 p-4 bg-[#F5F5FA] rounded">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Name" name="name" defaultValue={editingItem?.name} required />
                <Input label="Specialty" name="specialty" defaultValue={editingItem?.specialty} />
                <Input label="Phone" name="phone" defaultValue={editingItem?.phone} />
                <Select
                  label="Status"
                  name="isActive"
                  defaultValue={editingItem?.isActive ?? true}
                  options={[
                    { value: 'true', label: 'Active' },
                    { value: 'false', label: 'Inactive' },
                  ]}
                />
              </div>
              <Button type="submit" className="mt-4">
                {editingItem ? 'Update Doctor' : 'Save Doctor'}
              </Button>
            </form>
          )}

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
                      <Badge variant={doctor.isActive ? 'success' : 'danger'}>
                        {doctor.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <button
                        onClick={() => { setEditingItem(doctor); setShowDoctorForm(true); }}
                        className="text-[#142A4E] hover:underline font-semibold mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteDoctor(doctor.id)}
                        className="text-[#F4645B] hover:underline font-semibold"
                      >
                        Delete
                      </button>
                    </Table.Td>
                  </Table.Row>
                ))
              ) : (
                <Table.Empty colSpan={5}>No doctors found</Table.Empty>
              )}
            </Table.Body>
          </Table>

          <Pagination
            currentPage={doctorPage}
            totalPages={doctorTotalPages}
            onPageChange={(page) => fetchDoctors(page, doctorSearch)}
          />
        </Card>
      )}

      {/* Medicines Tab */}
      {activeTab === 'medicines' && (
        <Card>
          <Card.Header>
            <Card.Title>Manage Medicines ({medicineCount})</Card.Title>
            <Button onClick={() => { setShowMedicineForm(!showMedicineForm); setEditingItem(null); }}>
              {showMedicineForm ? 'Cancel' : '+ Add Medicine'}
            </Button>
          </Card.Header>

          {/* Search Box */}
          <div className="mb-4">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ABAFB1]" />
              <input
                type="text"
                value={medicineSearch}
                onChange={handleMedicineSearch}
                placeholder="Search medicines..."
                className="form-input pl-10"
              />
            </div>
          </div>

          {showMedicineForm && (
            <form onSubmit={handleSaveMedicine} className="mb-6 p-4 bg-[#F5F5FA] rounded">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Name" name="name" defaultValue={editingItem?.name} required />
                <Input label="Description" name="description" defaultValue={editingItem?.description} />
                <Input
                  label="Price (USD)"
                  name="costUSD"
                  type="number"
                  step="0.01"
                  min="0"
                  defaultValue={editingItem?.costUSD || ''}
                />
                <Input
                  label="Price (KHR)"
                  name="costKHR"
                  type="number"
                  step="1"
                  min="0"
                  defaultValue={editingItem?.costKHR || ''}
                />
              </div>
              <Button type="submit" className="mt-4">
                {editingItem ? 'Update Medicine' : 'Save Medicine'}
              </Button>
            </form>
          )}

          <Table>
            <Table.Head>
              <tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Description</Table.Th>
                <Table.Th>Price (USD)</Table.Th>
                <Table.Th>Price (KHR)</Table.Th>
                <Table.Th>Actions</Table.Th>
              </tr>
            </Table.Head>
            <Table.Body>
              {medicines.length > 0 ? (
                medicines.map((medicine) => (
                  <Table.Row key={medicine.id}>
                    <Table.Td bold>{medicine.name}</Table.Td>
                    <Table.Td>{medicine.description || '-'}</Table.Td>
                    <Table.Td>${medicine.costUSD?.toFixed(2) || '0.00'}</Table.Td>
                    <Table.Td>{medicine.costKHR?.toLocaleString() || '0'} ៛</Table.Td>
                    <Table.Td>
                      <button
                        onClick={() => { setEditingItem(medicine); setShowMedicineForm(true); }}
                        className="text-[#142A4E] hover:underline font-semibold mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteMedicine(medicine.id)}
                        className="text-[#F4645B] hover:underline font-semibold"
                      >
                        Delete
                      </button>
                    </Table.Td>
                  </Table.Row>
                ))
              ) : (
                <Table.Empty colSpan={5}>No medicines found</Table.Empty>
              )}
            </Table.Body>
          </Table>

          <Pagination
            currentPage={medicinePage}
            totalPages={medicineTotalPages}
            onPageChange={(page) => fetchMedicines(page, medicineSearch)}
          />
        </Card>
      )}

      {/* Diagnoses Tab */}
      {activeTab === 'diagnoses' && (
        <Card>
          <Card.Header>
            <Card.Title>Manage Diagnoses ({diagnosisCount})</Card.Title>
            <Button onClick={() => { setShowDiagnosisForm(!showDiagnosisForm); setEditingItem(null); }}>
              {showDiagnosisForm ? 'Cancel' : '+ Add Diagnosis'}
            </Button>
          </Card.Header>

          {/* Search Box */}
          <div className="mb-4">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ABAFB1]" />
              <input
                type="text"
                value={diagnosisSearch}
                onChange={handleDiagnosisSearch}
                placeholder="Search diagnoses..."
                className="form-input pl-10"
              />
            </div>
          </div>

          {showDiagnosisForm && (
            <form onSubmit={handleSaveDiagnosis} className="mb-6 p-4 bg-[#F5F5FA] rounded">
              <div className="grid grid-cols-1 gap-4">
                <Input label="Diagnosis Name" name="name" defaultValue={editingItem?.name} required />
              </div>
              <Button type="submit" className="mt-4">
                {editingItem ? 'Update Diagnosis' : 'Save Diagnosis'}
              </Button>
            </form>
          )}

          <Table>
            <Table.Head>
              <tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Actions</Table.Th>
              </tr>
            </Table.Head>
            <Table.Body>
              {diagnoses.length > 0 ? (
                diagnoses.map((diagnosis) => (
                  <Table.Row key={diagnosis.id}>
                    <Table.Td bold>{diagnosis.name}</Table.Td>
                    <Table.Td>
                      <button
                        onClick={() => { setEditingItem(diagnosis); setShowDiagnosisForm(true); }}
                        className="text-[#142A4E] hover:underline font-semibold mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteDiagnosis(diagnosis.id)}
                        className="text-[#F4645B] hover:underline font-semibold"
                      >
                        Delete
                      </button>
                    </Table.Td>
                  </Table.Row>
                ))
              ) : (
                <Table.Empty colSpan={2}>No diagnoses found</Table.Empty>
              )}
            </Table.Body>
          </Table>

          <Pagination
            currentPage={diagnosisPage}
            totalPages={diagnosisTotalPages}
            onPageChange={(page) => fetchDiagnoses(page, diagnosisSearch)}
          />
        </Card>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <Card>
          <Card.Header>
            <Card.Title>Manage Users ({userCount})</Card.Title>
            <Button onClick={() => { setShowUserForm(!showUserForm); setEditingItem(null); }}>
              {showUserForm ? 'Cancel' : '+ Add User'}
            </Button>
          </Card.Header>

          {/* Search Box */}
          <div className="mb-4">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ABAFB1]" />
              <input
                type="text"
                value={userSearch}
                onChange={handleUserSearch}
                placeholder="Search users..."
                className="form-input pl-10"
              />
            </div>
          </div>

          {showUserForm && (
            <form onSubmit={handleSaveUser} className="mb-6 p-4 bg-[#F5F5FA] rounded">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Name" name="name" defaultValue={editingItem?.name} required />
                <Input label="Email" name="email" type="email" defaultValue={editingItem?.email} required />
                {!editingItem && (
                  <Input label="Password" name="password" type="password" required />
                )}
                <Select
                  label="Role"
                  name="role"
                  defaultValue={editingItem?.role || 'STAFF'}
                  options={[
                    { value: 'STAFF', label: 'Staff' },
                    { value: 'ADMIN', label: 'Admin' },
                  ]}
                />
              </div>
              <Button type="submit" className="mt-4">
                {editingItem ? 'Update User' : 'Save User'}
              </Button>
            </form>
          )}

          <Table>
            <Table.Head>
              <tr>
                <Table.Th>Name</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Role</Table.Th>
                <Table.Th>Actions</Table.Th>
              </tr>
            </Table.Head>
            <Table.Body>
              {users.length > 0 ? (
                users.map((user) => (
                  <Table.Row key={user.id}>
                    <Table.Td bold>{user.name}</Table.Td>
                    <Table.Td>{user.email}</Table.Td>
                    <Table.Td>
                      <Badge variant={user.role === 'ADMIN' ? 'success' : 'pending'}>
                        {user.role}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <button
                        onClick={() => { setEditingItem(user); setShowUserForm(true); }}
                        className="text-[#142A4E] hover:underline font-semibold mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-[#F4645B] hover:underline font-semibold"
                      >
                        Delete
                      </button>
                    </Table.Td>
                  </Table.Row>
                ))
              ) : (
                <Table.Empty colSpan={4}>No users found</Table.Empty>
              )}
            </Table.Body>
          </Table>

          <Pagination
            currentPage={userPage}
            totalPages={userTotalPages}
            onPageChange={(page) => fetchUsers(page, userSearch)}
          />
        </Card>
      )}
    </div>
  );
}
