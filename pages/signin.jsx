import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import PasswordIcon from "@mui/icons-material/Password";
import LoginIcon from "@mui/icons-material/Login";

const signin = () => {
  return (
    <Container fixed>
      <Box>
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          type="email"
          placeholder="john.doe@gmail.com"
          required
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailOutlineRoundedIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          placeholder="*******"
          required
          fullWidth
          margin="dense"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PasswordIcon />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="outlined"
          type="submit"
          size="large"
          endIcon={<LoginIcon />}
          fullWidth
        >
          Sign In
        </Button>
      </Box>
    </Container>
  );
};

export default signin;
