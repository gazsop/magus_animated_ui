import { useEffect, useRef, useState } from "preact/hooks";
import { FlexCol, FlexRow } from "../../components/Flex";
import {
  HTMLOptionData,
  InputUnq,
  SelectUnq,
} from "../../components/GeneralElements";
import {
  Application,
  User,
  Adventure,
  Character,
} from "@appTypes/shared_types";
import { SingleValue } from "react-select";
import { ButtonUnq } from "../../components/GeneralElements";
import useRequest from "../../hooks/request";
import AdventureHandling from "./AdventureHandling";
import UserHandling from "./UserHandling";
import ClassHandling from "./CharacterClassHandling";

function Admin() {
  const [loading, setLoading] = useState<boolean>(false);

  const className = "flex-wrap";
  return (
    <FlexCol>
      <FlexRow className={className}>
        <UserHandling />
        <AdventureHandling />
      </FlexRow>
      <FlexRow className={className}>
        <ClassHandling />
      </FlexRow>
    </FlexCol>
  );
}

export default Admin;
