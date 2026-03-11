export type Role = 'ADMIN' | 'STAFF';
export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string | null;
  phone: string | null;
  isActive: boolean;
  prescriptions?: Prescription[];
  createdAt: string;
}

export interface Patient {
  id: string;
  nssfId: string | null;
  nationalIdCard: string | null;
  nameLatin: string | null;
  khmerName: string | null;
  name: string;
  gender: Gender;
  age: number;
  phone: string | null;
  address: string | null;
  enterprise: string | null;
  prescriptions?: PrescriptionWithRelations[];
  createdAt: string;
  updatedAt: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  diagnosis: string;
  appointmentDate: string | null;
  createdAt: string;
}

export interface PrescriptionWithRelations extends Prescription {
  patient?: Patient;
  doctor?: Doctor;
  medicines?: PrescriptionMedicineWithMedicine[];
}

export interface Medicine {
  id: string;
  name: string;
  description: string | null;
  costUSD: number | null;
  costKHR: number | null;
}

export interface Diagnosis {
  id: string;
  name: string;
}

export interface PrescriptionMedicine {
  id: string;
  prescriptionId: string;
  medicineId: string;
  morning: string | null;
  afternoon: string | null;
  evening: string | null;
  night: string | null;
  quantity: string;
  instructions: string | null;
}

export interface PrescriptionMedicineWithMedicine extends PrescriptionMedicine {
  medicine?: Medicine;
}

export interface PaginationData {
  total: number;
  totalPages: number;
}
