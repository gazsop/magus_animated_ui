import { useEffect, useRef, useState } from "preact/hooks";
import { Character } from "@appTypes/shared_types";
import { FlexCol, FlexRow } from "../../components/Flex";
import { InputUnq, SelectUnq } from "../../components/GeneralElements";
import { MutableRefObject } from "preact/compat";

export function SecondaryStatLevelsElement({
  statArray,
  secondaryStatRefs,
}: {
  statArray: Character.TSecondaryStat[];
  secondaryStatRefs: MutableRefObject<Character.TSecondaryStat[]>;
}) {
  //useEffect(() => {
  //  updateStatArray(secondaryStatList);
  //}, [secondaryStatList]);

  const SecondaryStatsElement = ({
    stat,
  }: {
    stat: Character.TSecondaryStat;
  }) => {
    const [selectedStat, setSelectedStat] =
      useState<Character.TSecondaryStat>(stat);

    useEffect(() => {
      const statIndex = secondaryStatRefs.current.findIndex(
        (s) => s.id === selectedStat.id
      );
      if (statIndex !== -1) {
        secondaryStatRefs.current[statIndex] = selectedStat;
      }
    }, [selectedStat]);
    secondaryStatRefs.current.push(selectedStat);

    const statName = stat.name as string;
    return (
      <FlexRow>
        <label className={"grow"}>{statName}</label>
        <SelectUnq
          id={`secondaryStat-${selectedStat.id}`}
          key={`secondaryStat-${selectedStat.id}`}
          label={"lvl"}
          optionData={Object.values(Character.SECONDARY_STAT_LEVEL).map(
            (c) => ({
              value: c,
              label: c,
            })
          )}
          onChange={(e) => {
            if (!e) return;

            setSelectedStat({
              ...selectedStat,
              skillLevel: e.value,
            });
          }}
          value={{
            label: selectedStat.skillLevel,
            value: selectedStat.skillLevel,
          }}
        />
        <InputUnq
          id={`secondaryStat-${selectedStat.id}-1`}
          key={`secondaryStat-${selectedStat.id}-1`}
          label={"xp"}
          type="number"
          value={selectedStat.skill}
          onBlur={(e) => {
            setSelectedStat({
              ...selectedStat,
              skill: parseInt(e.currentTarget.value),
            });
          }}
          widthOverride="w-20"
        />
      </FlexRow>
    );
  };

  return (
    <FlexCol>
      {statArray.map((stat) => (
        <SecondaryStatsElement stat={stat} />
      ))}
    </FlexCol>
  );
}
