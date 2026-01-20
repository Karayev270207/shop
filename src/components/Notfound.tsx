import { InputCreate } from "../context/loginContext";

const Notfound = () => {
    const users = InputCreate((state) => state.users);
    console.log(users);
    
  return (
    <>
      <div className="boxNotfound">
        <h1>Notfound</h1>
      </div>
    </>
  );
};
export default Notfound;
