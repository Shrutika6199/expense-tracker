// Dashboard.js
import React from "react";
import { Card, Row, Col, ListGroup } from "react-bootstrap";

const Dashboard = ({ income, remaining, totalPaid, unpaidExpenses }) => {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📊 Dashboard Overview</h2>

      <Row className="g-4">
        <Col xs={12} md={6} lg={3}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Card.Title>💰 Total Income</Card.Title>
              <Card.Text className="fs-4 text-success">₹{income}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={6} lg={3}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Card.Title>💸 Paid Expenses</Card.Title>
              <Card.Text className="fs-4 text-danger">₹{totalPaid}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={6} lg={3}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Card.Title>🏦 Remaining Balance</Card.Title>
              <Card.Text className="fs-4 text-primary">₹{remaining}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={6} lg={3}>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <Card.Title>📅 Next Due</Card.Title>
              {unpaidExpenses.length > 0 ? (
                <Card.Text className="fs-6">
                  {unpaidExpenses[0].description} - ₹
                  {unpaidExpenses[0].amount} due on{" "}
                  {new Date(unpaidExpenses[0].dueDate).toLocaleDateString()}
                </Card.Text>
              ) : (
                <Card.Text className="fs-6">No pending expenses!</Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <h5 className="mb-3">📝 Unpaid Expenses</h5>
          <ListGroup>
            {unpaidExpenses.length === 0 ? (
              <ListGroup.Item>All expenses are paid 🎉</ListGroup.Item>
            ) : (
              unpaidExpenses.map((exp) => (
                <ListGroup.Item key={exp.id}>
                  {exp.description} - ₹{exp.amount} (Due:{" "}
                  {new Date(exp.dueDate).toLocaleDateString()})
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
