import { useState, useEffect } from "react";
import { ItemModel } from "../AddItem/ItemModel";
import ListItem from "../ListItem/ListItem";

import moment from "moment";

import classes from "./TomorrowsList.module.scss";

interface ReceivingListModel {
  List: ItemModel[];
  delete: (id: string) => void;
}

const TomorrowsList: React.FC<ReceivingListModel> = (props) => {
  const [tomorrow, setTomorrow] = useState<ItemModel[]>([]);

  const tomorrowsDate = new Date(
    moment(new Date().setDate(new Date().getDate() + 1)).format("MMM DD")
  ).getTime();

  useEffect(() => {
    const updatedData = props.List?.filter((item) => {
      const formattedDate = new Date(
        moment(item.selectedDate).format("MMM DD")
      ).getTime();
      return formattedDate === tomorrowsDate;
    });
    setTomorrow(updatedData);
  }, [props.List, tomorrowsDate]);

  return (
    <div>
      <h3 className={classes.heading}>
        {tomorrow.length > 1
          ? `${tomorrow.length} Birthdays Tomorrow`
          : `${tomorrow.length} Birthday Tomorrow`}
      </h3>

      {tomorrow.map((item) => (
        <ListItem
          key={item.id}
          id={item.id}
          name={item.enteredName}
          date={item.selectedDate}
          image={item.enteredImageLink}
          delete={props.delete}
        />
      ))}
    </div>
  );
};

export default TomorrowsList;
