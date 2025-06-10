"use client"

import Header from "./components/Header";
import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';


export default function Home() {

  const [resultsText, setResultsText] = useState("Loading...");
  let [searchText, setSearchText] = useState("");

  function onSearchTextChange(event : ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setSearchText(value);
  }

  useEffect(() => {
    const fetchTitle = setTimeout(
      async () => {
        let currentSearchText = "";
        if(searchText.trim() !== "" || currentSearchText !== searchText){
          currentSearchText = searchText;
            try{
              const res = await axios.get("https://api.open5e.com/monsters/?document__slug__in=wotc-srd&search=" + searchText);
              console.log("https://api.open5e.com/monsters/?search=" + searchText);
              console.log(res.data);
              const resultsArray = res.data.results;
              let text = ""
              resultsArray.forEach((instance : Object) => {
                if(instance.name.toLowerCase().includes(searchText.toLowerCase())){
                  text += instance.name + "\n";
                }
            });
            
            setResultsText(text);
          } catch (err){
            console.log(err);
            setResultsText("Error");
          }
        }
        
      }, 1000
    )

    return () => clearTimeout(fetchTitle);
  }, [searchText])

  

  return (
    <div>
      <Header />

      <input type="text" name="searchBar" id="searchBar" placeholder="Type a monster's name here!" value={searchText} onChange={onSearchTextChange}/>
      <p style={{ whiteSpace: "pre"}}>{resultsText}</p>
    </div>
  );
}
