import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { NavLink } from 'react-router-dom';
import { Navbar, Container, Nav, Badge, Button } from 'react-bootstrap';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

function AdminNavbar() {
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

  // Inline styles
  const navbarStyle = {
    backgroundColor: '#0a192f',
    borderBottom: '3px solid #1ec6b6',
  };

  const brandStyle = {
    color: '#1ec6b6',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    textDecoration: 'none',
  };

  const navLinkStyle = {
    color: '#ffffff',
    fontSize: '1.2rem',
    fontWeight: 600,
    textDecoration: 'none',
  };

  const badgeStyle = {
    backgroundColor: '#1ec6b6',  // ✅ added background color
    color: '#0a192f',
    padding: '12px 15px',
    borderRadius: '30px',
    fontWeight: 'bold',
    fontSize: '1rem',
  };
  

  const logoutButtonStyle = {
    backgroundColor: '#f44336',
    border: 'none',
    padding: '8px 15px',
    fontWeight: 500,
    borderRadius: '25px',
    color: '#ffffff',
    transition: 'background-color 0.3s ease',
  };

  return (
    <>
      <Navbar expand="lg" className="px-5" style={navbarStyle}>
        <Container fluid>
          <NavLink className="navbar-brand fw-bold fs-3" to="/" style={{ color: "#ffffff" }}>
          <span style={{ fontWeight: "300" }}>Brick</span>
          <span style={{ fontWeight: "700", color: "#1ec6b6" }}>Store</span>
        </NavLink>

          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto d-flex justify-content-between w-100">
              <Nav.Item>
                <NavLink to="/admin" style={navLinkStyle}>
                  Dashboard
                </NavLink>
              </Nav.Item>

              <Nav.Item className="d-flex align-items-center">
                <Badge style={badgeStyle}  >
                  <FaUserCircle className="me-2" />
                  {sessionStorage.getItem("userName")}
                </Badge>

                <Button className="ms-3" style={logoutButtonStyle} onClick={handleLogout}>
                  <FaSignOutAlt className="me-1" /> Logout
                </Button>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ToastContainer />
    </>
  );
}

export default AdminNavbar;
