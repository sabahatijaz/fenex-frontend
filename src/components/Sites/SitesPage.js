import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Modal from 'react-modal';
import { dummySites } from '../../data/dummyData';

// Styles for the parent card
const ParentCard = styled.div`
  padding: 20px;
  width: 100%;
  max-width: 90vw; /* Maximum width for the card */
  margin: 0 auto; /* Center horizontally */
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Optional: Add shadow */
  background-color: #f9f9f9; /* Background color */
  border-radius: 10px;
  min-height: 80vh; /* Minimum height */
`;

// Header row with space between label and button
const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

// Label for sites
const SitesLabel = styled.h2`
  margin: 0;
  color: #3b5998;
`;

// Add New Site button
const AddSiteButton = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #388e3c;
  }
`;

// Wrapper for the site cards
const SitesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
`;

const SiteCard = styled.div`
  background: #f4f4f4;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  width: calc(33.333% - 20px); /* Adjust to fit three items per row */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Smooth transition on hover */

  /* Hover effect */
  &:hover {
    transform: translateY(-5px); /* Slightly lift the card */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Increase shadow */
  }

  /* Responsive design for smaller screens */
  @media (max-width: 768px) {
    width: calc(50% - 20px); /* Two items per row */
  }

  @media (max-width: 480px) {
    width: 100%; /* One item per row */
  }
`;

// Open Site button within the card
const OpenSiteButton = styled.button`
  margin-top: 10px;
  padding: 10px;
  background-color: #3b5998;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2d4373;
  }
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 8px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Select = styled.select`
  padding: 8px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const SubmitButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #388e3c;
  }
`;

const customModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    borderRadius: '10px',
    width: '400px',
  },
};

Modal.setAppElement('#root');

const SitesPage = () => {
  const navigate = useNavigate();
  const [sites, setSites] = useState(dummySites);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSite, setNewSite] = useState({
    name: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      postal_code: '',
    },
    site_type: 'Industrial',
    risks: '',
  });

  const handleOpenSite = (siteId) => {
    navigate(`/site/${siteId}`);
  };

  const handleAddSite = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address_')) {
      const field = name.replace('address_', '');
      setNewSite(prev => ({
        ...prev,
        address: {
          ...prev.address,
          [field]: value,
        },
      }));
    } else {
      setNewSite(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const siteId = sites.length + 1;
    setSites([...sites, { ...newSite, site_id: siteId, risks: newSite.risks.split(',') }]);
    setNewSite({
      name: '',
      address: {
        street: '',
        city: '',
        state: '',
        country: '',
        postal_code: '',
      },
      site_type: 'Industrial',
      risks: '',
    });
    handleCloseModal();
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <ParentCard>
        <HeaderRow>
          <SitesLabel>Sites</SitesLabel>
          <AddSiteButton onClick={handleAddSite}>
            Add New Site
          </AddSiteButton>
        </HeaderRow>

        <SitesWrapper>
          {sites.map((site) => (
            <SiteCard key={site.site_id}>
              <h2>{site.name || 'No Name'}</h2>
              <p><strong>Address:</strong> {`${site.address.street}, ${site.address.city}, ${site.address.state}, ${site.address.country}, ${site.address.postal_code}`}</p>
              <p><strong>Type:</strong> {site.site_type}</p>
              <p><strong>Risks:</strong> {site.risks.join(', ')}</p>
              <OpenSiteButton onClick={() => handleOpenSite(site.site_id)}>
                Open Site
              </OpenSiteButton>
            </SiteCard>
          ))}
        </SitesWrapper>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          style={customModalStyles}
          contentLabel="Add New Site"
        >
          <h2>Add New Site</h2>
          <FormContainer onSubmit={handleSubmit}>
            <label>Site Name</label>
            <Input
              name="name"
              value={newSite.name}
              onChange={handleInputChange}
              required
            />
            <label>Street</label>
            <Input
              name="address_street"
              value={newSite.address.street}
              onChange={handleInputChange}
              required
            />
            <label>City</label>
            <Input
              name="address_city"
              value={newSite.address.city}
              onChange={handleInputChange}
              required
            />
            <label>State</label>
            <Input
              name="address_state"
              value={newSite.address.state}
              onChange={handleInputChange}
              required
            />
            <label>Country</label>
            <Input
              name="address_country"
              value={newSite.address.country}
              onChange={handleInputChange}
              required
            />
            <label>Postal Code</label>
            <Input
              name="address_postal_code"
              value={newSite.address.postal_code}
              onChange={handleInputChange}
              required
            />
            <label>Site Type</label>
            <Select
              name="site_type"
              value={newSite.site_type}
              onChange={handleInputChange}
              required
            >
              <option value="Industrial">Industrial</option>
              <option value="Residential">Residential</option>
            </Select>
            <label>Risks</label>
            <Input
              name="risks"
              value={newSite.risks}
              onChange={handleInputChange}
              required
            />
            <SubmitButton type="submit">Add Site</SubmitButton>
          </FormContainer>
        </Modal>
      </ParentCard>
    </div>
  );
};

export default SitesPage;
