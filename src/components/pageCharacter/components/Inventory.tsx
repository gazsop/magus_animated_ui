import { Character } from "@/magus_app_types";

export function Inventory(props: { data: Character.Item.TBackpack }) {

    let bagSlotKey = 0;

    function Row() {
      const rowArray: JSX.Element[] = [];
      const Slot = <div className="bag-slot"></div>;
  
      // for (let rowIndex = 0; rowIndex < props.data.row; rowIndex++) {
      //   const colArray = [];
      //   for (let colIndex = 0; colIndex < props.data.col; colIndex++) {
      //     if (bagSlotKey > props.data.slot) break;
      //     colArray.push(Slot);
      //     bagSlotKey++;
      //   }
      //   rowArray.push(<div className="d-flex flex-row">{colArray}</div>);
      // }
  
      return rowArray;
    }
  
    return <div className="bag">{Row()}</div>;
  }