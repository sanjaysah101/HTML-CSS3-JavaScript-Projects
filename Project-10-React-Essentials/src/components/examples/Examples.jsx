import React, { useState } from "react";
import styles from "./Example.module.css";
import TabButton from "../TabButton";
import { EXAMPLES } from "../../data/data";
import Section from "../Section";
import Tabs from "../Tabs";

function Examples() {
  const [selectedTopic, setSelectedTopic] = useState();

  function handleSelect(selectedButton) {
    setSelectedTopic(selectedButton);
  }

  let tabContent = <p>Please select a topic.</p>;

  if (selectedTopic || selectedTopic === 0) {
    tabContent = (
      <div id="tab-content">
        <h3>{EXAMPLES[selectedTopic].title}</h3>
        <p>{EXAMPLES[selectedTopic].description}</p>
        <pre>
          <code>{EXAMPLES[selectedTopic].code}</code>
        </pre>
      </div>
    );
  }

  const tabs = EXAMPLES.map(({ title }, index) => {
    return (
      <TabButton
        isSelected={selectedTopic === index}
        onSelect={() => handleSelect(index)}
        activeCSS={styles.active}
        key={index}
      >
        {title}
      </TabButton>
    );
  });

  return (
    <Section title={"Examples"} id={styles.examples}>
      <Tabs buttons={tabs}>{tabContent}</Tabs>
    </Section>
  );
}

export default Examples;
