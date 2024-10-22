import CommonForm from "@/components/common/form";
import { registerFormControls } from "@/config";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function Register() {
  const [formData, setFormData] = useState(initialState);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/login");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6 p-4 bg-gray-800 rounded-md shadow-lg sm:p-6 text-gray-300">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-100">
          Create new account
        </h1>
        <Link
          className="mt-2 font-medium ml-2 text-blue-400 hover:text-blue-300 underline"
          to="/auth/login"
        >
          Already have an account?
        </Link>
      </div>
      <CommonForm
        formControls={registerFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default Register;

