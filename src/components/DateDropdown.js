import { useEffect, useRef, useState, useContext } from "react";
import { Calendar } from "react-date-range";
import format from "date-fns/format";
import { HouseContext } from "./HouseContext";
import { Menu } from "@headlessui/react";
import "./DateDropdown.css";

import {
  RiCalendar2Line,
  RiArrowUpSLine,
  RiArrowDownSLine,
} from "react-icons/ri";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateDropdown = () => {
  // date state
  const [calendar, setCalendar] = useState("Date (any)");

  const { date, setDate } = useContext(HouseContext);

  // open close
  const [open, setOpen] = useState(false);

  // get the target element to toggle
  const refOne = useRef(null);

  useEffect(() => {
    setDate("Date (any)");
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // Hide on outside click
  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  // on date change, store date in state
  const handleSelect = (date) => {
    setCalendar(format(date, "dd/MM/yyyy"));
    setDate(format(date, "yyyy/MM/dd"));
  };

  return (
    <Menu as="div" className="dropdown relative">
      <div className="calendarWrap">
        <Menu.Button
          className="dropdown-btn w-full"
          onClick={() => setOpen(!open)}
        >
          <RiCalendar2Line className="dropdown-icon-primary" />
          <div>
            <div className="text-[15px] font-medium leading-tight">
              {calendar}
            </div>
            <div className="text-[13px]">Select Move-in Date</div>
          </div>
          {open ? (
            <RiArrowUpSLine className="dropdown-icon-secondary" />
          ) : (
            <RiArrowDownSLine className="dropdown-icon-secondary" />
          )}
        </Menu.Button>

        <div ref={refOne}>
          {open && (
            <Calendar
              date={new Date()}
              onChange={handleSelect}
              className="calendarElement"
            />
          )}
        </div>
      </div>
    </Menu>
  );
};

export default DateDropdown;
