// app/login/page.tsx
"use client";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Avatar,
  CssBaseline
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

const validationSchema = Yup.object({
  username: Yup.string().required('El nombre de usuario es requerido'),
  password: Yup.string().required('La contraseña es requerida'),
});

// Creación de un tema personalizado para la página
const theme = createTheme();

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  // --- PEGA EL ENLACE DE TU IMAGEN AQUÍ ---
  const imageUrl = "https://images.pexels.com/photos/669619/pexels-photo-669619.jpeg";

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        if (values.username === 'admin' && values.password === '123') {
          login('mock-token-123');
          router.push('/');
        } else {
          setErrors({ api: 'Credenciales inválidas' });
        }
      } catch (error) {
        console.error('Error de autenticación:', error);
        setErrors({ api: 'Error al intentar iniciar sesión' });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          // Establece la imagen de fondo
          backgroundImage: `url(${imageUrl})`,
          // Asegura que la imagen cubra todo el espacio
          backgroundSize: 'cover',
          // Centra la imagen
          backgroundPosition: 'center',
          // Fija la altura mínima a la de la pantalla
          minHeight: '100vh',
          // Usa flexbox para centrar el contenido
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CssBaseline />
        <Container component="main" maxWidth="xs">
          <Paper elevation={12} sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            // Efecto de vidrio esmerilado (opcional, pero se ve genial)
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
          }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Inicio de Sesión
            </Typography>
            <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3, width: '100%' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Usuario"
                name="username"
                autoComplete="username"
                autoFocus
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.username && Boolean(formik.errors.username)}
                helperText={formik.touched.username && formik.errors.username}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? 'Iniciando...' : 'Iniciar Sesión'}
              </Button>
              {formik.errors.api && (
                <Alert severity="error" sx={{ width: '100%', mt: 2 }}>
                  {formik.errors.api}
                </Alert>
              )}
            </Box>
          </Paper>
        </Container>
      </Box>
    </ThemeProvider>
  );
}