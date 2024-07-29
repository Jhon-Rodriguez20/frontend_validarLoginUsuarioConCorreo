import { TextField, Box, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function CrearUsuarioForm({ errores, onChange, initialValues }) {
    const [nombre, setNombre] = useState(initialValues.nombre || "");
    const [email, setEmail] = useState(initialValues.email || "");
    const [password, setPassword] = useState(initialValues.password || "");
    const [passwordMensaje, setPasswordMensaje] = useState("");
    const [passwordColor, setPasswordMensajeColor] = useState("");

    useEffect(() => {
        setNombre(initialValues.nombre || "");
        setEmail(initialValues.email || "");
        setPassword(initialValues.password || "");
    }, [initialValues]);

    const validarPassword = (password) => {
        const passwordContenido = /^(?=.*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*]).{8,}$/;        
        return passwordContenido.test(password);
    }

    const handlePasswordCambiarColorLetra = (event) => {
        const nuevaPassword = event.target.value;
        setPassword(nuevaPassword);

        if (validarPassword(nuevaPassword)) {
            setPasswordMensaje("Contraseña segura.");
            setPasswordMensajeColor("green");
        } else {
            setPasswordMensaje("Contraseña insegura. Debe tener al menos 8 caracteres, una letra mayúscula, dos números y un carácter especial (*, $, &, #).");
            setPasswordMensajeColor("red");
        }

        onChange({
            nombre,
            email,
            password: nuevaPassword
        });
    }

    const handleChange = (setter) => (event) => {
        setter(event.target.value);
        onChange({
            nombre: event.target.name === "nombre" ? event.target.value : nombre,
            email: event.target.name === "email" ? event.target.value : email,
            password: event.target.name === "password" ? event.target.value : password
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
                        onChange={handleChange(setNombre)}
                        error={!!errores.nombre}
                        helperText={errores.nombre}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <TextField
                        fullWidth
                        variant="standard"
                        type="email"
                        label="Correo electrónico"
                        name="email"
                        value={email}
                        onChange={handleChange(setEmail)}
                        error={!!errores.email}
                        helperText={errores.email}
                        required
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <TextField
                        fullWidth
                        variant="standard"
                        type="password"
                        label="Contraseña"
                        name="password"
                        value={password}
                        onChange={handlePasswordCambiarColorLetra}
                        error={!!errores.password}
                        helperText={errores.password}
                        required
                    />
                    <Typography variant="body2" style={{ color: passwordColor }}>
                        {passwordMensaje}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

CrearUsuarioForm.propTypes = {
    errores: PropTypes.shape({
        nombre: PropTypes.string,
        email: PropTypes.string,
        password: PropTypes.string
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    initialValues: PropTypes.shape({
        nombre: PropTypes.string,
        email: PropTypes.string,
        password: PropTypes.string
    }).isRequired,
}

export { CrearUsuarioForm }