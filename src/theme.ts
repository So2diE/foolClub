import {createMuiTheme} from "@material-ui/core/styles"
import {amber, deepOrange} from '@material-ui/core/colors'

export default createMuiTheme({
    typography: {
        useNextVariants: true,

        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system', 'BlinkMacSystemFont', 'sans-serif'
        ].join(','),
        h4: {
            fontSize: '25px',
        },
    },
    overrides: {
        MuiOutlinedInput: {},
        MuiButton: { // Name of the component ⚛️ / style sheet

            extendedFab: { // Name of the rule
                boxShadow: 'none',
            },
        },
    },
    palette: {
        primary: deepOrange,
        secondary: amber,
        background: {
            default: "#fafafa",
            paper: "#f7f7f7",
        },
        error: {
            main: '#d34a34',

        },
        // Used by `getContrastText()` to maximize the contrast between the background and
        // the text.
        contrastThreshold: 3,
        // Used to shift a color's luminance by approximately
        // two indexes within its tonal palette.
        // E.g., shift from Red 500 to Red 300 or Red 700.
        tonalOffset: 0.2,

    },
})

