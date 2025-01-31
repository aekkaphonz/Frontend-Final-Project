import React, { useState, useEffect } from "react";
import { TextField, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchComponent = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      onSearch(searchQuery);
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  return (
    <TextField
      placeholder="ค้นหา..."
      variant="outlined"
      size="small"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      sx={{
        width: "550px",
        padding: "0 10px",
        "& .MuiOutlinedInput-root": {
          borderColor: "#77bfa3",
          paddingRight: "10px",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          borderWidth: "2px",
        },
        "& .MuiInputBase-input": {
          paddingLeft: "15px",
        },
      }}
      InputProps={{
        endAdornment: (
          <IconButton>
            <SearchIcon sx={{ color: "#77bfa3" }} />
          </IconButton>
        ),
      }}
    />
  );
};

export default SearchComponent;