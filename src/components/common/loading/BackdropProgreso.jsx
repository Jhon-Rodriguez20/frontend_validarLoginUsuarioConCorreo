import { Backdrop, CircularProgress } from "@mui/material";
import PropTypes from "prop-types";

function BackdropProgreso({ abrir }) {
    return (
        <Backdrop open={abrir} sx={{ color: '#fff', zIndex: (theme)=> theme.zIndex.drawer + 1 }}>
            <CircularProgress color="secondary" />
        </Backdrop>
    )
}

BackdropProgreso.propTypes = {
    abrir: PropTypes.bool.isRequired
}

export {BackdropProgreso}