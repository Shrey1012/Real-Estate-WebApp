import React, { useState, useEffect, createContext } from "react";

//import data
import { housesData } from "../data";

//create context
export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData);
  const [country, setCountry] = useState("Location (any)");
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState("Property Type (any)");
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState("Price range (any)");
  const [date, setDate] = useState("Date range (any)");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //return all countries
    const allCountries = houses.map((house) => {
      return house.country;
    });

    // remove duplicates
    const uniqueCountries = ["Location (any)", ...new Set(allCountries)];

    // set countries state
    setCountries(uniqueCountries);
  }, []);

  useEffect(() => {
    // return all properties
    const allProperties = houses.map((house) => {
      return house.type;
    });

    // remove duplicates
    const uniqueProperties = ["Property type (any)", ...new Set(allProperties)];

    // set properties state
    setProperties(uniqueProperties);
  }, []);

  const handleClick = () => {
    setLoading(true);
    // check the string if includes '(any)'
    const isDefault = (str) => {
      return str.split(" ").includes("(any)");
    };

    // get first string (price) and parse it to number
    const minPrice = parseInt(price.split(" ")[0]);
    // get last string (price) and parse it to number
    const maxPrice = parseInt(price.split(" ")[2]);

    const date1 = parseInt(date.split("/").join(""));

    const newHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price);

      const date2 = parseInt(house.availabilityStart?.replace(/-/g, ""));
      const date3 = parseInt(house.availabilityEnd?.replace(/-/g, ""));

      // all values are selected
      if (
        house.country === country &&
        house.type === property &&
        housePrice >= minPrice &&
        housePrice <= maxPrice &&
        date1 >= date2 &&
        date1 <= date3
      ) {
        return house;
      }

      // all values are default
      if (
        isDefault(country) &&
        isDefault(property) &&
        isDefault(price) &&
        isDefault(date)
      ) {
        return house;
      }

      // country is not default
      if (
        !isDefault(country) &&
        isDefault(property) &&
        isDefault(price) &&
        isDefault(date)
      ) {
        return house.country === country;
      }

      // property is not default
      if (
        !isDefault(property) &&
        isDefault(country) &&
        isDefault(price) &&
        isDefault(date)
      ) {
        return house.type === property;
      }

      // price is not default
      if (
        !isDefault(price) &&
        isDefault(country) &&
        isDefault(property) &&
        isDefault(date)
      ) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house;
        }
      }

      // date is not default
      if (
        !isDefault(date) &&
        isDefault(country) &&
        isDefault(property) &&
        isDefault(price)
      ) {
        if (date1 >= date2 && date1 <= date3) {
          return house;
        }
      }

      // country and property is not default
      if (
        !isDefault(country) &&
        !isDefault(property) &&
        isDefault(price) &&
        isDefault(date)
      ) {
        return house.country === country && house.type === property;
      }

      // country and price is not default
      if (
        !isDefault(country) &&
        isDefault(property) &&
        !isDefault(price) &&
        isDefault(date)
      ) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.country === country;
        }
      }

      // property and price is not default
      if (
        isDefault(country) &&
        !isDefault(property) &&
        !isDefault(price) &&
        isDefault(date)
      ) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.type === property;
        }
      }

      //country and date is not default
      if (
        !isDefault(country) &&
        isDefault(property) &&
        isDefault(price) &&
        !isDefault(date)
      ) {
        if (date1 >= date2 && date1 <= date3) {
          return house.country === country;
        }
      }

      //property and date is not default
      if (
        isDefault(country) &&
        !isDefault(property) &&
        isDefault(price) &&
        !isDefault(date)
      ) {
        if (date1 >= date2 && date1 <= date3) {
          return house.type === property;
        }
      }

      //price and date is not default
      if (
        isDefault(country) &&
        isDefault(property) &&
        !isDefault(price) &&
        !isDefault(date)
      ) {
        if (
          housePrice >= minPrice &&
          housePrice <= maxPrice &&
          date1 >= date2 &&
          date1 <= date3
        ) {
          return house;
        }
      }

      // country, property and price is not default
      if (
        !isDefault(country) &&
        !isDefault(property) &&
        !isDefault(price) &&
        isDefault(date)
      ) {
        if (housePrice >= minPrice && housePrice <= maxPrice) {
          return house.country === country && house.type === property;
        }
      }

      // country, property and date is not default
      if (
        !isDefault(country) &&
        !isDefault(property) &&
        isDefault(price) &&
        !isDefault(date)
      ) {
        if (date1 >= date2 && date1 <= date3) {
          return house.country === country && house.type === property;
        }
      }

      // country, price and date is not default
      if (
        !isDefault(country) &&
        isDefault(property) &&
        !isDefault(price) &&
        !isDefault(date)
      ) {
        if (
          housePrice >= minPrice &&
          housePrice <= maxPrice &&
          date1 >= date2 &&
          date1 <= date3
        ) {
          return house.country === country;
        }
      }

      // property, price and date is not default
      if (
        isDefault(country) &&
        !isDefault(property) &&
        !isDefault(price) &&
        !isDefault(date)
      ) {
        if (
          housePrice >= minPrice &&
          housePrice <= maxPrice &&
          date1 >= date2 &&
          date1 <= date3
        ) {
          return house.type === property;
        }
      }
    });

    setTimeout(() => {
      return (
        newHouses.length < 1 ? setHouses([]) : setHouses(newHouses),
        setLoading(false)
      );
    }, 1000);
  };

  return (
    <HouseContext.Provider
      value={{
        country,
        setCountry,
        countries,
        property,
        setProperty,
        properties,
        price,
        setPrice,
        date,
        setDate,
        houses,
        loading,
        handleClick,
      }}
    >
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
