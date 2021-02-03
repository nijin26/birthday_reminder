import React from "react";
import { ItemModel } from "./components/AddItem/ItemModel";
import AddItem from "./components/AddItem/AddItem";
import TodaysList from "./components/TodaysList/TodaysList";
import TomorrowsList from "./components/TomorrowsList/TomorrowsList";

import classes from "./App.module.scss";
import cx from "classnames";

const App: React.FC = () => {
  const [datas, setData] = React.useState<ItemModel[]>([]);
  const [tab, setTab] = React.useState<boolean>(true);

  React.useEffect(() => {
    const localData = localStorage.getItem("dataList");
    if (localData) {
      setData((prevState) => [...prevState, ...JSON.parse(localData)]);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("dataList", JSON.stringify(datas));
  });

  const addItemHandler = (data: ItemModel) => {
    setData((prevState) => [...prevState, data]);
  };

  const deleteItemHandler = (id: string) => {
    setData((prevState) => prevState.filter((item) => item.id !== id));
  };

  return (
    <div className={classes.container}>
      <h2>Birthday Reminder</h2>
      <AddItem addItem={addItemHandler} />
      <div className={classes.container_tab}>
        <TodaysList List={datas} delete={deleteItemHandler} />
        <hr />
        <TomorrowsList List={datas} delete={deleteItemHandler} />
      </div>
    </div>
  );
};

export default App;
