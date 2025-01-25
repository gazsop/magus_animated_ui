import { FlexCol, FlexRow } from "../../components/Flex";

function NewCharacter() {
  return (
    <FlexCol
      className={`p-1 grow relative nowrap overflow-x-hidden overflow-y-auto w-full`}
    >
      <FlexRow
        className={`relative overflow-x-hidden overflow-y-auto w-full h-[300px] space-x-1`}
      >
        <FlexRow className={`grow justify-around fancy-container items-center`}>
          <button className={`p-2`}>Elf</button>
          <button className={`p-2`}>Dwarf</button>
          <button className={`p-2`}>Human</button>
        </FlexRow>
        <FlexRow
          className={`basis-1/2 justify-around fancy-container items-center`}
        >
          <button className={`p-2`}>Harcos</button>
          <button className={`p-2`}>Mágus</button>
          <button className={`p-2`}>Tolvaj</button>
        </FlexRow>
      </FlexRow>

      <FlexRow
        className={`relative overflow-x-hidden overflow-y-auto w-full grow`}
      >
        <FlexCol
          className={`p-1 grow relative nowrap overflow-x-hidden overflow-y-auto fancy-container my-1 mx-0.5`}
        >
          <label>Faji bónusz</label>
          <hr className={`fancy`} />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec
            pur{" "}
          </p>
        </FlexCol>
        <FlexCol
          className={`p-1 grow relative nowrap overflow-x-hidden overflow-y-auto fancy-container my-1 mx-0.5`}
        >
          <label>Klassz Bónuszok</label>
          <hr className={`fancy`} />
        </FlexCol>
        <FlexCol
          className={`p-1 grow relative nowrap overflow-x-hidden overflow-y-auto fancy-container my-1 mx-0.5`}
        >
          <label>Professions</label>
          <hr className={`fancy`} />
        </FlexCol>
        <FlexCol
          className={`p-1 grow relative nowrap overflow-x-hidden overflow-y-auto fancy-container my-1 mx-0.5`}
        >
          <label>Spells</label>
          <hr className={`fancy`} />
        </FlexCol>
      </FlexRow>
    </FlexCol>
  );
}

export default NewCharacter;
