import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Navbar, Container, Nav, Badge, Button } from 'react-bootstrap';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

function EngineerNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    const logoutChannel = new BroadcastChannel('logout-channel');
    logoutChannel.postMessage({ type: 'logout' });

    toast.info('Signed Out Successfully', {
      position: "top-center",
      autoClose: 1000,
    });

    logoutChannel.close();
  };

  const logoutChannel = new BroadcastChannel('logout-channel');
  logoutChannel.addEventListener('message', (event) => {
    if (event.data.type === 'logout') {
      navigate('/');
    }
  });

  // THEME STYLES
  const navbarStyle = {
    backgroundColor: '#0f172a', // dark navy
    padding: '0.8rem 1.5rem',
    borderBottom: '2px solid #14b8a6', // teal green line
  };

  const brandStyle = {
    color: '#14b8a6',
    fontWeight: 'bold',
    fontSize: '1.8rem',
    textDecoration: 'none',
    fontFamily: 'Segoe UI',
  };

  const badgeStyle = {
    backgroundColor: '#1e293b',
    fontSize: '1rem',
    padding: '0.5rem 1rem',
    borderRadius: '10px',
    color: '#f8fafc',
  };

  const buttonStyle = {
    backgroundColor: '#ef4444', // red
    borderColor: '#ef4444',
    color: '#fff',
    fontWeight: '600',
  };

  const buttonHover = {
    backgroundColor: '#dc2626',
    borderColor: '#dc2626',
  };

  return (
    <div>
      <Navbar expand="lg" style={navbarStyle}>
        <Container fluid>
          <NavLink className="navbar-brand fw-bold fs-3" to="/" style={brandStyle}>
            <span style={{ fontWeight: "300", color: "#fff" }}>Brick</span>
            <span style={{ fontWeight: "700", color: "#14b8a6" }}>Store</span>
          </NavLink>

          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto w-100 justify-content-end align-items-center gap-3">
              <Badge style={badgeStyle}>
                <FaUserCircle className="me-1" />
                {sessionStorage.getItem("userName")}
              </Badge>
              <Button
                style={buttonStyle}
                onMouseOver={(e) => Object.assign(e.target.style, buttonHover)}
                onMouseOut={(e) => Object.assign(e.target.style, buttonStyle)}
                onClick={handleLogout}
              >
                <FaSignOutAlt /> Logout
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ToastContainer />
    </div>
  );
}

export default EngineerNavbar;
