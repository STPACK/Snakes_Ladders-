import React from "react";
import Logo from "../../assets/Home-Setting/Logo.svg";
import "./Home.css";

const Home = () => {
  return (
    <div className="home__container">
      <div className="header__container">
        <img src={Logo} alt="" />
        <h4>Welcome !!</h4>
        <h2>Snakes Labs & ladders</h2>
      </div>
      <hr />
      <div className="input__container">
        <div>
          <label htmlFor="" className="form-label">
            row
          </label>
          <input type="number" className="form-control" placeholder="max=7 " />
        </div>
        <div>
          <label htmlFor="" className="form-label">
            column
          </label>
          <input type="number" className="form-control" placeholder="max = 7" />
        </div>
      </div>
      <div className="player__container">
        <label htmlFor="" className="form-label">
          Player (max 4 people)
        </label>
        <div >
          <input type="number" className="form-control" placeholder="max = 7" />
          <button className="btn btn-success">ADD</button>
        </div>
      </div>

      <div className="icon">

      </div>
      <button className="btn btn-primary">Let's Play</button>
    </div>
  );
};

export default Home;
