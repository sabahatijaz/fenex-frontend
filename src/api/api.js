// src/api/api.js
import axios from 'axios';
import { dummySites, dummyQuotes } from '../data/dummyData';
const BASE_URL = 'http://localhost:5000/api'; 
// src/api/api.js
const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
  });
  
// Function to simulate fetching sites
export const getSites = async () => {
  // Simulate an API call with a promise
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummySites);
    }, 1000); // Simulate network latency
  });
};

// Function to simulate fetching quotes
export const getQuotes = async () => {
  // Simulate an API call with a promise
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyQuotes);
    }, 1000); // Simulate network latency
  });
};

// Simulate fetching site data by ID
export const getSiteById = async (siteId) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  const site = dummySites.find(site => site.site_id === siteId);
  if (!site) {
    throw new Error('Site not found');
  }
  return site;
};

// Simulate fetching quotations for a site
export const getQuotationsBySiteId = async (siteId) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  const quotations = dummyQuotes.filter(quote => quote.site_id === siteId);
  return quotations;
};

export const getQuoteDetails = async (quoteId) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  const quotation = dummyQuotes.filter(quote => quote.quotation_id === quoteId);
  if (!quotation) {
    throw new Error('Quote not found');
  }
  console.log("quotations,", quotation)
  return quotation;
};

// export const getSiteById = async (siteId) => {
//   // Replace with dummy data for testing
//   return {
//     site_id: siteId,
//     address: '123 Test St',
//     site_type: 'Residential',
//     risks: ['Test Risk 1', 'Test Risk 2']
//   };
// };

// export const getQuotationsBySiteId = async (siteId) => {
//   // Replace with dummy data for testing
//   return [
//     {
//       quotation_id: 1,
//       products: [
//         { product_name: 'Window', quantity: 10 },
//         { product_name: 'Door', quantity: 5 }
//       ]
//     }
//   ];
// };
  
export default api;
