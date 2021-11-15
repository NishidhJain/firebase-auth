import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PasswordIcon from "@mui/icons-material/Password";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const SignUp = () => {
  // const [userInput, setUserInput] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   confirmPass: "",
  // });

  // const handleInputChange = (e) => {
  //   setUserInput({ ...userInput, [e.target.name]: e.target.value });
  // };

  const { signUpInput, handleSignUpInputChange, handleAuthentication } =
    useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("submitted", userInput);
    console.log("submitted signUpInput", signUpInput);
    handleAuthentication("SIGN_UP");
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
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" align="center" component="h1" sx={{ mb: 4 }}>
            Sign Up
          </Typography>
          <TextField
            id="outlined-name"
            name="name"
            label="Name"
            variant="outlined"
            type="text"
            placeholder="John Doe"
            required
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonOutlineIcon />
                </InputAdornment>
              ),
            }}
            onChange={handleSignUpInputChange}
            value={signUpInput.name}
          />
          <TextField
            id="outlined-email"
            name="email"
            label="Email"
            variant="outlined"
            type="email"
            placeholder="john.doe@gmail.com"
            required
            fullWidth
            sx={{ mt: 3 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailOutlineRoundedIcon />
                </InputAdornment>
              ),
            }}
            onChange={handleSignUpInputChange}
            value={signUpInput.email}
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
            onChange={handleSignUpInputChange}
            value={signUpInput.password}
          />
          <TextField
            id="outlined-confirm-password"
            name="confirmPass"
            label="Confirm Password"
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
            onChange={handleSignUpInputChange}
            value={signUpInput.confirmPassword}
          />
          <Button
            variant="contained"
            type="submit"
            size="large"
            endIcon={<ExitToAppIcon />}
            fullWidth
            sx={{ mt: 3 }}
            // onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Typography
            paragraph
            align="center"
            sx={{ mt: 3, mb: 0.5, color: "text.secondary" }}
          >
            Or
          </Typography>
          <Typography paragraph align="center" sx={{ color: "text.secondary" }}>
            Already have an account?{" "}
            <NextLink href="/signin">
              <Link>Sign In</Link>
            </NextLink>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default SignUp;
