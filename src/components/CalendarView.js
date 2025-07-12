import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  useMediaQuery,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { getMonthDays } from '../utils/dateUtils';
import AppointmentForm from './AppointmentForm';
import DayCell from './DayCell';
import { doctors, patients } from '../data/StaticData';

const CalendarView = ({ appointments, updateAppointments }) => {
  const today = new Date();
  const monthDays = getMonthDays(today);
  const isMobile = useMediaQuery('(max-width:600px)');

  const [selectedDate, setSelectedDate] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [filterDoctor, setFilterDoctor] = useState('');
  const [filterPatient, setFilterPatient] = useState('');

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setOpenForm(true);
  };

  const filterAppointments = (date) => {
    const dateKey = date.toISOString().split('T')[0];
    const appts = appointments[dateKey] || [];

    return appts.filter(
      (a) =>
        (!filterDoctor || a.doctor === filterDoctor) &&
        (!filterPatient || a.patient === filterPatient)
    );
  };

  return (
    <Box p={3} maxWidth="1100px" mx="auto">
      

      <Typography variant="h4" mb={2}>
        {today.toLocaleString('default', { month: 'long' })} {today.getFullYear()}
      </Typography>

      {/* Filters */}
      <Box display="flex" gap={2} flexWrap="wrap" mb={3}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Doctor</InputLabel>
          <Select
            value={filterDoctor}
            label="Doctor"
            onChange={(e) => setFilterDoctor(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {doctors.map((d, i) => (
              <MenuItem key={i} value={d}>
                {d}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Patient</InputLabel>
          <Select
            value={filterPatient}
            label="Patient"
            onChange={(e) => setFilterPatient(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {patients.map((p, i) => (
              <MenuItem key={i} value={p}>
                {p}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* Calendar View */}
      {isMobile ? (
        <Box display="flex" flexDirection="column" gap={2}>
          {monthDays.map((day, index) =>
            day ? (
              <DayCell
                key={index}
                date={day}
                appointments={{ [day.toISOString().split('T')[0]]: filterAppointments(day) }}
                onClick={() => handleDayClick(day)}
              />
            ) : (
              <Box key={index} height={100} />
            )
          )}
        </Box>
      ) : (
        <Grid container spacing={2}>
          {monthDays.map((day, index) => (
            <Grid item xs={12 / 7} key={index}>
              {day ? (
                <DayCell
                  date={day}
                  appointments={{ [day.toISOString().split('T')[0]]: filterAppointments(day) }}
                  onClick={() => handleDayClick(day)}
                />
              ) : (
                <Box height={100} />
              )}
            </Grid>
          ))}
        </Grid>
      )}

      {/* Appointment Form Dialog */}
      {openForm && selectedDate && (
        <AppointmentForm
          date={selectedDate}
          appointments={appointments}
          updateAppointments={updateAppointments}
          onClose={() => setOpenForm(false)}
        />
      )}
    </Box>
  );
};

export default CalendarView;
