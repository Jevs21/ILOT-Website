import { Chip, Stack, Typography } from "@suid/material";
import StackRowCentered from "../../elements/StackRowCentered";
import { useGlobalContext } from "../../global/store";
import style from "../../global/style";

const DesktopSidebarOption = (props) => {
  const {lotName, apiCall} = useGlobalContext();
  return (
    <StackRowCentered 
      height={style.view_header.height} 
      // sx={{backgroundColor: style.palette.grey[2]}} 
      justifyContent='center'>
      <Stack spacing={1}>
        <Typography fontSize="1em" color={style.palette.white}>{lotName()}</Typography>
        <StackRowCentered justifyContent="center">
          <Chip  
            // icon={<Circle sx={{fontSize: "0.7em"}}/>}
            size="small"
            label="2 ONLINE" 
            color='success'
            sx={{
              fontSize: '0.7em',
              backgroundColor: style.palette.status[4].backgroundColor,
              color: style.palette.status[4].textColor,
              padding: 1
            }}/>
        </StackRowCentered>
      </Stack>
    </StackRowCentered>
  )
}

export default DesktopSidebarOption;