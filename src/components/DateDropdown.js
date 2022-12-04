import { useEffect, useRef, useState, useContext } from "react";
import { Calendar } from "react-date-range";
import format from "date-fns/format";
import { HouseContext } from "./HouseContext";
import { Menu } from "@headlessui/react";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateDropdown = () => {
  // date state
  const [calendar, setCalendar] = useState("");

  const { date, setDate } = useContext(HouseContext);

  // open close
  const [open, setOpen] = useState(false);

  // get the target element to toggle
  const refOne = useRef(null);

  useEffect(() => {
    // set current date on component load
    setCalendar("Select Move-in Date");
    setDate("Date (any)");
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // Hide on outside click
  const hideOnClickOutside = (e) => {
    // console.log(refOne.current)
    // console.log(e.target)
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  // on date change, store date in state
  const handleSelect = (date) => {
    // console.log(date)
    // console.log(format(date, 'MM/dd/yyyy'))
    setCalendar(format(date, "dd/MM/yyyy"));
    setDate(format(date, "yyyy/MM/dd"));
  };

  return (
    <Menu as="div" className="dropdown relative">
      <div className="calendarWrap">
        <Menu.Button className="dropdown-btn w-full">
          <div className="text-[15px] font-medium mb-12 leading-tight">
            When
          </div>

          <div>
            <input
              value={calendar}
              readOnly
              className="text-[13px]"
              onClick={() => setOpen((open) => !open)}
            />
          </div>
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
