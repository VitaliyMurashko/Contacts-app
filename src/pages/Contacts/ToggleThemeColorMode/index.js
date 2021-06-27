import React from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import Brightness5Icon from "@material-ui/icons/Brightness5";
import Brightness4Icon from "@material-ui/icons/Brightness4";

const style = {
    borderRadius: 50,
    border: 0,
    margin: '5px', 
  };


export const ToggleThemeColorMode = ({ themeColor, setThemeColor }) => {
  return (
      <ToggleButton
        style = {style}  
        value={ themeColor }
        title= "сменить тему на тёмную/светлую"
        onChange={() => {
          themeColor === "light" ? setThemeColor("dark") : setThemeColor("light");
        }}
      >
        {themeColor === "light" ? <Brightness4Icon /> : <Brightness5Icon />}
      </ToggleButton>
  );
};
