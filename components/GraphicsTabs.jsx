import { useState } from "react";
import Charts from "./Chart";
import styles from "./Chart.module.css";
import { Fade } from "react-reveal";

export default function GraphicsTabs({ data, params }) {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const [toggleContainerState, setToggleContainer] = useState(0);

  const toggleContainer = (index) => {
    setToggleContainer(index);
    console.log(index);
  };
  let button;
  if (toggleContainerState === 0) {
    button = (
      <button className={styles.tabSwitch} onClick={() => toggleContainer(1)}>
        Show Figures
      </button>
    );
  } else {
    button = (
      <button className={styles.tabSwitch} onClick={() => toggleContainer(0)}>
        Hide Figures
      </button>
    );
  }
  return (
    <>
      <Fade collapse big when={toggleContainerState === 1} duration={300}>
        <div className={toggleContainerState === 1 ? `${styles.container}` : `${styles.inactive}`}>
          <div className="graphicsTabs">
            <button className={toggleState === 1 ? styles.activeTab : styles.tabs} onClick={() => toggleTab(1)}>
              Figure 1
            </button>
            <button className={toggleState === 2 ? styles.activeTab : styles.tabs} onClick={() => toggleTab(2)}>
              Figure 2
            </button>
            <button className={toggleState === 3 ? styles.activeTab : styles.tabs} onClick={() => toggleTab(3)}>
              Figure 3
            </button>
          </div>
          <Charts data={data} params={params} state={toggleState} />
        </div>
      </Fade>
      {button}
    </>
  );
}
