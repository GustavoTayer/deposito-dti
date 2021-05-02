import { unstable_createMuiStrictModeTheme as createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00959F",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: ["ui-serif", "sans-serif", "arial"],
    h5: {
      color: "#00959F",
      fontWeight: "bold"
    },
    subtitle2: {
      color: "#00959F",
      fontWeight: "bold",
      fontSize: "1.05rem",
    }
  },
  overrides: {
    MuiTableCell: {
      head: {
        fontWeight: "bold",
      },
    },
  },
});

export default theme;
