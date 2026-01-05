import { useEffect, useRef, useState } from "react";
import { InputCreate, type TypeUser } from "../context/loginContext";
import "./input.css";
const Login = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const surnameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const login = InputCreate((state) => state.login);
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
  }, [values]);

  return (
    <>
      <div className="continput">
        <div className="boxinput">
          <input
            className="inputs"
            placeholder="Enter your name"
            type="text"
            ref={nameRef}
          />
          <input
            className="inputs"
            placeholder="Enter your surname"
            type="text"
            ref={surnameRef}
          />
          <input
            className="inputs"
            placeholder="Enter your phonenumber"
            type="number"
            ref={phoneRef}
          />
          <button className="inputbtn" onClick={() => submit()}>
            submit
          </button>
        </div>
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
