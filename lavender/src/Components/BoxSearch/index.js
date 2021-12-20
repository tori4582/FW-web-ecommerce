import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import * as productApi from "../apis/product";
import LoadingContainer from "../../Common/helper/loading/LoadingContainer";
import Item from "./Item";

export default function Index(props) {
  const [timkiem, setTimkiem] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [list, setList] = useState([]);
  const ref = useRef(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowSearch(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const hanldeSearch = async (timkiem) => {
    setLoading(true);
    await productApi
      .timkiem6Sanpham(timkiem)
      .then((success) => {
        if (success.status === 200) {
          setList(success.data.value.$values);
          console.log(success.data.value)
        }
      })
      .catch((error) => {
        console.error(error);
      });
    setLoading(false);
  };
  return (
    <form
      id="form-box-search"
      className="box-main__form-search position-relative"
      autoComplete="off"
      ref={ref}
    >
      <LoadingContainer loading={loading}></LoadingContainer>
      <div className="box-search">
        <div className="cps-group-input">
          <div className="input-group-btn">
            <i class="bi bi-search"></i>
          </div>
          <input
            type="text"
            name="q"
            id="search"
            className="cps-input cta-search"
            placeholder="Bạn cần tìm gì?"
            maxLength={128}
            autoComplete="off"
            value={timkiem}
            onChange={(e) => {
              setTimkiem(e.target.value);
              if (e.target.value === "") {
                setShowSearch(false);
              } else {
                setShowSearch(true);
                hanldeSearch(e.target.value);
              }
            }}
          />
          <div className="close-group-btn">
            <i
              class="fas fa-times"
              onClick={() => {
                setShowSearch(false);
                setTimkiem("");
              }}
            ></i>
          </div>
        </div>
      </div>

      {showSearch && (
        <div
          id="search_autocomplete"
          className="box-search-result search-autocomplete box-shadow"
        >
        
          <ul className="search_suggest_data">
          <li style={{display: 'block', height:"30px"}} className="selected" />
            {list.map((value, key) => {
              return <Item product={value} key={key}></Item>;
            })}
          </ul>
        </div>
      )}
    </form>
  );
}
