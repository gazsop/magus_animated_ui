import { JSX } from "preact/jsx-runtime";
import { FlexCol, FlexRow } from "../../components/Flex";
import CharBagIcon from "../../components/icons/magus/CharBagIcon";
import CharSecStatIcon from "../../components/icons/magus/CharSecStatIcon";
import ClassBardIcon from "../../components/icons/magus/ClassBardIcon";
import ClassDruidIcon from "../../components/icons/magus/ClassDruidIcon";
import ClassFireMageIcon from "../../components/icons/magus/ClassFireMageIcon";
import ClassGladiatorIcon from "../../components/icons/magus/ClassGladiatorIcon";
import ClassHunterIcon from "../../components/icons/magus/ClassHunterIcon";
import ClassMageIcon from "../../components/icons/magus/ClassMageIcon";
import ClassMartialArtistIcon from "../../components/icons/magus/ClassMartialArtist";
import ClassPaladinIcon from "../../components/icons/magus/ClassPaladinIcon";
import ClassPriestIcon from "../../components/icons/magus/ClassPriestIcon";
import ClassRogueIcon from "../../components/icons/magus/ClassRogueIcon";
import ClassShamanIcon from "../../components/icons/magus/ClassShamanIcon";
import ClassWarlockIcon from "../../components/icons/magus/ClassWarlockIcon";
import ClassWarriorIcon from "../../components/icons/magus/ClassWarriorIcon";
import ClassWitchIcon from "../../components/icons/magus/ClassWitchIcon";
import DescentDwarfIcon from "../../components/icons/magus/DescentDwarfIcon";
import DescentElfIcon from "../../components/icons/magus/DescentElfIcon";
import DescentHalfElfIcon from "../../components/icons/magus/DescentHalfElfIcon";
import DescentHumanIcon from "../../components/icons/magus/DescentHumanIcon";
import DescentOrcIcon from "../../components/icons/magus/DescentOrcIcon";
import ClassKnightIcon from "../../components/icons/magus/ClassKnight";

function NewCharacter() {
  const FancyRow = ({ icon, text }: { icon: JSX.Element; text: string }) => (
    <FlexRow className="fancy-container p-1 items-center cursor-pointer justify-center">
      {icon}
      <p className={`pl-5 w-[130px]`}>{text}</p>
    </FlexRow>
  );
  return (
    <FlexCol
      className={`p-1 grow relative nowrap overflow-x-hidden w-full`}
      preventShrink={false}
    >
      <FlexRow className={`relative overflow-hidden w-full shrink-0 gap-1`}>
        <FlexCol
          className={`grow justify-stretch fancy-container items-stretch overflow-x-hidden overflow-y-auto h-[300px] p-1 321`}
          preventShrink={false}
        >
          <FancyRow
            icon={<DescentDwarfIcon className="w-[45px]" />}
            text="Törpe"
          />
          <FancyRow icon={<DescentElfIcon className="w-[45px]" />} text="Elf" />
          <FancyRow
            icon={<DescentHalfElfIcon className="w-[45px]" />}
            text="Félelf"
          />
          <FancyRow
            icon={<DescentHumanIcon className="w-[45px]" />}
            text="Ember"
          />
          <FancyRow
            icon={<DescentOrcIcon className="w-[45px]" />}
            text="Udvari ork"
          />
        </FlexCol>
        <FlexCol
          //className={`basis-1/2 h-[300px]  justify-around fancy-container items-center`}
          className={`basis-1/2 grow justify-stretch fancy-container items-stretch overflow-x-hidden overflow-y-auto h-[300px] p-1`}
        >
          <FancyRow icon={<ClassBardIcon className="w-[45px]" />} text="Bárd" />
          <FancyRow
            icon={<ClassDruidIcon className="w-[45px]" />}
            text="Druid"
          />
          <FancyRow
            icon={<ClassFireMageIcon className="w-[45px]" />}
            text="Tűzvarázsló"
          />
          <FancyRow
            icon={<ClassGladiatorIcon className="w-[45px]" />}
            text="Gladiátor"
          />
          <FancyRow
            icon={<ClassHunterIcon className="w-[45px]" />}
            text="Vadász"
          />
          <FancyRow
            icon={<ClassKnightIcon className="w-[45px]" />}
            text="Lovag"
          />
          <FancyRow
            icon={<ClassMageIcon className="w-[45px]" />}
            text="Varázsló"
          />
          <FancyRow
            icon={<ClassMartialArtistIcon className="w-[45px]" />}
            text="Harcművész"
          />
          <FancyRow
            icon={<ClassPaladinIcon className="w-[45px]" />}
            text="Paplovag"
          />
          <FancyRow
            icon={<ClassPriestIcon className="w-[45px]" />}
            text="Pap"
          />
          <FancyRow
            icon={<ClassRogueIcon className="w-[45px]" />}
            text="Tolvaj"
          />
          <FancyRow
            icon={<ClassShamanIcon className="w-[45px]" />}
            text="Sámán"
          />
          <FancyRow
            icon={<ClassWarlockIcon className="w-[45px]" />}
            text="Boszorkánymester"
          />
          <FancyRow
            icon={<ClassWarriorIcon className="w-[45px]" />}
            text="Harcos"
          />
          <FancyRow
            icon={<ClassWitchIcon className="w-[45px]" />}
            text="Boszorkány"
          />
        </FlexCol>
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
