"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function PrescriptionForm() {
    const router = useRouter();
    const [showMedicineForm, setShowMedicineForm] = useState(false);
    const [patientData, setPatientData] = useState({
        name: '',
        gender: '',
        age: '',
        diagnosis: '',
    });
    const [prescriptions, setPrescriptions] = useState([]);
    const formRef = useRef(null);

    const handlePrint = async () => {
        try {
            const res = await fetch('/api/prescriptions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    patientData,
                    prescriptions,
                }),
            });

            if (!res.ok) {
                const text = await res.text(); // fallback if not JSON
                throw new Error(`Error ${res.status}: ${text}`);
            }

            const data = await res.json();
            alert(data.message || 'Success');
            window.print();
        } catch (error) {
            console.error('Error submitting form:', error);
            alert(error.message);
        }
    };

    const handleSavePatient = (e) => {
        e.preventDefault();
        const { name, gender, age, diagnosis } = e.target.elements;
        setPatientData({
            name: name.value,
            gender: gender.value,
            age: age.value,
            diagnosis: diagnosis.value,
        });
        setShowMedicineForm(true);
    };

    const handleAddMedicine = (e) => {
        e.preventDefault();
        const { medicineName, morning, afternoon, evening, night, quantity, instructions } = e.target.elements;
        const newPrescription = {
            name: medicineName.value,
            morning: morning.value,
            afternoon: afternoon.value,
            evening: evening.value,
            night: night.value,
            quantity: quantity.value,
            instructions: instructions.value,
        };
        setPrescriptions([...prescriptions, newPrescription]);
        e.target.reset();
    };

    const handleDelete = (index) => {
        const updated = prescriptions.filter((_, i) => i !== index);
        setPrescriptions(updated);
    };

    return (
        <div className="bg-gray-50 min-h-screen p-6">
            <div className="text-right mb-4">
                <button
                    onClick={handlePrint}
                    className="btn-print bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                    បោះពុម្ពលទ្ធផល
                </button>
            </div>

            <div ref={formRef} className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6 print:block">
                {/* Header */}
                <header className="flex items-center justify-between">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logo/left.png" alt="Left Logo" className="h-16" />
                    <div className="text-center font-bold text-xl">
                        មន្ទីរពហុព្យាបាល​ សុខ លាភ មេត្រី<br />
                        SOK LEAP METREY POLYCLINIC
                    </div>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logo/right.png" alt="Right Logo" className="h-16" />
                </header>

                <h1 className="text-2xl font-bold my-6 text-center">Prescription Form</h1>

                {/* Patient Form */}
                <form onSubmit={handleSavePatient} className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Patient Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input name="name" type="text" placeholder="Patient Name" required className="p-2 border rounded" />
                        <select name="gender" required className="p-2 border rounded">
                            <option value="">Select Gender</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>
                        <input name="age" type="number" placeholder="Age" required className="p-2 border rounded" />
                    </div>

                    <div className="mt-5 mb-4">
                        <label className="text-lg font-bold">រោគវិនិច្ឆ័យ៖</label>
                        <input
                            name="diagnosis"
                            type="search"
                            placeholder="ស្វែងរករោគវិនិច្ឆ័យ..."
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

                    <button type="submit" className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Save Patient
                    </button>
                </form>

                {/* Medicine Form */}
                {showMedicineForm && (
                    <form onSubmit={handleAddMedicine} className="mb-6">
                        <h2 className="text-xl font-semibold mb-4">Medicine Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input name="medicineName" placeholder="Medicine Name" required className="p-2 border rounded" />
                            <input name="morning" placeholder="Morning" className="p-2 border rounded" />
                            <input name="afternoon" placeholder="Afternoon" className="p-2 border rounded" />
                            <input name="evening" placeholder="Evening" className="p-2 border rounded" />
                            <input name="night" placeholder="Night" className="p-2 border rounded" />
                            <input name="quantity" placeholder="Quantity" className="p-2 border rounded" />
                            <input name="instructions" placeholder="Instructions" className="p-2 border rounded col-span-full" />
                        </div>

                        <button type="submit" className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                            Add Medicine
                        </button>
                    </form>
                )}

                {/* Prescription Table */}
                {prescriptions.length > 0 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Submitted Prescriptions</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full table-auto border border-gray-300">
                                <thead className="bg-gray-100">
                                <tr>
                                    {["ល.រ", "ឈ្មោះថ្នាំ", "ព្រឹក", "ថ្ងៃ", "ល្ងាច", "យប់", "ចំនួន", "ណែនាំ", "សកម្មភាព"].map((col) => (
                                        <th key={col} className="border px-2 py-1">{col}</th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {prescriptions.map((item, index) => (
                                    <tr key={index}>
                                        <td className="border px-2 py-1">{index + 1}</td>
                                        <td className="border px-2 py-1">{item.name}</td>
                                        <td className="border px-2 py-1">{item.morning}</td>
                                        <td className="border px-2 py-1">{item.afternoon}</td>
                                        <td className="border px-2 py-1">{item.evening}</td>
                                        <td className="border px-2 py-1">{item.night}</td>
                                        <td className="border px-2 py-1">{item.quantity}</td>
                                        <td className="border px-2 py-1">{item.instructions}</td>
                                        <td className="border px-2 py-1">
                                            <button onClick={() => handleDelete(index)} className="text-red-500 hover:underline">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                    <div>
                        <p><strong>ថ្ងៃណាត់៖</strong> ..........................................</p>
                        <p>សូមយកវេជ្ជបញ្ជាមកជាមួយ ពេលមកពិនិត្យលើកក្រោយ។</p>
                    </div>
                    <div className="text-right">
                        <input type="date" className="p-2 border rounded mb-2" />
                        <p>គ្រូពេទ្យព្យាបាល</p>
                        <select className="p-2 border rounded mt-2">
                            <option value="">Select Doctors</option>
                            <option>Dr. SEAN SOKVISAL</option>
                            <option>Dr. CHHUN PHEAKDEY</option>
                            <option>Dr. SOTH SEREYPISETH</option>
                        </select>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="text-center mt-10 text-sm">
                    <p>អាស័យដ្ឋាន: ផ្ទះលេខ ៤៧ដេ ផ្លូវលេខ ៣៦០,​ សង្កាត់ បឹងកេងកង១,​ ខណ្ឌ ចំការមន, ភ្នំពេញ</p>
                    <p>ទូរស័ព្ទ: ៨៥៥-០២៣ ៦៦៦៦ ២៣៧ / ០១១ ៣៩ ៨៨៨៨</p>
                </div>
            </div>
        </div>
    );
}
