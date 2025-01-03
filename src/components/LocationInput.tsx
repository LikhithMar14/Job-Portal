"use client";
import React, { forwardRef, useMemo, useState } from "react";
import { Input } from "./ui/input";
import citiesList from "../../scripts/cities-list";

interface LocationInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  onLocationSelected: (location: string) => void;
}

export default forwardRef<HTMLInputElement, LocationInputProps>(
  function LocationInput({ onLocationSelected, ...props }, ref) {
    const [locationSearchInput, setLocationSearchInput] = useState("");
    const [hasFocus,setFoucs] = useState(false) 
    const cities = useMemo(() => {
      if (!locationSearchInput.trim()) return [];
      const searchedWords = locationSearchInput.split(" ");

      return citiesList
        .map((city) => `${city.name}, ${city.subcountry}, ${city.country}`)
        .filter(
          (city) =>
            city.toLowerCase().startsWith(searchedWords[0].toLowerCase()) &&
            searchedWords.every((word) =>
              city.toLowerCase().includes(word.toLowerCase())
            )
        ).slice(0,7);
    }, [locationSearchInput]);
    return (
        <div className="relative">
          <Input
            placeholder="Search for a city..."
            type="search"
            value={locationSearchInput}
            onChange={(e) => setLocationSearchInput(e.target.value)}
            onFocus={()=>setFoucs(true)}
            onBlur={() => setFoucs(false)}
            {...props}
            ref={ref}
          />
          {locationSearchInput.trim()  && hasFocus && (
            <div className="absolute z-20 w-full divide-y rounded-b-lg border-x border-b bg-background shadow-xl">
              {!cities.length && <p className="p-3">No results found.</p>}
              {cities.map((city) => (
                <button
                  key={city}
                  className="block w-full p-2 text-start"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onLocationSelected(city);
                    setLocationSearchInput("");
                  }}
                >
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>
      );
    },

  
);
