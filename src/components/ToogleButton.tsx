function ToggleButton({ selected, onClick }: { selected: number, onClick: Function }) {

  const _onClick = () => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <div className="toogleButton" onClick={_onClick}>
      <div className="onglet">Aujourd'hui</div>
      <div className="onglet">Demain</div>
      <div className={`selectedLine ${(selected !== 2) ? '' : 'right'}`}></div>
    </div>
  );
}

export default ToggleButton;