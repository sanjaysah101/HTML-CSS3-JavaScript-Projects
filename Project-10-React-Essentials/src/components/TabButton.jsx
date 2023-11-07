export default function TabButton({
  children,
  onSelect,
  isSelected,
  activeCSS,
}) {
  return (
    <li>
      <button className={isSelected && activeCSS} onClick={onSelect}>
        {children}
      </button>
    </li>
  );
}
