import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import PasswordIcon from "@mui/icons-material/Password";
import LoginIcon from "@mui/icons-material/Login";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useState } from "react";

const signin = () => {
  const [userInput, setUserInput] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted", userInput);
  };

  return (
    <Container
      fixed
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "400px",
          border: 1,
          borderRadius: 2,
          borderColor: "text.disabled",
          px: 3,
          py: 5,
        }}
      >
        <Typography variant="h4" align="center" component="h1" sx={{ mb: 4 }}>
          Sign In
        </Typography>
        <TextField
          id="outlined-email"
          name="email"
          label="Email"
          variant="outlined"
          type="email"
          placeholder="john.doe@gmail.com"
          required
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailOutlineRoundedIcon />
              </InputAdornment>
            ),
          }}
          onChange={handleInputChange}
          value={userInput.email}
        />
        <TextField
          id="outlined-password"
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          placeholder="*******"
          required
          fullWidth
          sx={{ mt: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PasswordIcon />
              </InputAdornment>
            ),
          }}
          onChange={handleInputChange}
          value={userInput.password}
        />
        <Button
          variant="outlined"
          type="submit"
          size="large"
          endIcon={<LoginIcon />}
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleSubmit}
        >
          Sign In
        </Button>
        <Typography
          paragraph
          align="center"
          sx={{ mt: 3, mb: 0.5, color: "text.secondary" }}
        >
          Or
        </Typography>
        <Typography paragraph align="center" sx={{ color: "text.secondary" }}>
          Don't have an account? <Link href="/signup">Sign Up</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default signin;
