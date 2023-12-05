import PropTypes from "prop-types";
import { motion } from "framer-motion";

import Badge from "./Badge.jsx";

function Tab({ isSelected, onSelect, badgeCaption, children }) {
  return (
    <li>
      <button
        className={isSelected ? "selected" : undefined}
        onClick={onSelect}
      >
        {children}
        <Badge key={badgeCaption} caption={badgeCaption}></Badge>
      </button>
      {isSelected && (
        <motion.div layoutId="tab-indicator" className="active-tab-indicator" />
      )}
    </li>
  );
}

export default function ChallengeTabs({
  selectedType,
  onSelectType,
  challenges,
  children,
}) {
  return (
    <>
      <menu id="tabs">
        <Tab
          isSelected={selectedType === "active"}
          onSelect={() => onSelectType("active")}
          badgeCaption={challenges.active.length}
        >
          Active
        </Tab>
        <Tab
          isSelected={selectedType === "completed"}
          onSelect={() => onSelectType("completed")}
          badgeCaption={challenges.completed.length}
        >
          Completed
        </Tab>
        <Tab
          isSelected={selectedType === "failed"}
          onSelect={() => onSelectType("failed")}
          badgeCaption={challenges.failed.length}
        >
          Failed
        </Tab>
      </menu>
      <div>{children}</div>
    </>
  );
}

Tab.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  badgeCaption: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
};

ChallengeTabs.propTypes = {
  selectedType: PropTypes.string.isRequired,
  onSelectType: PropTypes.func.isRequired,
  challenges: PropTypes.shape({
    active: PropTypes.arrayOf(PropTypes.object),
    completed: PropTypes.arrayOf(PropTypes.object),
    failed: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  children: PropTypes.node,
};
