import React from "react";
import moment from "moment";

import classes from "./ListItem.module.scss";

interface ListModel {
  id?: string;
  name: string;
  date: number;
  image: string;
  delete: (id: string) => void;
}

const ListItem: React.FC<ListModel> = (props: ListModel) => {
  const relativeDate = moment(props.date).fromNow().split(" ");
  const updatedDateString: string = relativeDate
    .filter((str) => str !== "ago")
    .join(" ");

  return (
    <li className={classes.list}>
      <img
        src={
          props.image
            ? props.image
            : "https://www.kindpng.com/picc/m/22-223965_no-profile-picture-icon-circle-member-icon-png.png"
        }
        alt=""
      />
      <div className={classes.list_content}>
        <h3>{props.name}</h3>
        <p> {updatedDateString}</p>
        <button onClick={props.delete.bind(null, props.id!)}>X</button>
      </div>
    </li>
  );
};

export default ListItem;
