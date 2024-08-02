import { Box, Grid, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import CorreoFormulario from "../forms/CorreoFormulario";
import ContrasenaFormulario from "../forms/ContrasenaFormulario";

function CrearUsuarioForm({ errores, onChange, initialValues }) {
    const [nombre, setNombre] = useState(initialValues.nombre || "");
    const [email, setEmail] = useState(initialValues.email || "");
    const [password, setPassword] = useState(initialValues.password || "");

    useEffect(() => {
        setNombre(initialValues.nombre || "");
        setEmail(initialValues.email || "");
        setPassword(initialValues.password || "");
    }, [initialValues]);

    const handleChange = (setter, fieldName) => (event) => {
        const value = event.target.value;
        setter(value);
        onChange({
            nombre: fieldName === "nombre" ? value : nombre,
            email: fieldName === "email" ? value : email,
            password: fieldName === "password" ? value : password,
        });
    };

    return (
        <Box mt={4}>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <TextField
                        fullWidth
                        variant="standard"
                        type="text"
                        label="Nombre"
                        name="nombre"
                        value={nombre}
                        onChange={handleChange(setNombre, "nombre")}
                        error={!!errores.nombre}
                        helperText={errores.nombre}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <CorreoFormulario
                        email={email}
                        onChange={(email) => {
                            setEmail(email);
                            onChange({ nombre, email, password });
                        }}
                        error={errores.email}
                        helperText={errores.email}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <ContrasenaFormulario
                        password={password}
                        onChange={(value) => {
                            setPassword(value);
                            onChange({ nombre, email, password: value });
                        }}
                        error={errores.password}
                        helperText={errores.password}
                        label="Contraseña"
                    />
                </Grid>
            </Grid>
        </Box>
    );
}

CrearUsuarioForm.propTypes = {
    errores: PropTypes.shape({
        nombre: PropTypes.string,
        email: PropTypes.string,
        password: PropTypes.string,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    initialValues: PropTypes.shape({
        nombre: PropTypes.string,
        email: PropTypes.string,
        password: PropTypes.string,
    }).isRequired,
};

export { CrearUsuarioForm }