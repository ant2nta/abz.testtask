import React from "react";
import "./UserInfo.scss"
import defaultPhoto from "../../images/photo-cover.svg";

const UserInfo = ({ user }) => {
  const {
    name,
    position,
    email,
    phone,
    photo,
  } = user;

  return (
    <div className="user body-text">
      <img
        src={photo ? photo : defaultPhoto}
        alt="user's photography"
        className="user__photo"
        width="70"
        height="70"
      />

      <p className="user__name" title={name}>
        {name}
      </p>

      <div className="user__info">
        <p title={position}>
          {position}
        </p>

        <p title={email}>
          {email}
        </p>

        <p title={phone}>
          {phone}
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
