// File: src/components/AppointmentForm.js
import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, Button, Box, Typography, Divider
} from '@mui/material';
import { doctors, patients } from '../data/StaticData';

const AppointmentForm = ({ date, appointments, updateAppointments, onClose }) => {
  const [form, setForm] = useState({ patient: '', doctor: '', time: '' });

  const dateKey = date.toISOString().split('T')[0];
  const dailyAppointments = appointments[dateKey] || [];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const newAppointment = {
      ...form,
      time: new Date(`${dateKey}T${form.time}`)
    };

    const updated = {
      ...appointments,
      [dateKey]: [...dailyAppointments, newAppointment]
    };
    updateAppointments(updated);
    onClose();
  };

  const handleDelete = (index) => {
    const updated = {
      ...appointments,
      [dateKey]: dailyAppointments.filter((_, i) => i !== index)
    };
    updateAppointments(updated);
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{date.toDateString()} - Add Appointment</DialogTitle>
      <DialogContent>
        <TextField
          select
          label="Patient"
          name="patient"
          fullWidth
          value={form.patient}
          onChange={handleChange}
          margin="normal"
        >
          {patients.map((p, i) => (
            <MenuItem key={i} value={p}>{p}</MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Doctor"
          name="doctor"
          fullWidth
          value={form.doctor}
          onChange={handleChange}
          margin="normal"
        >
          {doctors.map((d, i) => (
            <MenuItem key={i} value={d}>{d}</MenuItem>
          ))}
        </TextField>

        <TextField
          label="Time"
          type="time"
          name="time"
          fullWidth
          value={form.time}
          onChange={handleChange}
          margin="normal"
        />

        <Box mt={3}>
          <Typography variant="subtitle2">Appointments for {dateKey}:</Typography>
          {dailyAppointments.map((appt, i) => (
            <Box key={i} display="flex" justifyContent="space-between" alignItems="center" mt={1}>
              <Typography variant="body2">
                {appt.patient} with {appt.doctor} @{' '}
                {new Date(appt.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Typography>
              <Button size="small" color="error" onClick={() => handleDelete(i)}>Delete</Button>
            </Box>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave} disabled={!form.patient || !form.doctor || !form.time}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AppointmentForm;
