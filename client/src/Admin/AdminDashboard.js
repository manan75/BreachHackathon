import axios from "axios";
import React, { useEffect, useState } from "react";
import { Badge, Button, Card, Col, Container, Form, Modal, Row, Table } from "react-bootstrap";

function AdminDashboard() {
   const [complaints, setComplaints] = useState([]);
   const [selectedComplaint, setSelectedComplaint] = useState(null);
   const [showModal, setShowModal] = useState(false);
   const [statusUpdate, setStatusUpdate] = useState("");
   const [emergencyMessage, setEmergencyMessage] = useState("");
   const [showEmergencyModal, setShowEmergencyModal] = useState(false);
   const [loading, setLoading] = useState(true);

   const token = localStorage.getItem("token");

  

  


   

   const getStatusBadge = (status) => {
      const variants = {
         Pending: "warning", // Yellow
         "In Progress": "info", // Blue
         Resolved: "success", // Green
         Escalated: "danger", // Red
      };
      return <Badge bg={variants[status] || "secondary"} className="px-2 py-1">{status}</Badge>;
   };


   const getUrgencyBadge = (urgency) => {
      const variants = {
         High: "danger",
         Medium: "warning",
         Low: "info",
      };
      return <Badge bg={variants[urgency] || "secondary"}>{urgency}</Badge>;
   };

   const complaintStats = {
      total: complaints.length,
      resolved: complaints.filter((c) => c.status === "resolved").length,
      pending: complaints.filter((c) => c.status === "pending").length,
      escalated: complaints.filter((c) => c.status === "escalated").length,
   };

   

   return (
      <Container fluid className="py-4 px-4">
         <Row className="mb-4 g-3">
            <Col md={3}>
               <Card className="text-center shadow-sm border-0">
                  <Card.Body>
                     <h6>Total Vehicles</h6>
                     <h2 className="text-primary">{complaintStats.total}</h2>
                  </Card.Body>
               </Card>
            </Col>
            <Col md={3}>
               <Card className="text-center shadow-sm border-0">
                  <Card.Body>
                     <h6>Vehicles in use</h6>
                     <h2 className="text-success">{complaintStats.resolved}</h2>
                  </Card.Body>
               </Card>
            </Col>
            <Col md={3}>
               <Card className="text-center shadow-sm border-0">
                  <Card.Body>
                     <h6>Remaining Vehicles</h6>
                     <h2 className="text-warning">{complaintStats.pending}</h2>
                  </Card.Body>
               </Card>
            </Col>
            <Col md={3}>
               <Card className="text-center shadow-sm border-0">
                  <Card.Body>
                     <h6>Damaged Vehicles</h6>
                     <h2 className="text-danger">{complaintStats.escalated}</h2>
                  </Card.Body>
               </Card>
            </Col>
         </Row>

         <Card className="shadow-sm mb-4">
            <Card.Body>
               <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="mb-0">Admin Dashboard</h2>
                 
               </div>

               <Card className="border-0 shadow-sm">
                  <Card.Header className="bg-white">
                     <h5 className="mb-0">Management</h5>

                   
                  </Card.Header>
                  <Card.Body>
                     <Table responsive hover className="align-middle mb-0">
                        <thead className="bg-light">
                           <tr>
                              <th>Vehicle ID</th>
                  
                              <th>Area</th>
                              <th>Description</th>
                              
                              <th>Status</th>
                              <th>Date</th>
                            

                           </tr>
                        </thead>
                        <tbody>
                           {loading ? (
                              <tr>
                                 <td colSpan="6" className="text-center py-4">
                                    Loading complaints...
                                 </td>
                              </tr>
                           ) : complaints.length > 0 ? (
                              complaints
                                 .slice(-6) // Get the last 6 complaints
                                 .reverse() // Reverse the slice to show the latest first
                                 .map((complaint) => (
                                    <tr key={complaint._id}>
                                       <td>
                                          <small className="text-muted">{complaint._id}</small>
                                       </td>
                                       
                                       <td>{complaint.area}</td>
                                       
                                       <td></td>
                                       <td></td>
                                       <td>{new Date(complaint.createdAt).toLocaleString()}</td>
                                       <td>
                                        
                                       </td>
                                    </tr>
                                 ))
                           ) : (
                              <tr>
                                 <td colSpan="6" className="text-center py-4">
                                    No complaints found.
                                 </td>
                              </tr>
                           )}
                        </tbody>

                     </Table>
                  </Card.Body>
               </Card>
            </Card.Body>
         </Card>

         <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton className="bg-light">
               <Modal.Title>Complaint Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               {selectedComplaint && (
                  <div className="px-2">
                     <div className="mb-4">
                        <small className="text-muted d-block mb-2">Complaint ID</small>
                        <p className="mb-0">{selectedComplaint._id}</p>
                     </div>
                     <div className="mb-4">
                        <small className="text-muted d-block mb-2">Category</small>
                        <p className="mb-0">{selectedComplaint.category}</p>
                     </div>
                     <div className="mb-4">
                        <small className="text-muted d-block mb-2">Description</small>
                        <p className="mb-0">{selectedComplaint.description}</p>
                     </div>
                     <div className="mb-4">
                        <small className="text-muted d-block mb-2">Urgency</small>
                        <p className="mb-0">{getUrgencyBadge(selectedComplaint.urgency)}</p>
                     </div>
                     <div className="mb-4">
                        <small className="text-muted d-block mb-2">Current Status</small>
                        <p className="mb-0">{getStatusBadge(selectedComplaint.status)}</p>
                     </div>
                     <Form.Group>
                        <Form.Label>Update Status</Form.Label>
                        <Form.Select
                           value={statusUpdate}
                           onChange={(e) => setStatusUpdate(e.target.value)}
                           className="form-select-lg"
                        >
                           <option value="">Select Status</option>
                           <option value="Pending">Pending</option>
                           <option value="In Progress">In Progress</option>
                           <option value="Resolved">Resolved</option>
                           <option value="Escalated">Escalated</option>
                        </Form.Select>
                     </Form.Group>
                  </div>
               )}
            </Modal.Body>
            <Modal.Footer className="bg-light">
               <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Close
               </Button>
               <Button variant="primary" >
                  Update Status
               </Button>
            </Modal.Footer>
         </Modal>

         <Modal show={showEmergencyModal} onHide={() => setShowEmergencyModal(false)}>
            <Modal.Header closeButton className="bg-danger text-white">
               <Modal.Title>
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  Issue Emergency Warning
               </Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form.Group>
                  <Form.Label>Emergency Message</Form.Label>
                  <Form.Control
                     as="textarea"
                     rows={4}
                     value={emergencyMessage}
                     onChange={(e) => setEmergencyMessage(e.target.value)}
                     placeholder="Type your emergency message here..."
                     className="form-control-lg"
                  />
               </Form.Group>
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={() => setShowEmergencyModal(false)}>
                  Cancel
               </Button>
               <Button variant="danger" >
                  Send Emergency Message
               </Button>
            </Modal.Footer>
         </Modal>
      </Container>
   );
}

export default AdminDashboard;
