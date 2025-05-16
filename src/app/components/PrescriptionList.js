
import { useEffect, useState } from 'react';

export default function PrescriptionList() {
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const res = await fetch('/api/prescription');
                const data = await res.json();
                setPrescriptions(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Prescriptions</h1>
            {prescriptions.map((pres) => (
                <div key={pres.id}>
                    <h2>{pres.patientName} ({pres.gender}, {pres.age} yrs)</h2>
                    <p>Diagnosis: {pres.diagnosis}</p>
                    <ul>
                        {pres.medicines.map((med) => (
                            <li key={med.id}>
                                {med.name} - Qty: {med.quantity} - Instructions: {med.instructions}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
