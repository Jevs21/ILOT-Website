import { Box, InputLabel, MenuItem, Select, TextField, Typography } from "@suid/material";
import { createMemo, createSignal, For } from "solid-js";
import { useGlobalContext } from "../global/store";
import TextFieldClearBtn from "./TextFieldClearBtn";

const SearchableUserSelect = (props) => {
  const {userList} = useGlobalContext();
  
  const [isOpen, setIsOpen] = createSignal(false);

  const [query, setQuery] = createSignal("");
  const onChange = (e) => {
    setQuery((e.target as HTMLInputElement).value);
  }

  // const filteredUserList = createMemo(() => {
  //   console.log(userList())
  //   if (query().length === 0) return [];
  //   return userList().filter((u) => u.full_name.toLowerCase().includes(query().toLowerCase()));   
  // })

  const isVisible = (user) => {
    if (query().length < 3) return true;
    return user.full_name.toLowerCase().includes(query().toLowerCase());
  } 

  const userListVisible = createMemo(() => {
    return userList().filter((u) => isVisible(u));
  });
  const userListInvisible = createMemo(() => {
    return userList().filter((u) => !isVisible(u));
  });

  const selectChanged = (e) => {
    console.log(e.target.value);
    setIsOpen(false)
    props.onChange(e.target.value);
  }
  
  const handleMenuKeyDown = (e) => {
    // If key is alphanumeric, set focus to search field
    if (e.key.match(/^[a-z0-9]$/i)) {
      e.preventDefault();
      const searchField = document.getElementById('user_search_field');
      if (searchField) searchField.focus();
      setQuery(query() + e.key);
    }
    // If key is backspace, delete last character from search field
    else if(e.key === 'Backspace') {
      e.preventDefault();
      setQuery(query().slice(0, -1));
    }
    // If key is enter, select first user in list
    else if(e.key === 'Enter') {
      e.preventDefault();
      if (userListVisible().length > 0) {
        selectChanged({target: {value: userListVisible()[0].uuid}});
      }
      setIsOpen(false);
    }
  }
  return (
    <>
      <InputLabel for="user_select">Assigned User</InputLabel>
      <Select
        labelId="user_select"
        value={props.value}
        variant="standard"
        open={isOpen()}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        // onkeydown={(e) => e.preventDefault()}
        // onkeyup={(e) => e.preventDefault()}
        onChange={(e) => selectChanged(e)}
        // onKeyPress={(e) => e.preventDefault()}
        placeholder="Assigned User"
        fullWidth
        MenuProps={{ onKeyDown: handleMenuKeyDown, PaperProps: {style: {"max-height": "300px"}}}}>
        <MenuItem value="">No User</MenuItem>
        <Box paddingX={2} paddingTop={1} paddingBottom={2}>
          <TextField
            id="user_search_field"
            value={query()}
            onChange={onChange}
            label="Search Users"
            autoComplete="off"
            variant="standard"
            fullWidth
            InputProps={{
              endAdornment: (
                <TextFieldClearBtn show={query()} onClick={() => setQuery("")}/>
              )
            }}/>
            
        </Box>
        
        <For each={userListVisible()}>{(user) =>
          <MenuItem value={user.uuid}>
            <Typography fontSize="1em">{user.full_name}</Typography>
          </MenuItem>
        }</For>
        <For each={userListInvisible()}>{(user) =>
          <MenuItem value={user.uuid} sx={{display: 'none'}}>
            <Typography fontSize="1em">{user.full_name}</Typography>
          </MenuItem>
        }</For>
      </Select>
    </>
  );
}

export default SearchableUserSelect;