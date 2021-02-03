import { useState, useEffect } from "react";
import moment from "moment";

import { ItemModel } from "../AddItem/ItemModel";
import ListItem from "../ListItem/ListItem";

import classes from "./TodaysList.module.scss";

interface ReceivingListModel {
  List: ItemModel[];
  delete: (id: string) => void;
}

const TodaysList: React.FC<ReceivingListModel> = (props) => {
  const [today, setToday] = useState<ItemModel[]>([]);

  const todaysDate = new Date(moment(new Date()).format("MMM DD")).getTime();

  useEffect(() => {
    const updatedData = props.List?.filter((item) => {
      const formattedDate = new Date(
        moment(item.selectedDate).format("MMM DD")
      ).getTime();
      return formattedDate === todaysDate;
    });
    setToday(updatedData);
  }, [props.List, todaysDate]);

  return (
    <div>
      <h3 className={classes.heading}>
        {today.length > 1
          ? `${today.length} Birthdays Today`
          : `${today.length} Birthday Today`}
      </h3>

      {today.map((item) => (
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

export default TodaysList;
