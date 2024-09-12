import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSiteById, getQuotationsBySiteId } from '../../api/api';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  color: #3b5998;
`;

const Detail = styled.p`
  font-size: 18px;
`;

const QuotationList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const QuotationItem = styled.li`
  margin: 10px 0;
  padding: 10px;
  background: #f4f4f4;
  border: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #3b5998;
  color: white;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #2a4373;
  }
`;

const SiteDetailsPage = () => {
  const { siteId } = useParams();
  const navigate = useNavigate();
  const [site, setSite] = useState(null);
  const [quotations, setQuotations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSiteDetails = async () => {
      try {
        const siteData = await getSiteById(siteId);
        setSite(siteData);

        const quotationsData = await getQuotationsBySiteId(siteId);
        setQuotations(quotationsData);
      } catch (error) {
        console.error('Error fetching site details:', error);
        setError('Failed to fetch site details.');
      } finally {
        setLoading(false);
      }
    };

    fetchSiteDetails();
  }, [siteId]);

  const handleOpenQuote = (quoteId) => {
    navigate(`/quote/${quoteId}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!site) {
    return <p>No site found.</p>;
  }

  return (
    <Container>
      <Title>{site.name} Details</Title>
      <Detail><strong>Site ID:</strong> {site.site_id}</Detail>
      <Detail><strong>Address:</strong> {`${site.address.street}, ${site.address.city}, ${site.address.state}, ${site.address.country}, ${site.address.postal_code}`}</Detail>
      <Detail><strong>Type:</strong> {site.site_type}</Detail>
      <Detail><strong>Risks:</strong> {site.risks.join(', ')}</Detail>

      <Title>Quotations</Title>
      {quotations.length > 0 ? (
        <QuotationList>
          {quotations.map((quotation) => (
            <QuotationItem key={quotation.quotation_id}>
              <div>
                <Detail><strong>Quotation ID:</strong> {quotation.quotation_id}</Detail>
                <Detail><strong>Product Name:</strong> {quotation.product_name}</Detail>
                <Detail><strong>Dimensions:</strong> {quotation.height}cm x {quotation.width}cm</Detail>
                <Detail><strong>Quantity:</strong> {quotation.quantity}</Detail>
              </div>
              <Button onClick={() => handleOpenQuote(quotation.quotation_id)}>Open Quote</Button>
            </QuotationItem>
          ))}
        </QuotationList>
      ) : (
        <p>No quotations available for this site.</p>
      )}
    </Container>
  );
};

export default SiteDetailsPage;
