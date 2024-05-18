import { IDKitWidget, VerificationLevel } from "@worldcoin/idkit";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const onSuccess = () => {
    console.log("User has successfully verified their identity!");
    navigate("/create-survey");
  };
  const verifyProof = async (proof: any) => {
    console.log(proof);
  };

  return (
    <IDKitWidget
      app_id={APP_ID}
      action={ACTION}
      onSuccess={onSuccess}
      handleVerify={verifyProof}
      verification_level={VerificationLevel.Device}
    >
      {({ open }) => (
        <button onClick={open}>Verify with World ID to vote</button>
      )}
    </IDKitWidget>
  );
};

export default Login;
