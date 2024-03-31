import React, { useEffect, useState } from 'react';

type Row = {
  id: number;
  column1: string;
  column2: string;
  column3: string;
  column4: string;
  column5: string;
  column6: string;
  column7: string;
  column8: string;
};

export const Vendor: React.FC = () => {
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    // Fetch rows from API
    fetchRows();
  }, []);

  const fetchRows = async () => {
    try {
      // Fetch data from your API
      const response = await fetch('your_api_endpoint');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setRows(data); // Assuming data is an array of rows
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const viewRecord = (id: number) => {
    // Logic to view record
    console.log(`View Record clicked for row with ID ${id}`);
  };

  const viewBankDetails = (id: number) => {
    // Logic to view bank details
    console.log(`View Bank Details clicked for row with ID ${id}`);
  };

  return (
    <div className="container">
      <h2>Vendor</h2>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Column 3</th>
            <th>Column 4</th>
            <th>Column 5</th>
            <th>Column 6</th>
            <th>Column 7</th>
            <th>Column 8</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        <tr>
        <td>Action</td>
        <td>Action</td>
        <td>Action</td>
        <td>Action</td>
        <td>Action</td>
        <td>Action</td>
        <td>Action</td>
        <td>Action</td>
        <td>Action</td>
        <td>Action</td>
          </tr>
          <tr>
        <td>Action</td>
        <td>Action</td>
        <td>Action</td>
        <td>Action</td>
        <td>Action</td>
        <td>Action</td>
        <td>Action</td>
        <td>Action</td>
        <td>Action</td>
        <td>Action</td>
          </tr>
          <tr>
        <td>Action</td>
        <td>Action</td>
        <td>Action</td>
        <td>Action</td>
        <td>Action</td>
        <td>Action</td>
        <td>Action</td>
        <td>Action</td>
        <td>Action</td>
        <td>Action</td>
          </tr>

          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.column1}</td>
              <td>{row.column2}</td>
              <td>{row.column3}</td>
              <td>{row.column4}</td>
              <td>{row.column5}</td>
              <td>{row.column6}</td>
              <td>{row.column7}</td>
              <td>{row.column8}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => viewRecord(row.id)}
                >
                  View Record
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => viewBankDetails(row.id)}
                >
                  View Bank Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
