'use client';

import { useState } from 'react';
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
  Pagination,
} from '@/app/components/ui';
import { CardHeader, CardTitle } from '@/app/components/ui/Card';
import { TableHead, TableBody, TableRow, TableTh, TableTd, TableEmpty } from '@/app/components/ui/Table';

interface SettingsInitialData {
  doctors: any[];
  doctorCount: number;
  doctorTotalPages: number;
  medicines: any[];
  medicineCount: number;
  medicineTotalPages: number;
  users: any[];
  userCount: number;
  userTotalPages: number;
  patients: any[];
  patientCount: number;
  patientTotalPages: number;
  diagnoses: any[];
  diagnosisCount: number;
  diagnosisTotalPages: number;
}

interface SettingsClientProps {
  initialData: SettingsInitialData;
}

export default function SettingsClient({ initialData }: SettingsClientProps) {
  const [activeTab, setActiveTab] = useState('patients');

  // Doctors state
  const [doctors, setDoctors] = useState(initialData.doctors);
  const [doctorCount, setDoctorCount] = useState(initialData.doctorCount);
  const [doctorPage, setDoctorPage] = useState(1);
  const [doctorTotalPages, setDoctorTotalPages] = useState(initialData.doctorTotalPages);
  const [doctorSearch, setDoctorSearch] = useState('');

  // Medicines state
  const [medicines, setMedicines] = useState(initialData.medicines);
  const [medicineCount, setMedicineCount] = useState(initialData.medicineCount);
  const [medicinePage, setMedicinePage] = useState(1);
  const [medicineTotalPages, setMedicineTotalPages] = useState(initialData.medicineTotalPages);
  const [medicineSearch, setMedicineSearch] = useState('');

  // Users state
  const [users, setUsers] = useState(initialData.users);
  const [userCount, setUserCount] = useState(initialData.userCount);
  const [userPage, setUserPage] = useState(1);
  const [userTotalPages, setUserTotalPages] = useState(initialData.userTotalPages);
  const [userSearch, setUserSearch] = useState('');

  // Patients state
  const [patients, setPatients] = useState(initialData.patients);
  const [patientCount, setPatientCount] = useState(initialData.patientCount);
  const [patientPage, setPatientPage] = useState(1);
  const [patientTotalPages, setPatientTotalPages] = useState(initialData.patientTotalPages);
  const [patientSearch, setPatientSearch] = useState('');

  // Diagnoses state
  const [diagnoses, setDiagnoses] = useState(initialData.diagnoses);
  const [diagnosisCount, setDiagnosisCount] = useState(initialData.diagnosisCount);
  const [diagnosisPage, setDiagnosisPage] = useState(1);
  const [diagnosisTotalPages, setDiagnosisTotalPages] = useState(initialData.diagnosisTotalPages);
  const [diagnosisSearch, setDiagnosisSearch] = useState('');

  // Form states
  const [showDoctorForm, setShowDoctorForm] = useState(false);
  const [showMedicineForm, setShowMedicineForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showDiagnosisForm, setShowDiagnosisForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  // Patient import states
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<any>(null);

  // Patients fetch
  async function fetchPatients(page = 1, search = '') {
    try {
      const params = new URLSearchParams({ page: page.toString(), limit: '10' });
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

  const handlePatientSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPatientSearch(value);
    setPatientPage(1);
    fetchPatients(1, value);
  };

  // Doctors fetch
  async function fetchDoctors(page = 1, search = '') {
    try {
      const params = new URLSearchParams({ page: page.toString(), limit: '10' });
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

  const handleDoctorSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDoctorSearch(value);
    setDoctorPage(1);
    fetchDoctors(1, value);
  };

  // Medicines fetch
  async function fetchMedicines(page = 1, search = '') {
    try {
      const params = new URLSearchParams({ page: page.toString(), limit: '20' });
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

  const handleMedicineSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMedicineSearch(value);
    setMedicinePage(1);
    fetchMedicines(1, value);
  };

  // Users fetch
  async function fetchUsers(page = 1, search = '') {
    try {
      const params = new URLSearchParams({ page: page.toString(), limit: '10' });
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

  const handleUserSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserSearch(value);
    setUserPage(1);
    fetchUsers(1, value);
  };

  // Diagnoses fetch
  async function fetchDiagnoses(page = 1, search = '') {
    try {
      const params = new URLSearchParams({ page: page.toString(), limit: '20' });
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

  const handleDiagnosisSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDiagnosisSearch(value);
    setDiagnosisPage(1);
    fetchDiagnoses(1, value);
  };

  // Patient import handler
  const handleFileUpload = async (file: File) => {
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
    } catch (error: any) {
      setImportResult({ error: 'Failed to upload file: ' + error.message });
    } finally {
      setImporting(false);
    }
  };

  // Doctor handlers
  const handleSaveDoctor = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
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
        (e.target as HTMLFormElement).reset();
      }
    } catch (error) {
      console.error('Error saving doctor:', error);
    }
  };

  const handleDeleteDoctor = async (id: string) => {
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
  const handleSaveMedicine = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      description: formData.get('description'),
      costUSD: parseFloat(formData.get('costUSD') as string) || 0,
      costKHR: parseFloat(formData.get('costKHR') as string) || 0,
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
        (e.target as HTMLFormElement).reset();
      }
    } catch (error) {
      console.error('Error saving medicine:', error);
    }
  };

  const handleDeleteMedicine = async (id: string) => {
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
  const handleSaveUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: any = {
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
        (e.target as HTMLFormElement).reset();
      }
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleDeleteUser = async (id: string) => {
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
  const handleSaveDiagnosis = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
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
        (e.target as HTMLFormElement).reset();
      }
    } catch (error) {
      console.error('Error saving diagnosis:', error);
    }
  };

  const handleDeleteDiagnosis = async (id: string) => {
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

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setShowDoctorForm(false);
    setShowMedicineForm(false);
    setShowUserForm(false);
    setShowDiagnosisForm(false);
    setEditingItem(null);
    setImportResult(null);
  };

  return (
    <div>
      <h1 className="text-[20px] font-bold text-[#050505] mb-6">Settings</h1>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={handleTabChange} />

      {/* Patients Tab */}
      {activeTab === 'patients' && (
        <Card>
          <CardHeader>
            <CardTitle>Import Patients from Excel</CardTitle>
          </CardHeader>

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
            <TableHead>
              <tr>
                <TableTh>NSSF ID</TableTh>
                <TableTh>Name (Latin)</TableTh>
                <TableTh>Khmer Name</TableTh>
                <TableTh>Gender</TableTh>
                <TableTh>Age</TableTh>
              </tr>
            </TableHead>
            <TableBody>
              {patients.length > 0 ? (
                patients.map((patient: any) => (
                  <TableRow key={patient.id}>
                    <TableTd bold>{patient.nssfId || '-'}</TableTd>
                    <TableTd>{patient.nameLatin || patient.name}</TableTd>
                    <TableTd>{patient.khmerName || '-'}</TableTd>
                    <TableTd>
                      <Badge variant={patient.gender === 'MALE' ? 'pending' : 'success'}>
                        {patient.gender}
                      </Badge>
                    </TableTd>
                    <TableTd>{patient.age}</TableTd>
                  </TableRow>
                ))
              ) : (
                <TableEmpty colSpan={5}>
                  No patients found. Upload an Excel file to import patients.
                </TableEmpty>
              )}
            </TableBody>
          </Table>

          <Pagination
            currentPage={patientPage}
            totalPages={patientTotalPages}
            onPageChange={(page: number) => fetchPatients(page, patientSearch)}
          />
        </Card>
      )}

      {/* Doctors Tab */}
      {activeTab === 'doctors' && (
        <Card>
          <CardHeader>
            <CardTitle>Manage Doctors ({doctorCount})</CardTitle>
            <Button onClick={() => { setShowDoctorForm(!showDoctorForm); setEditingItem(null); }}>
              {showDoctorForm ? 'Cancel' : '+ Add Doctor'}
            </Button>
          </CardHeader>

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
              {doctors.length > 0 ? (
                doctors.map((doctor: any) => (
                  <TableRow key={doctor.id}>
                    <TableTd bold>{doctor.name}</TableTd>
                    <TableTd>{doctor.specialty || '-'}</TableTd>
                    <TableTd>{doctor.phone || '-'}</TableTd>
                    <TableTd>
                      <Badge variant={doctor.isActive ? 'success' : 'danger'}>
                        {doctor.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableTd>
                    <TableTd>
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
                    </TableTd>
                  </TableRow>
                ))
              ) : (
                <TableEmpty colSpan={5}>No doctors found</TableEmpty>
              )}
            </TableBody>
          </Table>

          <Pagination
            currentPage={doctorPage}
            totalPages={doctorTotalPages}
            onPageChange={(page: number) => fetchDoctors(page, doctorSearch)}
          />
        </Card>
      )}

      {/* Medicines Tab */}
      {activeTab === 'medicines' && (
        <Card>
          <CardHeader>
            <CardTitle>Manage Medicines ({medicineCount})</CardTitle>
            <Button onClick={() => { setShowMedicineForm(!showMedicineForm); setEditingItem(null); }}>
              {showMedicineForm ? 'Cancel' : '+ Add Medicine'}
            </Button>
          </CardHeader>

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
            <TableHead>
              <tr>
                <TableTh>Name</TableTh>
                <TableTh>Description</TableTh>
                <TableTh>Price (USD)</TableTh>
                <TableTh>Price (KHR)</TableTh>
                <TableTh>Actions</TableTh>
              </tr>
            </TableHead>
            <TableBody>
              {medicines.length > 0 ? (
                medicines.map((medicine: any) => (
                  <TableRow key={medicine.id}>
                    <TableTd bold>{medicine.name}</TableTd>
                    <TableTd>{medicine.description || '-'}</TableTd>
                    <TableTd>${medicine.costUSD?.toFixed(2) || '0.00'}</TableTd>
                    <TableTd>{medicine.costKHR?.toLocaleString() || '0'} ៛</TableTd>
                    <TableTd>
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
                    </TableTd>
                  </TableRow>
                ))
              ) : (
                <TableEmpty colSpan={5}>No medicines found</TableEmpty>
              )}
            </TableBody>
          </Table>

          <Pagination
            currentPage={medicinePage}
            totalPages={medicineTotalPages}
            onPageChange={(page: number) => fetchMedicines(page, medicineSearch)}
          />
        </Card>
      )}

      {/* Diagnoses Tab */}
      {activeTab === 'diagnoses' && (
        <Card>
          <CardHeader>
            <CardTitle>Manage Diagnoses ({diagnosisCount})</CardTitle>
            <Button onClick={() => { setShowDiagnosisForm(!showDiagnosisForm); setEditingItem(null); }}>
              {showDiagnosisForm ? 'Cancel' : '+ Add Diagnosis'}
            </Button>
          </CardHeader>

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
            <TableHead>
              <tr>
                <TableTh>Name</TableTh>
                <TableTh>Actions</TableTh>
              </tr>
            </TableHead>
            <TableBody>
              {diagnoses.length > 0 ? (
                diagnoses.map((diagnosis: any) => (
                  <TableRow key={diagnosis.id}>
                    <TableTd bold>{diagnosis.name}</TableTd>
                    <TableTd>
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
                    </TableTd>
                  </TableRow>
                ))
              ) : (
                <TableEmpty colSpan={2}>No diagnoses found</TableEmpty>
              )}
            </TableBody>
          </Table>

          <Pagination
            currentPage={diagnosisPage}
            totalPages={diagnosisTotalPages}
            onPageChange={(page: number) => fetchDiagnoses(page, diagnosisSearch)}
          />
        </Card>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <Card>
          <CardHeader>
            <CardTitle>Manage Users ({userCount})</CardTitle>
            <Button onClick={() => { setShowUserForm(!showUserForm); setEditingItem(null); }}>
              {showUserForm ? 'Cancel' : '+ Add User'}
            </Button>
          </CardHeader>

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
            <TableHead>
              <tr>
                <TableTh>Name</TableTh>
                <TableTh>Email</TableTh>
                <TableTh>Role</TableTh>
                <TableTh>Actions</TableTh>
              </tr>
            </TableHead>
            <TableBody>
              {users.length > 0 ? (
                users.map((user: any) => (
                  <TableRow key={user.id}>
                    <TableTd bold>{user.name}</TableTd>
                    <TableTd>{user.email}</TableTd>
                    <TableTd>
                      <Badge variant={user.role === 'ADMIN' ? 'success' : 'pending'}>
                        {user.role}
                      </Badge>
                    </TableTd>
                    <TableTd>
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
                    </TableTd>
                  </TableRow>
                ))
              ) : (
                <TableEmpty colSpan={4}>No users found</TableEmpty>
              )}
            </TableBody>
          </Table>

          <Pagination
            currentPage={userPage}
            totalPages={userTotalPages}
            onPageChange={(page: number) => fetchUsers(page, userSearch)}
          />
        </Card>
      )}
    </div>
  );
}
