import React, { useContext } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaUserCircle } from 'react-icons/fa';
import { UserContext } from './UserContext';

const NavigationBar = () => {
  const { userName, setUserName } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userName');
    setUserName('');
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container style={{backgroundColor:"lightblue"}}>
        <Navbar.Brand as={Link} to="/">Expense Tracker</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/expense">Expense</Nav.Link>
            <Nav.Link as={Link} to="/income">Income</Nav.Link>
            <NavDropdown title="Tools" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/calendar">Calendar</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="https://www.calculator.net/" target="_blank">
                Calculator
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

        <Navbar.Collapse className="justify-content-end">
          {userName ? (
            <Nav>
              <NavDropdown
                title={
                  <>
                    <FaUserCircle style={{ marginRight: '5px' }} />
                    {userName}
                  </>
                }
                id="user-nav-dropdown"
                align="end"
              >
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav.Link as={Link} to="/login">
              <FaSignInAlt style={{ marginRight: '5px' }} />
              Login
            </Nav.Link>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
