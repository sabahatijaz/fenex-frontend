import React, { useEffect, useState } from 'react';
import { getQuotes } from '../../api/api';
import Modal from 'react-modal';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


// Style for the parent card
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

// Label for quotations
const QuotationsLabel = styled.h2`
  margin: 0;
  color: #3b5998;
`;

// Add New Quote button
const AddQuoteButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 15px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #388e3c;
  }
`;

// Wrapper for the quotes
const QuotesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
`;

// Style for individual quote cards
const QuoteCard = styled.div`
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

// Open Quote button within the card
const OpenQuoteButton = styled.button`
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

// Modal Styles
const modalStyles = {
  content: {
    position: 'relative',
    width: '90vw',
    maxWidth: '600px',
    height: '80vh',
    maxHeight: '600px',
    margin: 'auto',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#fff',
    overflow: 'auto',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
};

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 15px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

Modal.setAppElement('#root');

const QuotesPage = () => {
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newQuote, setNewQuote] = useState({
    quotation_id: '',
    product_name: '',
    height: 0,
    width: 0,
    quantity: 1,
  });

  const handleOpenQuote = (quoteId) => {
    navigate(`/quote/${quoteId}`);
  };

  const handleAddQuote = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuote({ ...newQuote, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuotes([...quotes, newQuote]);
    setNewQuote({ quotation_id: '', product_name: '', height: 0, width: 0, quantity: 1 });
    handleCloseModal();
  };

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const data = await getQuotes();
        setQuotes(data);
      } catch (error) {
        console.error('Error fetching quotes:', error);
      }
    };

    fetchQuotes();
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <ParentCard>
        <HeaderRow>
          <QuotationsLabel>Quotations</QuotationsLabel>
          <AddQuoteButton onClick={handleAddQuote}>
            Add New Quote
          </AddQuoteButton>
        </HeaderRow>

        {/* Quotes Section */}
        <QuotesWrapper>
          {quotes.map((quote) => (
            <QuoteCard key={quote.quotation_id}>
              <h2>Quotation ID: {quote.quotation_id}</h2>
              <p><strong>Product:</strong> {quote.product_name}</p>
              <p><strong>Dimensions:</strong> {quote.height} cm x {quote.width} cm</p>
              <p><strong>Quantity:</strong> {quote.quantity}</p>
              <OpenQuoteButton onClick={() => handleOpenQuote(quote.quotation_id)}>Open Quote</OpenQuoteButton>
            </QuoteCard>
          ))}
        </QuotesWrapper>
      </ParentCard>

      {/* Modal for adding new quote */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCloseModal}
        style={modalStyles}
        contentLabel="Add New Quote"
      >
        <h2>Add New Quote</h2>
        <form onSubmit={handleSubmit}>
          <FormContainer>
            <Input
              type="text"
              name="quotation_id"
              placeholder="Quotation ID"
              value={newQuote.quotation_id}
              onChange={handleInputChange}
              required
            />
            <Input
              type="text"
              name="product_name"
              placeholder="Product Name"
              value={newQuote.product_name}
              onChange={handleInputChange}
              required
            />
            <Input
              type="number"
              name="height"
              placeholder="Height (cm)"
              value={newQuote.height}
              onChange={handleInputChange}
              required
            />
            <Input
              type="number"
              name="width"
              placeholder="Width (cm)"
              value={newQuote.width}
              onChange={handleInputChange}
              required
            />
            <Input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={newQuote.quantity}
              onChange={handleInputChange}
              required
            />
          </FormContainer>

          <SubmitButton type="submit">Submit Quote</SubmitButton>
        </form>
      </Modal>
    </div>
  );
};

export default QuotesPage;
