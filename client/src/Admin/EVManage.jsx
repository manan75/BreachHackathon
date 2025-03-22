// EVManage.jsx
import React, { useState, useEffect } from 'react';

const EVManage = () => {
    const [evList, setEvList] = useState([]);
    const [selectedEvDetails, setSelectedEvDetails] = useState(null);

    useEffect(() => {
        const fetchDemoData = async () => {
            const demoEvData = await new Promise(resolve => {
                setTimeout(() => {
                    resolve([
                        {
                            "ev_id": "EV001",
                            "ev_name": "GT5",
                            "ev_model": "Standard",
                            "ev_year": 2023,
                            "ev_build_year": 2022,
                            "ev_totkms": 12000,
                            "ev_regsitration_no": "KA-01-EV-0001",
                            "ev_insurance_id": "INS-001",
                            "ev_insurance_company": "Example Insurance",
                            "ev_insurance_date": "2023-08-15",
                            "ev_insurance_expiry": "2024-08-15",
                            "ev_last_service_date": "2024-06-20",
                            "ev_next_service_due": "2024-12-20",
                            "ev_last_quality_check": "2024-07-10",
                            "ev_battery_status": "95%",
                            "ev_battery_health": "Excellent",
                            "ev_body_status": "Excellent",
                            "ev_registered": "Yes"
                        },
                        {
                            "ev_id": "EV002",
                            "ev_name": "Model X",
                            "ev_model": "Performance",
                            "ev_year": 2022,
                            "ev_build_year": 2021,
                            "ev_totkms": 25000,
                            "ev_regsitration_no": "KA-02-EV-0002",
                            "ev_insurance_id": "INS-002",
                            "ev_insurance_company": "Another Insurance",
                            "ev_insurance_date": "2022-09-01",
                            "ev_insurance_expiry": "2023-09-01",
                            "ev_last_service_date": "2024-05-10",
                            "ev_next_service_due": "2024-11-10",
                            "ev_last_quality_check": "2024-07-05",
                            "ev_battery_status": "88%",
                            "ev_battery_health": "Good",
                            "ev_body_status": "Good",
                            "ev_registered": "Yes"
                        },
                        {
                            "ev_id": "EV003",
                            "ev_name": "Leaf",
                            "ev_model": "SV",
                            "ev_year": 2021,
                            "ev_build_year": 2020,
                            "ev_totkms": 35000,
                            "ev_regsitration_no": "KA-03-EV-0003",
                            "ev_insurance_id": "INS-003",
                            "ev_insurance_company": "Yet Another Insurance",
                            "ev_insurance_date": "2021-10-10",
                            "ev_insurance_expiry": "2022-10-10",
                            "ev_last_service_date": "2024-04-01",
                            "ev_next_service_due": "2024-10-01",
                            "ev_last_quality_check": "2024-06-25",
                            "ev_battery_status": "80%",
                            "ev_battery_health": "Moderate",
                            "ev_body_status": "Moderate",
                            "ev_registered": "Yes"
                        },
                        {
                            "ev_id": "EV004",
                            "ev_name": "Bolt EV",
                            "ev_model": "LT",
                            "ev_year": 2020,
                            "ev_build_year": 2019,
                            "ev_totkms": 45000,
                            "ev_regsitration_no": "KA-04-EV-0004",
                            "ev_insurance_id": "INS-004",
                            "ev_insurance_company": "Example Insurance",
                            "ev_insurance_date": "2020-11-20",
                            "ev_insurance_expiry": "2021-11-20",
                            "ev_last_service_date": "2024-03-15",
                            "ev_next_service_due": "2024-09-15",
                            "ev_last_quality_check": "2024-06-20",
                            "ev_battery_status": "75%",
                            "ev_battery_health": "Moderate",
                            "ev_body_status": "Poor",
                            "ev_registered": "Yes"
                        },
                        {
                            "ev_id": "EV005",
                            "ev_name": "Kona Electric",
                            "ev_model": "SEL",
                            "ev_year": 2023,
                            "ev_build_year": 2022,
                            "ev_totkms": 8000,
                            "ev_regsitration_no": "KA-05-EV-0005",
                            "ev_insurance_id": "INS-005",
                            "ev_insurance_company": "Another Insurance",
                            "ev_insurance_date": "2023-12-01",
                            "ev_insurance_expiry": "2024-12-01",
                            "ev_last_service_date": "2024-07-01",
                            "ev_next_service_due": "2025-01-01",
                            "ev_last_quality_check": "2024-07-15",
                            "ev_battery_status": "98%",
                            "ev_battery_health": "Excellent",
                            "ev_body_status": "Excellent",
                            "ev_registered": "Yes"
                        },
                        {
                            "ev_id": "EV006",
                            "ev_name": "Mach-E",
                            "ev_model": "Premium",
                            "ev_year": 2022,
                            "ev_build_year": 2021,
                            "ev_totkms": 18000,
                            "ev_regsitration_no": "KA-06-EV-0006",
                            "ev_insurance_id": "INS-006",
                            "ev_insurance_company": "Yet Another Insurance",
                            "ev_insurance_date": "2022-07-15",
                            "ev_insurance_expiry": "2023-07-15",
                            "ev_last_service_date": "2024-06-01",
                            "ev_next_service_due": "2024-12-01",
                            "ev_last_quality_check": "2024-07-10",
                            "ev_battery_status": "92%",
                            "ev_battery_health": "Excellent",
                            "ev_body_status": "Good",
                            "ev_registered": "Yes"
                        },
                        {
                            "ev_id": "EV007",
                            "ev_name": "ID.4",
                            "ev_model": "Pro S",
                            "ev_year": 2021,
                            "ev_build_year": 2020,
                            "ev_totkms": 28000,
                            "ev_regsitration_no": "KA-07-EV-0007",
                            "ev_insurance_id": "INS-007",
                            "ev_insurance_company": "Example Insurance",
                            "ev_insurance_date": "2021-09-20",
                            "ev_insurance_expiry": "2022-09-20",
                            "ev_last_service_date": "2024-05-20",
                            "ev_next_service_due": "2024-11-20",
                            "ev_last_quality_check": "2024-07-01",
                            "ev_battery_status": "85%",
                            "ev_battery_health": "Good",
                            "ev_body_status": "Moderate",
                            "ev_registered": "Yes"
                        },
                        {
                            "ev_id": "EV008",
                            "ev_name": "ioniq 5",
                            "ev_model": "Limited",
                            "ev_year": 2023,
                            "ev_build_year": 2022,
                            "ev_totkms": 5000,
                            "ev_regsitration_no": "KA-08-EV-0008",
                            "ev_insurance_id": "INS-008",
                            "ev_insurance_company": "Another Insurance",
                            "ev_insurance_date": "2023-11-01",
                            "ev_insurance_expiry": "2024-11-01",
                            "ev_last_service_date": "2024-07-10",
                            "ev_next_service_due": "2025-01-10",
                            "ev_last_quality_check": "2024-07-20",
                            "ev_battery_status": "99%",
                            "ev_battery_health": "Excellent",
                            "ev_body_status": "Excellent",
                            "ev_registered": "Yes"
                        },
                        {
                            "ev_id": "EV009",
                            "ev_name": "Niro EV",
                            "ev_model": "EX",
                            "ev_year": 2022,
                            "ev_build_year": 2021,
                            "ev_totkms": 15000,
                            "ev_regsitration_no": "KA-09-EV-0009",
                            "ev_insurance_id": "INS-009",
                            "ev_insurance_company": "Yet Another Insurance",
                            "ev_insurance_date": "2022-08-01",
                            "ev_insurance_expiry": "2023-08-01",
                            "ev_last_service_date": "2024-06-10",
                            "ev_next_service_due": "2024-12-10",
                            "ev_last_quality_check": "2024-07-05",
                            "ev_battery_status": "90%",
                            "ev_battery_health": "Excellent",
                            "ev_body_status": "Good",
                            "ev_registered": "Yes"
                        },
                        {
                            "ev_id": "EV010",
                            "ev_name": "e-tron",
                            "ev_model": "Prestige",
                            "ev_year": 2021,
                            "ev_build_year": 2020,
                            "ev_totkms": 30000,
                            "ev_regsitration_no": "KA-10-EV-0010",
                            "ev_insurance_id": "INS-010",
                            "ev_insurance_company": "Example Insurance",
                            "ev_insurance_date": "2021-11-15",
                            "ev_insurance_expiry": "2022-11-15",
                            "ev_last_service_date": "2024-04-20",
                            "ev_next_service_due": "2024-10-20",
                            "ev_last_quality_check": "2024-06-30",
                            "ev_battery_status": "82%",
                            "ev_battery_health": "Good",
                            "ev_body_status": "Moderate",
                            "ev_registered": "Yes"
                        },
                        {
                            "ev_id": "EV011",
                            "ev_name": "GT5",
                            "ev_model": "Standard",
                            "ev_year": 2023,
                            "ev_build_year": 2022,
                            "ev_totkms": 9000,
                            "ev_regsitration_no": "KA-11-EV-0011",
                            "ev_insurance_id": "INS-011",
                            "ev_insurance_company": "Example Insurance",
                            "ev_insurance_date": "2023-09-20",
                            "ev_insurance_expiry": "2024-09-20",
                            "ev_last_service_date": "2024-07-01",
                            "ev_next_service_due": "2025-01-01",
                            "ev_last_quality_check": "2024-07-22",
                            "ev_battery_status": "96%",
                            "ev_battery_health": "Excellent",
                            "ev_body_status": "Excellent",
                            "ev_registered": "Yes"
                        },
                        {
                            "ev_id": "EV012",
                            "ev_name": "Model X",
                            "ev_model": "Long Range",
                            "ev_year": 2022,
                            "ev_build_year": 2021,
                            "ev_totkms": 22000,
                            "ev_regsitration_no": "KA-12-EV-0012",
                            "ev_insurance_id": "INS-012",
                            "ev_insurance_company": "Another Insurance",
                            "ev_insurance_date": "2022-10-15",
                            "ev_insurance_expiry": "2023-10-15",
                            "ev_last_service_date": "2024-05-25",
                            "ev_next_service_due": "2024-11-25",
                            "ev_last_quality_check": "2024-07-08",
                            "ev_battery_status": "89%",
                            "ev_battery_health": "Good",
                            "ev_body_status": "Good",
                            "ev_registered": "Yes"
                        },
                        {
                            "ev_id": "EV013",
                            "ev_name": "Leaf",
                            "ev_model": "SL Plus",
                            "ev_year": 2021,
                            "ev_build_year": 2020,
                            "ev_totkms": 32000,
                            "ev_regsitration_no": "KA-13-EV-0013",
                            "ev_insurance_id": "INS-013",
                            "ev_insurance_company": "Yet Another Insurance",
                            "ev_insurance_date": "2021-12-01",
                            "ev_insurance_expiry": "2022-12-01",
                            "ev_last_service_date": "2024-04-10",
                            "ev_next_service_due": "2024-10-10",
                            "ev_last_quality_check": "2024-06-28",
                            "ev_battery_status": "81%",
                            "ev_battery_health": "Moderate",
                            "ev_body_status": "Moderate",
                            "ev_registered": "Yes"
                        },
                        {
                            "ev_id": "EV014",
                            "ev_name": "Bolt EV",
                            "ev_model": "Premier",
                            "ev_year": 2020,
                            "ev_build_year": 2019,
                            "ev_totkms": 42000,
                            "ev_regsitration_no": "KA-14-EV-0014",
                            "ev_insurance_id": "INS-014",
                            "ev_insurance_company": "Example Insurance",
                            "ev_insurance_date": "2020-12-25",
                            "ev_insurance_expiry": "2021-12-25",
                            "ev_last_service_date": "2024-03-20",
                            "ev_next_service_due": "2024-09-20",
                            "ev_last_quality_check": "2024-06-25",
                            "ev_battery_status": "76%",
                            "ev_battery_health": "Moderate",
                            "ev_body_status": "Poor",
                            "ev_registered": "Yes"
                        },
                        {
                            "ev_id": "EV015",
                            "ev_name": "Kona Electric",
                            "ev_model": "Limited",
                            "ev_year": 2023,
                            "ev_build_year": 2022,
                            "ev_totkms": 6000,
                            "ev_regsitration_no": "KA-15-EV-0015",
                            "ev_insurance_id": "INS-015",
                            "ev_insurance_company": "Another Insurance",
                            "ev_insurance_date": "2023-11-25",
                            "ev_insurance_expiry": "2024-11-25",
                            "ev_last_service_date": "2024-07-05",
                            "ev_next_service_due": "2025-01-05",
                            "ev_last_quality_check": "2024-07-18",
                            "ev_battery_status": "97%",
                            "ev_battery_health": "Excellent",
                            "ev_body_status": "Excellent",
                            "ev_registered": "Yes"
                        },
                        {
                            "ev_id": "EV016",
                            "ev_name": "Mach-E",
                            "ev_model": "California Route 1",
                            "ev_year": 2022,
                            "ev_build_year": 2021,
                            "ev_totkms": 16000,
                            "ev_regsitration_no": "KA-16-EV-0016",
                            "ev_insurance_id": "INS-016",
                            "ev_insurance_company": "Yet Another Insurance",
                            "ev_insurance_date": "2022-09-10",
                            "ev_insurance_expiry": "2023-09-10",
                            "ev_last_service_date": "2024-06-15",
                            "ev_next_service_due": "2024-12-15",
                            "ev_last_quality_check": "2024-07-02",
                            "ev_battery_status": "93%",
                            "ev_battery_health": "Excellent",
                            "ev_body_status": "Good",
                            "ev_registered": "Yes"
                        },
                        {
                            "ev_id": "EV017",
                            "ev_name": "ID.4",
                            "ev_model": "1st Edition",
                            "ev_year": 2021,
                            "ev_build_year": 2020,
                            "ev_totkms": 26000,
                            "ev_regsitration_no": "KA-17-EV-0017",
                            "ev_insurance_id": "INS-017",
                            "ev_insurance_company": "Example Insurance",
                            "ev_insurance_date": "2021-10-25",
                            "ev_insurance_expiry": "2022-10-25",
                            "ev_last_service_date": "2024-05-05",
                            "ev_next_service_due": "2024-11-05",
                            "ev_last_quality_check": "2024-07-03",
                            "ev_battery_status": "86%",
                            "ev_battery_health": "Good",
                            "ev_body_status": "Moderate",
                            "ev_registered": "Yes"
                        },
                        {
                            "ev_id": "EV018",
                            "ev_name": "ioniq 5",
                            "ev_model": "SE",
                            "ev_year": 2023,
                            "ev_build_year": 2022,
                            "ev_totkms": 3000,
                            "ev_regsitration_no": "KA-18-EV-0018",
                            "ev_insurance_id": "INS-018",
                            "ev_insurance_company": "Another Insurance",
                            "ev_insurance_date": "2023-12-15",
                            "ev_insurance_expiry": "2024-12-15",
                            "ev_last_service_date": "2024-07-15",
                            "ev_next_service_due": "2025-01-15",
                            "ev_last_quality_check": "2024-07-25",
                            "ev_battery_status": "100%",
                            "ev_battery_health": "Excellent",
                            "ev_body_status": "Excellent",
                            "ev_registered": "Yes"
                        },
                        {
                            "ev_id": "EV019",
                            "ev_name": "Niro EV",
                            "ev_model": "Touring",
                            "ev_year": 2022,
                            "ev_build_year": 2021,
                            "ev_totkms": 13000,
                            "ev_regsitration_no": "KA-19-EV-0019",
                            "ev_insurance_id": "INS-019",
                            "ev_insurance_company": "Yet Another Insurance",
                            "ev_insurance_date": "2022-11-01",
                            "ev_insurance_expiry": "2023-11-01",
                            "ev_last_service_date": "2024-06-25",
                            "ev_next_service_due": "2024-12-25",
                            "ev_last_quality_check": "2024-07-07",
                            "ev_battery_status": "91%",
                            "ev_battery_health": "Excellent",
                            "ev_body_status": "Good",
                            "ev_registered": "Yes"
                        },
                        {
                            "ev_id": "EV020",
                            "ev_name": "e-tron",
                            "ev_model": "Chronos",
                            "ev_year": 2021,
                            "ev_build_year": 2020,
                            "ev_totkms": 29000,
                            "ev_regsitration_no": "KA-20-EV-0020",
                            "ev_insurance_id": "INS-020",
                            "ev_insurance_company": "Example Insurance",
                            "ev_insurance_date": "2021-12-10",
                            "ev_insurance_expiry": "2022-12-10",
                            "ev_last_service_date": "2024-04-28",
                            "ev_next_service_due": "2024-10-28",
                            "ev_last_quality_check": "2024-07-09",
                            "ev_battery_status": "83%",
                            "ev_battery_health": "Good",
                            "ev_body_status": "Moderate",
                            "ev_registered": "Yes"
                        }
                    ]);
                }, 500);
            });
            setEvList(demoEvData);
        };

        fetchDemoData();
    }, []);

    const handleViewDetails = (ev) => {
        setSelectedEvDetails(ev);
    };

    const handleService = (ev) => {
        alert(`Service action for EV ID: ${ev.ev_id}`);
        // In real app, trigger service process
    };

    const handleInsuranceRenew = (ev) => {
        alert(`Insurance Renew action for EV ID: ${ev.ev_id}`);
        // In real app, trigger insurance renewal process
    };

    return (
        <div className="bg-gray-100 text-gray-800 p-4 rounded-md shadow-md overflow-y-auto h-full">
            <h2 className="text-xl font-semibold mb-4">EV Management Dashboard</h2>

            {selectedEvDetails ? (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2">EV Details - {selectedEvDetails.ev_name} ({selectedEvDetails.ev_id})</h3>
                    <div className="flex flex-col md:flex-row mb-4 bg-white rounded-lg shadow border border-gray-200 p-4">
                        <div className="md:w-1/2 lg:w-1/3 mb-4 md:mb-0 md:mr-4">
                            <img
                                src="https://cdn.bikedekho.com/processedimages/white-carbon-motors/gt5/640X309/gt560939ef51e5fa.jpg"
                                alt={selectedEvDetails.ev_name}
                                className="rounded-lg w-full h-auto"
                            />
                        </div>
                        <div className="md:w-1/2 lg:w-2/3">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                                <div className="p-4 bg-white rounded-lg shadow border border-gray-200">
                                    <h4 className="text-sm font-semibold text-gray-600 uppercase mb-1">EV Name</h4>
                                    <p className="text-lg font-bold">{selectedEvDetails.ev_name}</p>
                                </div>
                                <div className="p-4 bg-white rounded-lg shadow border border-gray-200">
                                    <h4 className="text-sm font-semibold text-gray-600 uppercase mb-1">Model</h4>
                                    <p className="text-lg font-bold">{selectedEvDetails.ev_model}</p>
                                </div>
                                <div className="p-4 bg-white rounded-lg shadow border border-gray-200">
                                    <h4 className="text-sm font-semibold text-gray-600 uppercase mb-1">Total KMs</h4>
                                    <p className="text-lg font-bold">{selectedEvDetails.ev_totkms} km</p>
                                </div>
                                <div className="p-4 bg-white rounded-lg shadow border border-gray-200">
                                    <h4 className="text-sm font-semibold text-gray-600 uppercase mb-1">Quality Check</h4>
                                    <p className="text-lg font-bold">{selectedEvDetails.ev_body_status}</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow border border-gray-200 p-4">
                                <h4 className="text-md font-semibold mb-3">Vehicle Information</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="flex items-center text-sm mb-2"><i className="fas fa-car text-gray-500 mr-2"></i> EV Name: <span className="font-medium">{selectedEvDetails.ev_name}</span></p>
                                        <p className="flex items-center text-sm mb-2"><i className="fas fa-car text-gray-500 mr-2"></i> Model: <span className="font-medium">{selectedEvDetails.ev_model}</span></p>
                                        <p className="flex items-center text-sm mb-2"><i className="fas fa-calendar-alt text-gray-500 mr-2"></i> Model Year: <span className="font-medium">{selectedEvDetails.ev_year}</span></p>
                                        <p className="flex items-center text-sm mb-2"><i className="fas fa-calendar-alt text-gray-500 mr-2"></i> Build Year: <span className="font-medium">{selectedEvDetails.ev_build_year}</span></p>
                                        <p className="flex items-center text-sm mb-2"><i className="fas fa-tachometer-alt text-gray-500 mr-2"></i> Total KMs Driven: <span className="font-medium">{selectedEvDetails.ev_totkms} km</span></p>
                                        <p className="flex items-center text-sm mb-2"><i className="fas fa-id-card-alt text-gray-500 mr-2"></i> Registration No: <span className="font-medium">{selectedEvDetails.ev_regsitration_no}</span></p>
                                        <p className="flex items-center text-sm mb-2"><i className="fas fa-check-circle text-green-500 mr-2"></i> Registered: <span className="font-medium">{selectedEvDetails.ev_registered}</span></p>
                                    </div>
                                    <div>
                                        <p className="flex items-center text-sm mb-2"><i className="fas fa-battery-full text-gray-500 mr-2"></i> Battery Status: <span className="font-medium">{selectedEvDetails.ev_battery_status}</span></p>
                                        <p className="flex items-center text-sm mb-2"><i className="fas fa-heartbeat text-gray-500 mr-2"></i> Battery Health: <span className="font-medium">{selectedEvDetails.ev_battery_health}</span></p>
                                        <p className="flex items-center text-sm mb-2"><i className="fas fa-car-crash text-gray-500 mr-2"></i> Body Status: <span className="font-medium">{selectedEvDetails.ev_body_status}</span></p>
                                        <p className="flex items-center text-sm mb-2"><i className="fas fa-calendar-check text-gray-500 mr-2"></i> Last Quality Check: <span className="font-medium">{new Date(selectedEvDetails.ev_last_quality_check).toLocaleDateString()}</span></p>
                                        <p className="flex items-center text-sm mb-2"><i className="fas fa-wrench text-gray-500 mr-2"></i> Last Service Date: <span className="font-medium">{new Date(selectedEvDetails.ev_last_service_date).toLocaleDateString()}</span></p>
                                        <p className="flex items-center text-sm mb-2"><i className="fas fa-calendar-plus text-gray-500 mr-2"></i> Next Service Due: <span className="font-medium">{new Date(selectedEvDetails.ev_next_service_due).toLocaleDateString()}</span></p>
                                    </div>
                                </div>
                                <hr className="my-4" />
                                <h4 className="text-md font-semibold mb-3">Insurance Details</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="flex items-center text-sm mb-2"><i className="fas fa-shield-alt text-gray-500 mr-2"></i> Insurance Company: <span className="font-medium">{selectedEvDetails.ev_insurance_company}</span></p>
                                        <p className="flex items-center text-sm mb-2"><i className="fas fa-fingerprint text-gray-500 mr-2"></i> Insurance ID: <span className="font-medium">{selectedEvDetails.ev_insurance_id}</span></p>
                                    </div>
                                    <div>
                                        <p className="flex items-center text-sm mb-2"><i className="fas fa-calendar-alt text-gray-500 mr-2"></i> Insurance Date: <span className="font-medium">{new Date(selectedEvDetails.ev_insurance_date).toLocaleDateString()}</span></p>
                                        <p className="flex items-center text-sm mb-2"><i className="fas fa-calendar-times text-gray-500 mr-2"></i> Insurance Expiry: <span className="font-medium">{new Date(selectedEvDetails.ev_insurance_expiry).toLocaleDateString()}</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setSelectedEvDetails(null)}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Back to EV List
                    </button>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white rounded-lg shadow border border-gray-200">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-2 text-left">EV ID</th>
                                <th className="px-4 py-2 text-left">Insurance Expiry</th>
                                <th className="px-4 py-2 text-left">Last Service</th>
                                <th className="px-4 py-2 text-left">Quality Check</th>
                                <th className="px-4 py-2 text-left">Battery</th>
                                <th className="px-4 py-2 text-left">Body</th>
                                <th className="px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {evList.map((ev) => (
                                <tr key={ev.ev_id} className="hover:bg-gray-50">
                                    <td className="border-t px-4 py-2">{ev.ev_id}</td>
                                    <td className="border-t px-4 py-2">{new Date(ev.ev_insurance_expiry).toLocaleDateString()}</td>
                                    <td className="border-t px-4 py-2">{new Date(ev.ev_last_service_date).toLocaleDateString()}</td>
                                    <td className="border-t px-4 py-2">{new Date(ev.ev_last_quality_check).toLocaleDateString()}</td>
                                    <td className="border-t px-4 py-2">{ev.ev_battery_status}</td>
                                    <td className="border-t px-4 py-2">{ev.ev_body_status}</td>
                                    <td className="border-t px-4 py-2 text-center">
                                        <button
                                            onClick={() => handleViewDetails(ev)}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded mr-2 focus:outline-none focus:shadow-outline text-xs"
                                        >
                                            Details
                                        </button>
                                        <button
                                            onClick={() => handleService(ev)}
                                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-2 rounded mr-2 focus:outline-none focus:shadow-outline text-xs"
                                        >
                                            Service
                                        </button>
                                        <button
                                            onClick={() => handleInsuranceRenew(ev)}
                                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline text-xs"
                                        >
                                            Insurance Renew
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default EVManage;