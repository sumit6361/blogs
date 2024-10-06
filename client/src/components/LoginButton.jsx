import { GoogleLogin } from "react-google-login";
import axios from "axios";
import { clientId } from "../main";
import { useAuth } from "../useAuth";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router for navigation

export const LoginButton = ({ buttonText }) => {
  const navigate = useNavigate();
  const { handleSetLogin, isLoggedIn } = useAuth();

  const loginWithGoogleAuth = async (res) => {
    try {
      const { data } = await axios.post(
        `http://localhost:4000/api/v1/auth/googleAuth`,
        {
          email: res.profileObj.email,
          googleId: res.profileObj.googleId,
        }
      );

      handleSetLogin(data.token);
      navigate("/");
    } catch (error) {}
  };

  return (
    <div className="w-full">
      <GoogleLogin
        className="w-full text-center flex justify-center"
        clientId={clientId}
        buttonText={buttonText}
        onSuccess={loginWithGoogleAuth}
        onFailure={(err) => {
          console.log("err: ", err);
        }}
        cookiePolicy="single_host_origin"
        isSignedIn={isLoggedIn}
      />
    </div>
  );
};
