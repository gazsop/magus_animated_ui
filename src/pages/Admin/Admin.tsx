import { FlexCol, FlexRow } from "../../components/Flex";
import AdventureHandling from "./AdventureHandling";
import UserHandling from "./UserHandling";
import ClassHandling from "./CharacterClassHandling";

function Admin() {
  const className = "flex-wrap justify-center";
  return (
    <FlexCol className={`w-full`}>
      <FlexRow className={className}>
        <UserHandling />
        <AdventureHandling />
      </FlexRow>
      <FlexRow className={className} preventShrink={true}>
        <ClassHandling />
      </FlexRow>
    </FlexCol>
  );
}

export default Admin;
