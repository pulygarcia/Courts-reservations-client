"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  onChange?: (date: Date | null) => void;
}

export default function FormDatePicker({ onChange }: DatePickerProps) {
  const [date, setDate] = useState<Date | null>(null);

  const today = new Date();
  const maxDate = new Date();
  maxDate.setDate(today.getDate() + 7);

  const handleChange = (date: Date|null) => {
    setDate(date);
    if(onChange){
        return onChange(date);
    }
  }

  return (
    <DatePicker
      selected={date}
      onChange={handleChange}
      minDate={today}
      maxDate={maxDate}
      placeholderText="Selecciona una fecha"
      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
      dateFormat="dd/MM/yyyy"
    />
  );
}
