// File: src/components/DayCell.js
import React from 'react';
import { Card, Typography } from '@mui/material';

const DayCell = ({ date, appointments, onClick }) => {
  const dateKey = date.toISOString().split('T')[0];
  const appts = appointments[dateKey] || [];

  return (
    <Card
      onClick={onClick}
      sx={{
        height: 120,
        padding: 2,
        borderRadius: 2,
        backgroundColor: '#fff',
        border: '1px solid #e0e0e0',
        color: '#000',
        transition: 'all 0.2s ease-in-out',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        '&:hover': {
          boxShadow: 3,
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      <Typography variant="body1" fontWeight="bold">
        {date.getDate()}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {appts.length} Appointment{appts.length !== 1 && 's'}
      </Typography>
    </Card>
  );
};

export default DayCell;
