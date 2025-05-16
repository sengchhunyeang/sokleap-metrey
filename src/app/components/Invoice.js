'use client'
import Image from "next/image";
export default function Invoice(){
    return(
        <>
            <div className="bg-gray-100 flex justify-center py-10 font-[Khmer_OS_Battambang]">
                <div className="w-[148mm] h-[210mm] border border-gray-400 p-4 relative bg-white mx-auto invoice-page">
                    {/* Header Section */}
                    <div className="flex justify-between mb-4 items-start">
                        <Image src="/logo/left.png" alt="Logo 1" width={80} height={80} className="h-20 w-auto" />
                        <div className="text-center">
                            <h1 className="text-xl font-bold text-gray-700">មន្ទីរពេទ្យពហុព្យាបាល​ សុខលាភមេត្រី</h1>
                            <h2 className="text-md font-semibold text-gray-600">SOK LEAP METREY POLYCLINIC</h2>
                            <p className="text-lg font-bold text-gray-500">វិក្កយបត្រ</p>
                        </div>
                        <div className="text-right">
                            <Image src="/logo/right.png" alt="Logo 2" width={80} height={80} className="h-20 w-auto" />
                        </div>
                    </div>

                    {/* Patient Info Section */}
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-700">
                        <div><p><span className="font-bold">ឈ្មោះ:</span> អៀន កែវណារី</p></div>
                        <div className="flex">
                            <p className="mr-4"><span className="font-bold">ភេទ:</span> ស្រី</p>
                            <p><span className="font-bold">អាយុ:</span> ២២ឆ្នាំ</p>
                        </div>
                    </div>

                    {/* Table Section */}
                    <table className="w-full text-sm text-left text-gray-700 border-collapse mb-6">
                        <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="border px-4 py-2">ល.រ</th>
                            <th className="border px-4 py-2">បញ្ហាពេទ្យ</th>
                            <th className="border px-4 py-2">តម្លៃរាយ</th>
                            <th className="border px-4 py-2">ចំនួន</th>
                            <th className="border px-4 py-2">តម្លៃសរុប</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr><td className="border px-4 py-2 text-center">1</td><td className="border px-4 py-2">Consultation</td><td className="border px-4 py-2">40,000 រៀល</td><td className="border px-4 py-2 text-center">1</td><td className="border px-4 py-2">40,000 រៀល</td></tr>
                        <tr><td className="border px-4 py-2 text-center">2</td><td className="border px-4 py-2">Calcium (Buvable) Ampule</td><td className="border px-4 py-2">1,000 រៀល</td><td className="border px-4 py-2 text-center">5</td><td className="border px-4 py-2">5,000 រៀល</td></tr>
                        <tr><td className="border px-4 py-2 text-center">3</td><td className="border px-4 py-2">Magne- B6 tb</td><td className="border px-4 py-2">700 រៀល</td><td className="border px-4 py-2 text-center">10</td><td className="border px-4 py-2">7,000 រៀល</td></tr>
                        <tr><td className="border px-4 py-2 text-center">4</td><td className="border px-4 py-2">Alprazolam 0.5mg tb</td><td className="border px-4 py-2">1,200 រៀល</td><td className="border px-4 py-2 text-center">10</td><td className="border px-4 py-2">12,000 រៀល</td></tr>
                        <tr><td className="border px-4 py-2 text-center">5</td><td className="border px-4 py-2">Royal D Sachet</td><td className="border px-4 py-2">1,000 រៀល</td><td className="border px-4 py-2 text-center">6</td><td className="border px-4 py-2">6,000 រៀល</td></tr>
                        </tbody>
                    </table>

                    <div className="flex justify-end mb-6">
                        <div className="w-1/2 bg-gray-200 p-2 font-bold text-right text-gray-700">សរុប ៖ 70,000 រៀល</div>
                    </div>

                    <div className="text-sm text-gray-700 text-right mb-4">
                        <p>ថ្ងៃខែឆ្នាំ៖ ៧ ឧសភា ២០២៥</p>
                        <p>អ្នកទទួលប្រាក់</p>
                        <p className="flex justify-end">
                            <Image src="/image/Nary.png" alt="Receiver" width={80} height={80} className="h-20 w-auto" />
                        </p>
                        <p>អៀន កែវណារី</p>
                    </div>

                    {/* Bottom Address & Contact */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-sm text-gray-600 text-center">
                        <p>អាស័យដ្ឋានៈ ផ្លូវ ១៨៨ ផ្ទះលេខ ៨៦០, សង្កាត់ បឹងព្រលឹត, ខណ្ឌ៧មករា, ភ្នំពេញ</p>
                        <p>លេខទូរសព្ទ៖ ០១២-៣៤៥៦៧៨៩ / ០៩៨-៧៦៥៤៣២</p>
                    </div>
                </div>
            </div>
        </>
    )

}