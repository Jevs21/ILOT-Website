
const palette = {
  primary: "#FF0000",
  accent: "#FFD2D2",
  black: "#1C1B1F",
  white: "#FFFFFF",
  bg: "#F3F3F3",
  red: "#DB1717",
  transBg: "rgba(243, 243, 243, 0.8)",
  // grey: [
  //   "",
  //   "#CAC4D0",
  //   "#323435",
  //   "#202126"
  // ],
  grey: [
    "#CAC4D0",
    "#777B7E",
    "#4F5254",
    "#323435",
    "#202126"
  ],
  status: [
    // { backgroundColor: "#FF0000", textColor: "#FFFFFF" },
    { backgroundColor: "#FF3333", textColor: "#FFFFFF" },
    { backgroundColor: "#F57E00", textColor: "#000000" },
    { backgroundColor: "#FEBC14", textColor: "#000000" },
    { backgroundColor: "#FEF21C", textColor: "#000000" },
    { backgroundColor: "#45DA66", textColor: "#000000" },
    { backgroundColor: "#115520", textColor: "#FFFFFF" },
    // { backgroundColor: "#1CFC4D", textColor: "#000000" },
  ]
}

const appbar = {
  backgroundColor: palette.grey[4],
  height: '80px',
  width: '100%',
  display: 'flex',
}

const sidebar = {
  width: '180px',
  backgroundColor: palette.grey[4],
  top: 80, // appbar height
  left: 0,
  bottom: 0,
}

const style = {
  palette: palette,
  card: {
    width: '100%',
    borderRadius: '9px'
  },
  tr: {
    
  },
  trhead: {
    background: "#FFFFFF"
  },
  trheadcol: {
    paddingX: 1,
    paddingY: 2,
    '&:hover': {
      'background': '#E3E3E3',
      'cursor': 'pointer'
    },
  },
  treven: {
    'background': "#FCFCFC",
    '&:hover': {
      'background': '#E3E3E3',
      'cursor': 'pointer'
    },
  },
  trodd: {
    'background': "#FFFFFF",
    '&:hover': {
      'background': '#E3E3E3',
      'cursor': 'pointer'
    },
  },
  appbar: appbar,
  sidebar: sidebar,
  sidebar_item: {
    backgroundColor: palette.grey[4],
    '&:hover': {
      backgroundColor: palette.grey[2],
      cursor: 'pointer'
    },
    '&:hover .sidebar_item_text': {
      // color: palette.accent,
      cursor: 'pointer'
    },
  },
  sidebar_item_selected: {
    backgroundColor: palette.grey[3],
    '&:hover': {
      backgroundColor: palette.grey[2],
      cursor: 'pointer'
    },
    '& .sidebar_item_text': {
      color: palette.accent,
    },
  },
  sidebar_item_selected_indicator: {
    // color: palette.accent,
    // position: 'absolute',
    // // '&::before': {
    //   content: '',
    //   top: '50%',
    //   left: -10,
    //   transform: 'translateY(-50%)',
    //   width: 10,
    //   height: 10,
    //   borderRadius: '50%',
    // // }
    // 'content': '""',
    // 'position': 'absolute',
    // 'top': '50%',
    'left': '-22px',
    // 'transform': 'translateY(-50%)',
    'width': '12px',
    'height': '13px',
    'border-radius': '50%',
    'background-color': palette.accent,
  },
  view_header: {
    height: '70px'
  }
}

export default style
