import { useRef, useState } from "react";
import { ItemModel } from "./ItemModel";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import classes from "./AddItem.module.scss";

interface AddItemModel {
  addItem: (data: ItemModel) => void;
}

const AddItem: React.FC<AddItemModel> = (props: AddItemModel) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLInputElement>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredName = nameRef.current!.value;
    const enteredImageLink = imageRef.current!.value;
    const data = {
      id: Math.random().toString(),
      enteredName,
      selectedDate: selectedDate.getTime(),
      enteredImageLink,
    };

    props.addItem(data);
  };

  return (
    <form onSubmit={submitHandler} className={classes.container}>
      <label htmlFor="inputName">Name:</label>
      <input type="text" id="inputName" ref={nameRef} />
      <label htmlFor="inputDate">Date Of Birth:</label>
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date) => setSelectedDate(date)}
        showMonthDropdown
        showYearDropdown
        maxDate={new Date(new Date())}
        placeholderText="Select Birth Date"
        scrollableYearDropdown
        wrapperClassName={classes.datePicker}
      />
      <label htmlFor="image">Image Link:</label>
      <input type="text" id="image" ref={imageRef} />
      <button type="submit" className={classes.container_btn}>
        Add Reminder
      </button>
    </form>
  );
};

export default AddItem;
