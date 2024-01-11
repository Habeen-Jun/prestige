import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";

import SearchIcon from "@mui/icons-material/Search";
import Box from "@mui/material/Box";

import Header from "../components/Header";
import UserTable from "../components/UserTable";
import {UserCreation} from "../components/UserCreation";
import { supabase } from "../hooks/supabase";

const AdminUser = () => {
    const [users, setUsers] = useState([])
    const [viewingUsers, setViewingUsers] = useState([])
    const [search, setSearch] = useState("");

    const getUserData = async() => {
        const { data, error } = await supabase.from('users').select()
        console.log(data);
        setUsers(data)
        setViewingUsers(data)
    }

    const handleSearch = async (e) => {
        setSearch(e.target.value);
        if (e.target.value.length < 1) {
            setViewingUsers(users);
        } else {
            const filteredUsers = users.filter((user) =>
            user.name.toLowerCase().includes(search.toLowerCase())
            );
            setViewingUsers(filteredUsers);
        }
    };

    useEffect(()=>{
        getUserData()
    }, [])

  return (
    <Box sx={{ flexGrow: 1, height: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Header name={"User Management"}/>
        <Buttons>
            <UserCreation getUserData={getUserData}/>
        </Buttons>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          boxShadow: "0px 0px 10px 0px lightgrey",
          height: "90%",
          borderRadius: "1rem",
        }}
      >
        <TopBar>
          <SearchBar>
            <SearchIcon className="search-icon" />
            <input
              className="search-input"
              type="text"
              value={search}
              placeholder={`Search for users`}
              onChange={(e) => handleSearch(e)}
            ></input>
          </SearchBar>
        </TopBar>
        <Content>
          <UserTable users={viewingUsers} getUserData={getUserData}/>
        </Content>
      </Box>
    </Box>
  );
};

const Content = styled(Box)(({ theme }) => ({
  height: "90%",
  backgroundColor: "white",
  padding: "0rem 1rem 1rem 1rem",
  borderRadius: "0 0 1rem 1rem",
}));

const TopBar = styled(Box)(({ theme }) => ({
  borderRadius: "1rem 1rem 0 0",
  display: "flex",
  justifyContent: "space-between",
  borderBottom: "1px solid lightgrey",
  padding: "1rem",
  backgroundColor: "white",
  height: "10%",
}));

const SearchBar = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  ".search-icon": {
    color: "#737a80",
    fontSize: "1.5rem",
  },
  ".search-input": {
    marginLeft: "0.6rem",
    fontSize: "1rem",
    border: "none",
    outline: "none",
  },
}));

const Buttons = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.5rem",
}));

const Label = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  bottom: "60%",
  ".label-icon": {
    fontSize: "5rem",
  },
}));

export default AdminUser;