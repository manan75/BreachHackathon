import axios from "axios";
import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Container, Row, Table } from "react-bootstrap";

function AdminDashboard() {
   const [vehicleStats, setVehicleStats] = useState({
      total: 0,
      rented: 0,
      available: 0,
      maintenance: 0,
   });
   const [vehicles, setVehicles] = useState([]);
   const [loading, setLoading] = useState(true);

   const token = localStorage.getItem("token");

   useEffect(() => {
      const fetchVehicleStats = async () => {
         try {
            const response = await axios.get("http://localhost:3001/api/admin/vehicle-stats", {
               headers: { Authorization: `Bearer ${token}` },
            });
            setVehicleStats(response.data);
         } catch (error) {
            console.error("Error fetching vehicle stats", error);
         }
      };

      const fetchVehicles = async () => {
         try {
            const response = await axios.get("http://localhost:3001/api/admin/vehicles", {
               headers: { Authorization: `Bearer ${token}` },
            });
            setVehicles(response.data);
         } catch (error) {
            console.error("Error fetching vehicles", error);
         }
         setLoading(false);
      };

      fetchVehicleStats();
      fetchVehicles();
   }, []);

   const getStatusBadge = (status) => {
      switch (status) {
         case "available":
            return <Badge bg="success">Available</Badge>;
         case "rented":
            return <Badge bg="warning">In Use</Badge>;
         case "maintenance":
            return <Badge bg="danger">Maintenance</Badge>;
         default:
            return <Badge bg="secondary">Unknown</Badge>;
      }
   };

   return (
      <Container fluid className="py-4 px-4">
         <Row className="mb-4 g-3">
            <Col md={3}>
               <Card className="text-center shadow-sm border-0">
                  <Card.Body>
                     <h6>Total Vehicles</h6>
                     <h2 className="text-primary">{vehicleStats.total}</h2>
                  </Card.Body>
               </Card>
            </Col>
            <Col md={3}>
               <Card className="text-center shadow-sm border-0">
                  <Card.Body>
                     <h6>Vehicles in Use</h6>
                     <h2 className="text-warning">{vehicleStats.rented}</h2>
                  </Card.Body>
               </Card>
            </Col>
            <Col md={3}>
               <Card className="text-center shadow-sm border-0">
                  <Card.Body>
                     <h6>Available Vehicles</h6>
                     <h2 className="text-success">{vehicleStats.available}</h2>
                  </Card.Body>
               </Card>
            </Col>
            <Col md={3}>
               <Card className="text-center shadow-sm border-0">
                  <Card.Body>
                     <h6>Maintenance</h6>
                     <h2 className="text-danger">{vehicleStats.maintenance}</h2>
                  </Card.Body>
               </Card>
            </Col>
         </Row>

         <h4 className="mb-3">Vehicle Details</h4>
         <Table striped bordered hover responsive>
            <thead>
               <tr>
                  <th>#</th>
                  <th>Model</th>
                  <th>Type</th>
                  <th>Status</th>
               </tr>
            </thead>
            <tbody>
               {loading ? (
                  <tr>
                     <td colSpan="4" className="text-center">Loading...</td>
                  </tr>
               ) : (
                  vehicles.map((vehicle, index) => (
                     <tr key={vehicle._id}>
                        <td>{index + 1}</td>
                        <td>{vehicle.model}</td>
                        <td>{vehicle.type}</td>
                        <td>{getStatusBadge(vehicle.status)}</td>
                     </tr>
                  ))
               )}
            </tbody>
         </Table>
      </Container>
   );
}

export default AdminDashboard;
