import React from "react";
import moment from "moment";

interface ListModel {
  id?: string;
  name: string;
  date: number;
  delete: (id: string) => void;
}

const ListItem: React.FC<ListModel> = (props: ListModel) => {
  const relativeDate = moment(props.date).fromNow().split(" ");
  const updatedDateString: string = relativeDate
    .filter((str) => str !== "ago")
    .join(" ");

  return (
    <li>
      <h3>{props.name}</h3>
      <p> {updatedDateString}</p>
      <button onClick={props.delete.bind(null, props.id!)}>X</button>
    </li>
  );
};

export default ListItem;
