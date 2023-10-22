import React from "react";
import { Col, InputGroup, Row } from "react-bootstrap";
import { Id } from "../../../utils/getId";
import { Character } from "@appTypes/magus_app_types";

export const secondaryStats: Character.ISecondaryStat[] = [
	{
		name: "Álcázás/Álruhaviselés",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: 50,
	},
	{
		name: "Alkímia",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Állatismeret",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Belharc",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Birkózás",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Célzás",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Csapda és titkosajtó keresés",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Csapdaállítás",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Csomózás",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Demonológia",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Drágakőmágia",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Élettan",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Emberismeret",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Éneklés/Zenélés",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Építészet",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Erdőjárás",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Értékbecslés",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Esés",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Etikett",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Fegyverdobás",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Fegyverhasználat",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Fegyverismeret",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Fegyvertörés",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Festészet,Rajzolás",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Földharc",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Futás",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Hadrend",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Hadvezetés",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Hajózás",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Hamisítás",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Hamiskártyázás",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Hangutánzás",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Harc helyhez kötve",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Harci láz",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Hárítás",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Hasbeszélés",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Hátbatámadás(Orvtámadás)",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Helyismeret",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Heraldika",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Herbalizmus",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Idomítás",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Időjóslás",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Ikerharc",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Írás/Olvasás",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Jogismeret",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Kétkezes harc",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Kétkezes harc - Shien-Su",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Kiegészítő támadás, különleges fegyver",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Kínokozás",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Kocsihajtás",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Kocsmai Verekedés",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Kötelekből szabadulás",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Kötéltánc",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Lábharc",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Lefegyvezés",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Legendaismeret",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Lopózás",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Lovaglás",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Lovas íjászat",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Mágiahasználat",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Mágiaismeret",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Mászás",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Mechanika",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Mellébeszélés",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Méregkeverés/Semlegesítés",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Nehézvért viselet",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Nyelvismeret",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Nyomolvasás/Eltüntetés",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Ökölharc",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Ősi nyelv ismerete",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Pajzs használat",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Pszi",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Pusztítás",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Rejtőzés",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Rúnamágia",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Sebgyógyítás",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Semlegesítés/Működtetés",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Szájról olvasás",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Szakma",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Szexuális kultúra",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Tánc",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Térképészet",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Történelemismeret",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Ugrás/Akrobatika",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Úszás",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Vadászat/Halászat",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Vakharc",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Vallásismeret",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Zárnyitás",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Zsebmetszés",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
	{
		name: "Zsonglőrködés",
		level: Character.SECONDARY_STAT_LEVEL.BASIC,
		skill: Math.floor(Math.random() * 100),
	},
];
