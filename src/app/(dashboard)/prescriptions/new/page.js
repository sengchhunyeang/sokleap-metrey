'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, X, Plus, UserPlus, Trash2, Search } from 'react-feather';
import { Button, Select, Card, Alert, Loading } from '@/app/components/ui';

function NewPrescriptionContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedPatientId = searchParams.get('patientId');

  const [doctors, setDoctors] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(preselectedPatientId || '');
  const [selectedPatientData, setSelectedPatientData] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [prescriptionMedicines, setPrescriptionMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Patient mode: 'search' or 'custom'
  const [patientMode, setPatientMode] = useState('search');

  // Custom patient fields
  const [customName, setCustomName] = useState('');
  const [customAge, setCustomAge] = useState('');
  const [customGender, setCustomGender] = useState('');

  // Patient search state
  const [patientSearch, setPatientSearch] = useState('');
  const [patientResults, setPatientResults] = useState([]);
  const [showPatientDropdown, setShowPatientDropdown] = useState(false);
  const [searchingPatient, setSearchingPatient] = useState(false);
  const patientSearchRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  // Diagnosis search state
  const [diagnosisSearch, setDiagnosisSearch] = useState('');
  const [diagnosisResults, setDiagnosisResults] = useState([]);
  const [showDiagnosisDropdown, setShowDiagnosisDropdown] = useState(false);
  const [searchingDiagnosis, setSearchingDiagnosis] = useState(false);
  const diagnosisSearchRef = useRef(null);
  const diagnosisTimeoutRef = useRef(null);

  // Medicine search state (per row)
  const [medicineSearchIndex, setMedicineSearchIndex] = useState(null);
  const [medicineSearch, setMedicineSearch] = useState('');
  const [medicineResults, setMedicineResults] = useState([]);
  const [showMedicineDropdown, setShowMedicineDropdown] = useState(false);
  const [searchingMedicine, setSearchingMedicine] = useState(false);
  const medicineSearchRefs = useRef({});
  const medicineTimeoutRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (preselectedPatientId) {
      fetchPatientById(preselectedPatientId);
    }
  }, [preselectedPatientId]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (patientSearchRef.current && !patientSearchRef.current.contains(event.target)) {
        setShowPatientDropdown(false);
      }
      if (diagnosisSearchRef.current && !diagnosisSearchRef.current.contains(event.target)) {
        setShowDiagnosisDropdown(false);
      }
      // Check medicine search refs
      const clickedInsideMedicine = Object.values(medicineSearchRefs.current).some(
        ref => ref && ref.contains(event.target)
      );
      if (!clickedInsideMedicine) {
        setShowMedicineDropdown(false);
        setMedicineSearchIndex(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  // Diagnosis search effect
  useEffect(() => {
    if (diagnosisTimeoutRef.current) {
      clearTimeout(diagnosisTimeoutRef.current);
    }

    if (diagnosisSearch.length < 1) {
      setDiagnosisResults([]);
      setShowDiagnosisDropdown(false);
      return;
    }

    diagnosisTimeoutRef.current = setTimeout(async () => {
      setSearchingDiagnosis(true);
      try {
        const res = await fetch(`/api/diagnoses?search=${encodeURIComponent(diagnosisSearch)}&limit=15`);
        const data = await res.json();
        setDiagnosisResults(data.diagnoses || []);
        setShowDiagnosisDropdown(true);
      } catch (error) {
        console.error('Error searching diagnoses:', error);
      } finally {
        setSearchingDiagnosis(false);
      }
    }, 300);

    return () => {
      if (diagnosisTimeoutRef.current) {
        clearTimeout(diagnosisTimeoutRef.current);
      }
    };
  }, [diagnosisSearch]);

  // Medicine search effect
  useEffect(() => {
    if (medicineTimeoutRef.current) {
      clearTimeout(medicineTimeoutRef.current);
    }

    if (medicineSearch.length < 1) {
      setMedicineResults([]);
      setShowMedicineDropdown(false);
      return;
    }

    medicineTimeoutRef.current = setTimeout(async () => {
      setSearchingMedicine(true);
      try {
        const res = await fetch(`/api/medicines?search=${encodeURIComponent(medicineSearch)}&limit=15`);
        const data = await res.json();
        setMedicineResults(data.medicines || []);
        setShowMedicineDropdown(true);
      } catch (error) {
        console.error('Error searching medicines:', error);
      } finally {
        setSearchingMedicine(false);
      }
    }, 300);

    return () => {
      if (medicineTimeoutRef.current) {
        clearTimeout(medicineTimeoutRef.current);
      }
    };
  }, [medicineSearch]);

  async function fetchData() {
    try {
      const doctorsRes = await fetch('/api/doctors?active=true');
      setDoctors(await doctorsRes.json());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async function fetchPatientById(id) {
    try {
      const res = await fetch(`/api/patients/${id}`);
      if (res.ok) {
        const patient = await res.json();
        setSelectedPatientData(patient);
        setPatientSearch(patient.nssfId || patient.nameLatin || patient.name);
        // Populate editable fields
        setCustomName(patient.khmerName || patient.nameLatin || patient.name || '');
        setCustomAge(patient.age?.toString() || '');
        setCustomGender(patient.gender || '');
      }
    } catch (error) {
      console.error('Error fetching patient:', error);
    }
  }

  const handleSelectPatient = (patient) => {
    setSelectedPatient(patient.id);
    setSelectedPatientData(patient);
    setPatientSearch(patient.nssfId || patient.nameLatin || patient.name);
    setShowPatientDropdown(false);
    // Populate editable fields with patient data
    setCustomName(patient.khmerName || patient.nameLatin || patient.name || '');
    setCustomAge(patient.age?.toString() || '');
    setCustomGender(patient.gender || '');
  };

  const clearPatientSelection = () => {
    setSelectedPatient('');
    setSelectedPatientData(null);
    setPatientSearch('');
    setPatientResults([]);
    setCustomName('');
    setCustomAge('');
    setCustomGender('');
  };

  const switchToCustomMode = () => {
    setPatientMode('custom');
    clearPatientSelection();
  };

  const switchToSearchMode = () => {
    setPatientMode('search');
    setCustomName('');
    setCustomAge('');
    setCustomGender('');
  };

  const handleSelectDiagnosis = (diagnosisItem) => {
    setDiagnosis(diagnosisItem.name);
    setDiagnosisSearch(diagnosisItem.name);
    setShowDiagnosisDropdown(false);
  };

  const clearDiagnosisSelection = () => {
    setDiagnosis('');
    setDiagnosisSearch('');
    setDiagnosisResults([]);
  };

  const handleSelectMedicine = (medicine, index) => {
    const updated = [...prescriptionMedicines];
    updated[index].medicineId = medicine.id;
    updated[index].medicineName = medicine.name;
    updated[index].medicineSearchText = medicine.name;
    setPrescriptionMedicines(updated);
    setShowMedicineDropdown(false);
    setMedicineSearchIndex(null);
    setMedicineSearch('');
    setMedicineResults([]);
  };

  const handleMedicineSearchChange = (value, index) => {
    const updated = [...prescriptionMedicines];
    updated[index].medicineSearchText = value;
    if (value !== updated[index].medicineName) {
      updated[index].medicineId = '';
      updated[index].medicineName = '';
    }
    setPrescriptionMedicines(updated);
    setMedicineSearch(value);
    setMedicineSearchIndex(index);
  };

  const clearMedicineSelection = (index) => {
    const updated = [...prescriptionMedicines];
    updated[index].medicineId = '';
    updated[index].medicineName = '';
    updated[index].medicineSearchText = '';
    setPrescriptionMedicines(updated);
  };

  const addMedicine = () => {
    setPrescriptionMedicines([
      ...prescriptionMedicines,
      {
        medicineId: '',
        medicineName: '',
        medicineSearchText: '',
        morning: '',
        afternoon: '',
        evening: '',
        night: '',
        quantity: '',
        instructions: '',
      },
    ]);
  };

  const updateMedicine = (index, field, value) => {
    const updated = [...prescriptionMedicines];
    updated[index][field] = value;
    setPrescriptionMedicines(updated);
  };

  const removeMedicine = (index) => {
    setPrescriptionMedicines(prescriptionMedicines.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate patient data
    if (patientMode === 'search' && !selectedPatient) {
      setError('Please select a patient');
      setLoading(false);
      return;
    }

    if (!customName || !customAge || !customGender) {
      setError('Please fill in patient name, age, and gender');
      setLoading(false);
      return;
    }

    if (!selectedDoctor || !diagnosis) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      let patientId = selectedPatient;

      if (patientMode === 'custom') {
        // Create new patient
        const patientRes = await fetch('/api/patients', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: customName,
            khmerName: customName,
            nameLatin: customName,
            age: parseInt(customAge),
            gender: customGender,
          }),
        });

        if (!patientRes.ok) {
          const result = await patientRes.json();
          throw new Error(result.error || 'Failed to create patient');
        }

        const newPatient = await patientRes.json();
        patientId = newPatient.id;
      } else if (selectedPatient && selectedPatientData) {
        // Update existing patient if data changed
        const nameChanged = customName !== (selectedPatientData.khmerName || selectedPatientData.nameLatin || selectedPatientData.name);
        const ageChanged = parseInt(customAge) !== selectedPatientData.age;
        const genderChanged = customGender !== selectedPatientData.gender;

        if (nameChanged || ageChanged || genderChanged) {
          const updateRes = await fetch(`/api/patients/${selectedPatient}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: customName,
              khmerName: customName,
              nameLatin: customName,
              age: parseInt(customAge),
              gender: customGender,
            }),
          });

          if (!updateRes.ok) {
            const result = await updateRes.json();
            throw new Error(result.error || 'Failed to update patient');
          }
        }
      }

      const res = await fetch('/api/prescriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientId,
          doctorId: selectedDoctor,
          diagnosis,
          appointmentDate: appointmentDate || null,
          medicines: prescriptionMedicines.filter((m) => m.medicineId),
        }),
      });

      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || 'Failed to create prescription');
      }

      const prescription = await res.json();
      router.push(`/prescriptions/${prescription.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <Link href="/prescriptions" className="inline-flex items-center gap-2 text-[#142A4E] hover:underline font-semibold text-[14px]">
          <ArrowLeft size={16} />
          Back to Prescriptions
        </Link>
      </div>

      <Card>
        <h1 className="text-[20px] font-bold text-[#050505] mb-6">
          New Prescription
        </h1>

        {error && (
          <Alert variant="error" className="mb-4">
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Mode Toggle */}
          <div>
            <label className="form-label">Patient *</label>
            <div className="flex gap-2 mb-3">
              <button
                type="button"
                onClick={switchToSearchMode}
                className={`px-4 py-2 text-[12px] font-semibold rounded flex items-center gap-2 ${
                  patientMode === 'search'
                    ? 'bg-[#142A4E] text-white'
                    : 'bg-[#F5F5FA] text-[#5E6366] hover:bg-[#ABAFB1]'
                }`}
              >
                <Search size={14} />
                Search Existing
              </button>
              <button
                type="button"
                onClick={switchToCustomMode}
                className={`px-4 py-2 text-[12px] font-semibold rounded flex items-center gap-2 ${
                  patientMode === 'custom'
                    ? 'bg-[#142A4E] text-white'
                    : 'bg-[#F5F5FA] text-[#5E6366] hover:bg-[#ABAFB1]'
                }`}
              >
                <UserPlus size={14} />
                Quick Add
              </button>
            </div>

            {/* Search Mode */}
            {patientMode === 'search' && (
              <>
                <div className="flex gap-2">
                  <div className="relative flex-1" ref={patientSearchRef}>
                    <div className="flex">
                      <input
                        type="text"
                        value={patientSearch}
                        onChange={(e) => {
                          setPatientSearch(e.target.value);
                          if (selectedPatient) {
                            setSelectedPatient('');
                            setSelectedPatientData(null);
                          }
                        }}
                        onFocus={() => {
                          if (patientResults.length > 0) {
                            setShowPatientDropdown(true);
                          }
                        }}
                        placeholder="Search NSSF ID or Name..."
                        className="form-input"
                        style={{
                          borderColor: selectedPatient ? '#142A4E' : undefined,
                          backgroundColor: selectedPatient ? '#142A4E10' : undefined,
                        }}
                      />
                      {selectedPatient && (
                        <button
                          type="button"
                          onClick={clearPatientSelection}
                          className="ml-1 px-3 text-[#F4645B] hover:text-[#dc3545] font-bold"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                    {searchingPatient && (
                      <div className="absolute right-3 top-2.5 text-[#ABAFB1] text-[12px]">
                        Searching...
                      </div>
                    )}
                    {showPatientDropdown && patientResults.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-[#FEFEFE] border border-[#ABAFB1] rounded shadow-lg max-h-60 overflow-y-auto">
                        {patientResults.map((patient) => (
                          <div
                            key={patient.id}
                            onClick={() => handleSelectPatient(patient)}
                            className="p-3 hover:bg-[#F5F5FA] cursor-pointer border-b border-[#ABAFB1] last:border-b-0"
                          >
                            <div className="font-semibold text-[#142A4E] text-[14px]">
                              {patient.nssfId || 'No NSSF ID'}
                            </div>
                            <div className="text-[12px]">
                              {patient.khmerName && <span className="mr-2 text-[#050505]">{patient.khmerName}</span>}
                              {patient.nameLatin && <span className="text-[#5E6366]">({patient.nameLatin})</span>}
                            </div>
                            <div className="text-[10px] text-[#5E6366]">
                              {patient.gender} | {patient.age} years
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {showPatientDropdown && patientResults.length === 0 && patientSearch.length >= 2 && !searchingPatient && (
                      <div className="absolute z-10 w-full mt-1 bg-[#FEFEFE] border border-[#ABAFB1] rounded shadow-lg p-3 text-[#5E6366] text-center text-[14px]">
                        No patients found
                      </div>
                    )}
                  </div>
                  <Link href="/patients/new">
                    <Button variant="dark" className="flex items-center gap-1">
                      <UserPlus size={14} />
                      Full Form
                    </Button>
                  </Link>
                </div>
                {selectedPatientData && (
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-[#F5F5FA] rounded border border-[#ABAFB1]">
                    <div>
                      <label className="text-[12px] font-semibold text-[#050505] block mb-1">
                        Name / ឈ្មោះ *
                      </label>
                      <input
                        type="text"
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        placeholder="Enter patient name..."
                        className="form-input"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[12px] font-semibold text-[#050505] block mb-1">
                        Age / អាយុ *
                      </label>
                      <input
                        type="number"
                        value={customAge}
                        onChange={(e) => setCustomAge(e.target.value)}
                        placeholder="Age"
                        className="form-input"
                        min="0"
                        max="150"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[12px] font-semibold text-[#050505] block mb-1">
                        Gender / ភេទ *
                      </label>
                      <select
                        value={customGender}
                        onChange={(e) => setCustomGender(e.target.value)}
                        className="form-input"
                        required
                      >
                        <option value="">Select Gender</option>
                        <option value="MALE">Male / ប្រុស</option>
                        <option value="FEMALE">Female / ស្រី</option>
                      </select>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Custom Mode - Quick Add Patient */}
            {patientMode === 'custom' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-[#F5F5FA] rounded border border-[#ABAFB1]">
                <div>
                  <label className="text-[12px] font-semibold text-[#050505] block mb-1">
                    Name / ឈ្មោះ *
                  </label>
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="Enter patient name..."
                    className="form-input"
                    required
                  />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-[#050505] block mb-1">
                    Age / អាយុ *
                  </label>
                  <input
                    type="number"
                    value={customAge}
                    onChange={(e) => setCustomAge(e.target.value)}
                    placeholder="Age"
                    className="form-input"
                    min="0"
                    max="150"
                    required
                  />
                </div>
                <div>
                  <label className="text-[12px] font-semibold text-[#050505] block mb-1">
                    Gender / ភេទ *
                  </label>
                  <select
                    value={customGender}
                    onChange={(e) => setCustomGender(e.target.value)}
                    className="form-input"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="MALE">Male / ប្រុស</option>
                    <option value="FEMALE">Female / ស្រី</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Doctor Selection */}
          <Select
            label="Doctor"
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            required
            options={[
              { value: '', label: 'Select Doctor' },
              ...doctors.map((doctor) => ({
                value: doctor.id,
                label: `${doctor.name}${doctor.specialty ? ` - ${doctor.specialty}` : ''}`,
              })),
            ]}
          />

          {/* Diagnosis */}
          <div>
            <label className="form-label">Diagnosis / រោគវិនិច្ឆ័យ *</label>
            <div className="relative" ref={diagnosisSearchRef}>
              <div className="flex">
                <input
                  type="text"
                  value={diagnosisSearch}
                  onChange={(e) => {
                    setDiagnosisSearch(e.target.value);
                    setDiagnosis(e.target.value);
                  }}
                  onFocus={() => {
                    if (diagnosisResults.length > 0) {
                      setShowDiagnosisDropdown(true);
                    }
                  }}
                  placeholder="Search diagnosis..."
                  className="form-input"
                  style={{
                    borderColor: diagnosis ? '#142A4E' : undefined,
                    backgroundColor: diagnosis ? '#142A4E10' : undefined,
                  }}
                  required
                />
                {diagnosis && (
                  <button
                    type="button"
                    onClick={clearDiagnosisSelection}
                    className="ml-1 px-3 text-[#F4645B] hover:text-[#dc3545] font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
              {searchingDiagnosis && (
                <div className="absolute right-3 top-2.5 text-[#ABAFB1] text-[12px]">
                  Searching...
                </div>
              )}
              {showDiagnosisDropdown && diagnosisResults.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-[#FEFEFE] border border-[#ABAFB1] rounded shadow-lg max-h-60 overflow-y-auto">
                  {diagnosisResults.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleSelectDiagnosis(item)}
                      className="p-3 hover:bg-[#F5F5FA] cursor-pointer border-b border-[#ABAFB1] last:border-b-0 text-[14px] text-[#050505]"
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              )}
              {showDiagnosisDropdown && diagnosisResults.length === 0 && diagnosisSearch.length >= 1 && !searchingDiagnosis && (
                <div className="absolute z-10 w-full mt-1 bg-[#FEFEFE] border border-[#ABAFB1] rounded shadow-lg p-3 text-[#5E6366] text-center text-[14px]">
                  No diagnoses found
                </div>
              )}
            </div>
          </div>

          {/* Appointment Date */}
          <div>
            <label className="form-label">Appointment Date / ថ្ងៃណាត់</label>
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              className="form-input"
            />
          </div>

          {/* Medicines - Minimal Design */}
          <div>
            <label className="form-label">Medicines / ថ្នាំ</label>

            {/* Add Medicine Input */}
            <div className="relative mb-4" ref={el => medicineSearchRefs.current['add'] = el}>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={medicineSearchIndex === 'add' ? medicineSearch : ''}
                    onChange={(e) => {
                      setMedicineSearch(e.target.value);
                      setMedicineSearchIndex('add');
                    }}
                    onFocus={() => setMedicineSearchIndex('add')}
                    placeholder="+ Type medicine name to add..."
                    className="w-full px-4 py-3 text-[14px] border border-[#E0E0E0] rounded-lg focus:outline-none focus:border-[#142A4E] focus:ring-1 focus:ring-[#142A4E]"
                  />
                  {medicineSearchIndex === 'add' && searchingMedicine && (
                    <div className="absolute right-3 top-3.5 text-[#ABAFB1] text-[12px]">
                      Searching...
                    </div>
                  )}
                </div>
              </div>
              {medicineSearchIndex === 'add' && showMedicineDropdown && medicineResults.length > 0 && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-[#E0E0E0] rounded-lg shadow-lg max-h-48 overflow-y-auto">
                  {medicineResults.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        setPrescriptionMedicines([
                          ...prescriptionMedicines,
                          {
                            medicineId: item.id,
                            medicineName: item.name,
                            medicineSearchText: item.name,
                            dosage: '',
                            frequency: '',
                            timing: '',
                            morning: '',
                            afternoon: '',
                            evening: '',
                            night: '',
                            quantity: '',
                            instructions: '',
                          },
                        ]);
                        setMedicineSearch('');
                        setShowMedicineDropdown(false);
                        setMedicineSearchIndex(null);
                      }}
                      className="px-4 py-3 hover:bg-[#F5F5FA] cursor-pointer border-b border-[#E0E0E0] last:border-b-0 text-[14px] text-[#050505]"
                    >
                      {item.name}
                    </div>
                  ))}
                </div>
              )}
              {medicineSearchIndex === 'add' && showMedicineDropdown && medicineResults.length === 0 && medicineSearch.length >= 1 && !searchingMedicine && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-[#E0E0E0] rounded-lg shadow-lg p-3 text-[#5E6366] text-center text-[14px]">
                  No medicines found
                </div>
              )}
            </div>

            {/* Medicine List */}
            {prescriptionMedicines.length > 0 ? (
              <div className="space-y-3">
                {prescriptionMedicines.map((med, index) => (
                  <div
                    key={index}
                    className="bg-white border border-[#E0E0E0] rounded-lg p-4 hover:shadow-sm transition-shadow"
                  >
                    {/* Medicine Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-[#142A4E] text-white rounded-full flex items-center justify-center text-[12px] font-bold">
                          {index + 1}
                        </span>
                        <span className="font-semibold text-[15px] text-[#050505]">
                          {med.medicineName}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeMedicine(index)}
                        className="text-[#BDBDBD] hover:text-[#F44336] transition-colors"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    {/* Dosage & Timing */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                      <div>
                        <label className="text-[11px] text-[#757575] block mb-1">Dosage / កិរិយា</label>
                        <input
                          type="text"
                          value={med.dosage || ''}
                          onChange={(e) => updateMedicine(index, 'dosage', e.target.value)}
                          placeholder="e.g., 500mg"
                          className="w-full px-3 py-2 text-[13px] border border-[#E0E0E0] rounded focus:outline-none focus:border-[#142A4E]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] text-[#757575] block mb-1">Frequency / ប្រេកង់</label>
                        <select
                          value={med.frequency || ''}
                          onChange={(e) => updateMedicine(index, 'frequency', e.target.value)}
                          className="w-full px-3 py-2 text-[13px] border border-[#E0E0E0] rounded focus:outline-none focus:border-[#142A4E]"
                        >
                          <option value="">Select...</option>
                          <option value="1x">Once daily / ១ដង/ថ្ងៃ</option>
                          <option value="2x">Twice daily / ២ដង/ថ្ងៃ</option>
                          <option value="3x">3 times daily / ៣ដង/ថ្ងៃ</option>
                          <option value="4x">4 times daily / ៤ដង/ថ្ងៃ</option>
                          <option value="prn">As needed / ពេលត្រូវការ</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] text-[#757575] block mb-1">When to take / ពេលណា</label>
                        <select
                          value={med.timing || ''}
                          onChange={(e) => updateMedicine(index, 'timing', e.target.value)}
                          className="w-full px-3 py-2 text-[13px] border border-[#E0E0E0] rounded focus:outline-none focus:border-[#142A4E]"
                        >
                          <option value="">Select...</option>
                          <option value="before">Before meals / មុនអាហារ</option>
                          <option value="after">After meals / ក្រោយអាហារ</option>
                          <option value="with">With meals / ជាមួយអាហារ</option>
                          <option value="morning">Morning / ព្រឹក</option>
                          <option value="night">At night / យប់</option>
                          <option value="any">Any time / ពេលណាក៏បាន</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[11px] text-[#757575] block mb-1">Quantity / ចំនួន</label>
                        <input
                          type="text"
                          value={med.quantity || ''}
                          onChange={(e) => updateMedicine(index, 'quantity', e.target.value)}
                          placeholder="e.g., 30 tablets"
                          className="w-full px-3 py-2 text-[13px] border border-[#E0E0E0] rounded focus:outline-none focus:border-[#142A4E]"
                        />
                      </div>
                    </div>

                    {/* Instructions */}
                    <div>
                      <label className="text-[11px] text-[#757575] block mb-1">Instructions / ការណែនាំ</label>
                      <input
                        type="text"
                        value={med.instructions || ''}
                        onChange={(e) => updateMedicine(index, 'instructions', e.target.value)}
                        placeholder="Special instructions..."
                        className="w-full px-3 py-2 text-[13px] border border-[#E0E0E0] rounded focus:outline-none focus:border-[#142A4E]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-[#ABAFB1] text-[14px]">
                No medicines added yet. Type above to search and add.
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex gap-4 pt-4 border-t border-[#ABAFB1]">
            <Button type="submit" loading={loading} className="flex items-center gap-2">
              <Save size={16} />
              Save Prescription
            </Button>
            <Link href="/prescriptions">
              <Button variant="secondary" className="flex items-center gap-2">
                <X size={16} />
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default function NewPrescriptionPage() {
  return (
    <Suspense fallback={<Loading text="Loading..." />}>
      <NewPrescriptionContent />
    </Suspense>
  );
}
