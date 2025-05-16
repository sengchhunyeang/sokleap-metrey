"use client"
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";

export default function PrintPreview() {
    const {id} = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`/api/prescriptions?id=${id}`)
            .then(res => res.json())
            .then(setData)
            .catch(() => alert("Failed to load"));
    }, [id]);

    if (!data) return <p>Loading...</p>;

    const {patient, prescriptions} = data;

    return (
        <div className="p-6 print:block">
            <h1 className="text-2xl font-bold mb-4 text-center">Prescription</h1>
            <p><strong>Name:</strong> {patient.name}</p>
            <p><strong>Gender:</strong> {patient.gender}</p>
            <p><strong>Age:</strong> {patient.age}</p>
            <p><strong>Diagnosis:</strong> {patient.diagnosis}</p>

            <h2 className="mt-6 mb-2 font-semibold">Medicines:</h2>
            <table className="w-full border">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Morning</th>
                    <th>Afternoon</th>
                    <th>Evening</th>
                    <th>Night</th>
                    <th>Qty</th>
                    <th>Instructions</th>
                </tr>
                </thead>
                <tbody>
                {prescriptions.map((med, i) => (
                    <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{med.name}</td>
                        <td>{med.morning}</td>
                        <td>{med.afternoon}</td>
                        <td>{med.evening}</td>
                        <td>{med.night}</td>
                        <td>{med.quantity}</td>
                        <td>{med.instructions}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            <div className="text-center mt-6">
                <button onClick={() => window.print()} className="px-6 py-2 bg-blue-500 text-white rounded">Print Now
                </button>
            </div>
        </div>
    );
}
