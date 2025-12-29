import { useEffect, useRef, useState } from "react";
import { useLogin, type TypeState, type TypeUser } from "../context/loginContext";

const Login = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const surnameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const { login } = useLogin() as TypeState;
  const [values, setValues] = useState<TypeUser | null>(null);
  const submit = () => {
    setValues({
      name: nameRef.current?.value || "",
      surname: surnameRef.current?.value || "",
      phone: phoneRef.current?.value || "",
    });
  };
  useEffect(() => {
    if (values?.name && values?.surname && values?.phone) {
      login(values);
    }
  }, [login, values]);

  return (
    <>
      <div className="box">
        <input placeholder="Enter your name" type="text" ref={nameRef} />
        <input placeholder="Enter your surname" type="text" ref={surnameRef} />
        <input
          placeholder="Enter your phonenumber"
          type="number"
          ref={phoneRef}
        />
        <button
          onClick={() => submit()}
        >
          submit
        </button>
      </div>
      <div style={{ width: 120, height: 120 }} className="box2">
        <div style={{ fontSize: "30px" }}>{values?.name}</div>
        <div style={{ fontSize: "30px" }}>{values?.surname}</div>
        <div style={{ fontSize: "30px" }}>{values?.phone}</div>
      </div>
    </>
  );
};
export default Login;