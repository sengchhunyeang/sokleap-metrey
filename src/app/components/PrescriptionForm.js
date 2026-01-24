'use client';

import { useState, useEffect, useRef } from 'react';

export default function PrescriptionForm({ onSave, initialData = {} }) {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(initialData.patientId || '');
  const [selectedDoctor, setSelectedDoctor] = useState(initialData.doctorId || '');
  const [diagnosis, setDiagnosis] = useState(initialData.diagnosis || '');
  const [appointmentDate, setAppointmentDate] = useState(initialData.appointmentDate || '');
  const [prescriptionMedicines, setPrescriptionMedicines] = useState(
    initialData.medicines || []
  );
  const [showMedicineForm, setShowMedicineForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Patient search state
  const [patientSearch, setPatientSearch] = useState('');
  const [patientResults, setPatientResults] = useState([]);
  const [showPatientDropdown, setShowPatientDropdown] = useState(false);
  const [searchingPatient, setSearchingPatient] = useState(false);
  const patientSearchRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (patientSearchRef.current && !patientSearchRef.current.contains(event.target)) {
        setShowPatientDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search patients when input changes
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (patientSearch.length < 2) {
      setPatientResults([]);
      setShowPatientDropdown(false);
      return;
    }

    searchTimeoutRef.current = setTimeout(async () => {
      setSearchingPatient(true);
      try {
        const res = await fetch(`/api/patients/search?q=${encodeURIComponent(patientSearch)}&limit=10`);
        const data = await res.json();
        setPatientResults(data);
        setShowPatientDropdown(true);
      } catch (error) {
        console.error('Error searching patients:', error);
      } finally {
        setSearchingPatient(false);
      }
    }, 300);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [patientSearch]);

  async function fetchData() {
    try {
      // Don't load all patients - use search instead
      const [doctorsRes, medicinesRes] = await Promise.all([
        fetch('/api/doctors?active=true'),
        fetch('/api/medicines'),
      ]);
      setDoctors(await doctorsRes.json());
      setMedicines(await medicinesRes.json());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient.id);
    setPatientSearch(patient.nssfId || patient.nameLatin || patient.name);
    setShowPatientDropdown(false);
    // Add to patients list if not already there
    if (!patients.find(p => p.id === patient.id)) {
      setPatients(prev => [...prev, patient]);
    }
  };

  const clearPatientSelection = () => {
    setSelectedPatient('');
    setPatientSearch('');
    setPatientResults([]);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAddMedicine = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const medicineId = formData.get('medicineId');
    const medicine = medicines.find((m) => m.id === medicineId);

    const newMedicine = {
      medicineId,
      medicineName: medicine?.name || formData.get('medicineName'),
      morning: formData.get('morning'),
      afternoon: formData.get('afternoon'),
      evening: formData.get('evening'),
      night: formData.get('night'),
      quantity: formData.get('quantity'),
      instructions: formData.get('instructions'),
    };

    setPrescriptionMedicines([...prescriptionMedicines, newMedicine]);
    e.target.reset();
  };

  const removeMedicine = (index) => {
    setPrescriptionMedicines(prescriptionMedicines.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    if (!selectedPatient || !selectedDoctor || !diagnosis) {
      alert('Please fill in patient, doctor, and diagnosis');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/prescriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientId: selectedPatient,
          doctorId: selectedDoctor,
          diagnosis,
          appointmentDate: appointmentDate || null,
          medicines: prescriptionMedicines.filter((m) => m.medicineId),
        }),
      });

      if (res.ok) {
        const prescription = await res.json();
        if (onSave) onSave(prescription);
        alert('Prescription saved successfully!');
      } else {
        alert('Failed to save prescription');
      }
    } catch (error) {
      console.error('Error saving prescription:', error);
      alert('Error saving prescription');
    } finally {
      setLoading(false);
    }
  };

  const selectedPatientData = patients.find((p) => p.id === selectedPatient);
  const selectedDoctorData = doctors.find((d) => d.id === selectedDoctor);

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="text-right mb-4 print:hidden space-x-2">
        <button
          onClick={handleSave}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Prescription'}
        </button>
        <button
          onClick={handlePrint}
          className="bg-[#142A4E] hover:bg-[#142A4E]/80 text-white px-4 py-2 rounded"
        >
          Print / បោះពុម្ព
        </button>
      </div>

      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <header className="flex items-center justify-between">
          <img src="/logo/left.png" alt="Left Logo" className="h-16" />
          <div className="text-center font-bold text-xl">
            មន្ទីរពហុព្យាបាល សុខ លាភ មេត្រី
            <br />
            SOK LEAP METREY POLYCLINIC
          </div>
          <img src="/logo/right.png" alt="Right Logo" className="h-16" />
        </header>

        <h1 className="text-2xl font-bold my-6 text-center">
          វេជ្ជបញ្ជា / Prescription Form
        </h1>

        {/* Patient Info */}
        <div className="mb-6 print:hidden">
          <h2 className="text-xl font-semibold mb-4">Patient Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Patient Search Autocomplete */}
            <div className="relative" ref={patientSearchRef}>
              <div className="flex">
                <input
                  type="text"
                  value={patientSearch}
                  onChange={(e) => {
                    setPatientSearch(e.target.value);
                    if (selectedPatient) {
                      setSelectedPatient('');
                    }
                  }}
                  onFocus={() => {
                    if (patientResults.length > 0) {
                      setShowPatientDropdown(true);
                    }
                  }}
                  placeholder="Search NSSF ID or Name..."
                  className={`p-2 border rounded flex-1 ${selectedPatient ? 'border-[#142A4E] bg-[#142A4E]/5' : ''}`}
                />
                {selectedPatient && (
                  <button
                    type="button"
                    onClick={clearPatientSelection}
                    className="ml-1 px-2 text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                )}
              </div>
              {searchingPatient && (
                <div className="absolute right-2 top-2 text-gray-400 text-sm">
                  Searching...
                </div>
              )}
              {showPatientDropdown && patientResults.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {patientResults.map((patient) => (
                    <div
                      key={patient.id}
                      onClick={() => handleSelectPatient(patient)}
                      className="p-3 hover:bg-blue-50 cursor-pointer border-b last:border-b-0"
                    >
                      <div className="font-medium text-blue-600">
                        {patient.nssfId || 'No NSSF ID'}
                      </div>
                      <div className="text-sm">
                        {patient.khmerName && <span className="mr-2">{patient.khmerName}</span>}
                        {patient.nameLatin && <span className="text-gray-600">({patient.nameLatin})</span>}
                      </div>
                      <div className="text-xs text-gray-500">
                        {patient.gender} | {patient.age} years
                        {patient.enterprise && ` | ${patient.enterprise.substring(0, 30)}...`}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {showPatientDropdown && patientResults.length === 0 && patientSearch.length >= 2 && !searchingPatient && (
                <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg p-3 text-gray-500 text-center">
                  No patients found
                </div>
              )}
            </div>

            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="p-2 border rounded"
              required
            >
              <option value="">Select Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              className="p-2 border rounded"
              placeholder="Appointment Date"
            />
          </div>

          <div className="mt-5 mb-4">
            <label className="text-lg font-bold">រោគវិនិច្ឆ័យ / Diagnosis:</label>
            <input
              type="text"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="Enter diagnosis..."
              list="diagnosis-list"
              className="ml-2 p-2 border rounded w-72"
              required
            />
            <datalist id="diagnosis-list">
              <option value="ឈឺធ្មេញ" />
              <option value="អាស៊ីដលើស" />
              <option value="ផ្តាសាយ" />
              <option value="ឈឺក្បាល" />
              <option value="ឈឺពោះ" />
            </datalist>
          </div>

          <button
            onClick={() => setShowMedicineForm(!showMedicineForm)}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {showMedicineForm ? 'Hide Medicine Form' : 'Add Medicine'}
          </button>
        </div>

        {/* Print header */}
        <div className="hidden print:block mb-6">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p>
                <strong>លេខ NSSF / NSSF ID:</strong>{' '}
                {selectedPatientData?.nssfId || '-'}
              </p>
              <p>
                <strong>ឈ្មោះអ្នកជំងឺ / Patient:</strong>{' '}
                {selectedPatientData?.khmerName || selectedPatientData?.name}
                {selectedPatientData?.nameLatin && ` (${selectedPatientData.nameLatin})`}
              </p>
              <p>
                <strong>ភេទ / Gender:</strong> {selectedPatientData?.gender}
              </p>
              <p>
                <strong>អាយុ / Age:</strong> {selectedPatientData?.age} ឆ្នាំ
              </p>
            </div>
            <div className="text-right">
              <p>
                <strong>កាលបរិច្ឆេទ / Date:</strong>{' '}
                {new Date().toLocaleDateString()}
              </p>
              <p>
                <strong>គ្រូពេទ្យ / Doctor:</strong> {selectedDoctorData?.name}
              </p>
            </div>
          </div>
          <p className="mt-4">
            <strong>រោគវិនិច្ឆ័យ / Diagnosis:</strong> {diagnosis}
          </p>
        </div>

        {/* Medicine Form */}
        {showMedicineForm && (
          <form onSubmit={handleAddMedicine} className="mb-6 print:hidden">
            <h2 className="text-xl font-semibold mb-4">Medicine Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select name="medicineId" className="p-2 border rounded">
                <option value="">Select Medicine</option>
                {medicines.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
              <input
                name="morning"
                placeholder="Morning / ព្រឹក"
                className="p-2 border rounded"
              />
              <input
                name="afternoon"
                placeholder="Afternoon / ថ្ងៃ"
                className="p-2 border rounded"
              />
              <input
                name="evening"
                placeholder="Evening / ល្ងាច"
                className="p-2 border rounded"
              />
              <input
                name="night"
                placeholder="Night / យប់"
                className="p-2 border rounded"
              />
              <input
                name="quantity"
                placeholder="Quantity / ចំនួន"
                className="p-2 border rounded"
                required
              />
              <input
                name="instructions"
                placeholder="Instructions / ណែនាំ"
                className="p-2 border rounded col-span-full"
              />
            </div>

            <button
              type="submit"
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Add Medicine
            </button>
          </form>
        )}

        {/* Prescription Table */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Medicines / ថ្នាំ</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  {[
                    'ល.រ',
                    'ឈ្មោះថ្នាំ',
                    'ព្រឹក',
                    'ថ្ងៃ',
                    'ល្ងាច',
                    'យប់',
                    'ចំនួន',
                    'ណែនាំ',
                    'សកម្មភាព',
                  ].map((col) => (
                    <th
                      key={col}
                      className={`border px-2 py-1 ${
                        col === 'សកម្មភាព' ? 'print:hidden' : ''
                      }`}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {prescriptionMedicines.map((item, index) => (
                  <tr key={index}>
                    <td className="border px-2 py-1">{index + 1}</td>
                    <td className="border px-2 py-1">{item.medicineName}</td>
                    <td className="border px-2 py-1">{item.morning || '-'}</td>
                    <td className="border px-2 py-1">{item.afternoon || '-'}</td>
                    <td className="border px-2 py-1">{item.evening || '-'}</td>
                    <td className="border px-2 py-1">{item.night || '-'}</td>
                    <td className="border px-2 py-1">{item.quantity}</td>
                    <td className="border px-2 py-1">
                      {item.instructions || '-'}
                    </td>
                    <td className="border px-2 py-1 print:hidden">
                      <button
                        onClick={() => removeMedicine(index)}
                        className="text-red-600 hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
                {prescriptionMedicines.length === 0 && (
                  <tr>
                    <td colSpan="9" className="border px-2 py-4 text-center text-gray-500">
                      No medicines added
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div>
            {appointmentDate && (
              <p>
                <strong>ថ្ងៃណាត់ / Appointment:</strong>{' '}
                {new Date(appointmentDate).toLocaleDateString()}
              </p>
            )}
            <p className="mt-2">សូមយកវេជ្ជបញ្ជាមកជាមួយ ពេលមកពិនិត្យលើកក្រោយ។</p>
          </div>
          <div className="text-right">
            <p className="mb-8">គ្រូពេទ្យព្យាបាល</p>
            <p className="font-semibold">{selectedDoctorData?.name}</p>
          </div>
        </div>

        <div className="text-center mt-10 text-sm">
          <p>
            អាស័យដ្ឋាន: ផ្ទះលេខ ៤៧ដេ ផ្លូវលេខ ៣៦០, សង្កាត់ បឹងកេងកង១, ខណ្ឌ ចំការមន,
            ភ្នំពេញ
          </p>
          <p>ទូរស័ព្ទ: ០២៣ ៦៦៦៦ ២៣៧ / ០១១ ៣៩ ៨៨៨៨</p>
        </div>
      </div>
    </div>
  );
}
