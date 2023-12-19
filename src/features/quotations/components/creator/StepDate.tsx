import {useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const StepDate = () => {

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div className="my-4">
      <div>
        <h1 className="font-bold mb-2">Select date</h1>
      </div>
      <div className="flex items-center space-x-2">
        <DatePicker showIcon closeOnScroll selected={startDate} onChange={(date) => setStartDate(date || startDate)} dateFormat={"PPP"} />
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </span>


        <DatePicker showIcon closeOnScroll selected={endDate} onChange={(date) => setEndDate(date || endDate)} dateFormat={"PPP"} />
      </div>
    </div>
  )
}

export default StepDate;