import { Character } from "@appTypes/magus_app_types";

import primStatAst from "@images/primStat_ast.webp"
import primStatBea from "@images/primStat_bea.webp"
import primStatCon from "@images/primStat_con.webp"
import primStatDex from "@images/primStat_dex.webp"
import primStatHea from "@images/primStat_hea.webp"
import primStatInt from "@images/primStat_int.webp"
import primStatLuc from "@images/primStat_luc.webp"
import primStatSpe from "@images/primStat_spe.webp"
import primStatStr from "@images/primStat_str.webp"
import primStatWip from "@images/primStat_wip.webp"
import hmAimIcon from "@images/hm_aim.webp";
import hmDefIcon from "@images/hm_def.webp";
import hmAtkIcon from "@images/hm_atk.webp";
import hmIniIcon from "@images/hm_ini.webp";

import bookCoverFront from "@images/book_cover.png";
import bookCoverBack from "@images/book_backside.png";
import bookPageBg from "@images/bg/book_bg.png";
import bookturnPage from "@images/turn_page.png";
import charSheetItemsFiltered from "@images/char_sheet_items_filtered.png";
import charBagSlot from "@images/character_bag_slot.png";

import pageBgLogin from "@images/bg/login.png";
import pageBgAdventure from "@images/bg/adventures.png";

export const SEO_DATA = {
    DESCRIPTION: {
        CONTENT: "MAGUS app fejlesztés alatt.",
    },
    TITLE: "M.A.G.U.S.",
};

export const UI_THEME = {
  DARK: "dark-theme",
  LIGHT: "light-theme"
}


export const IMGS = {
  CHARACTER: {
    PRIM_STAT: {
      [Character.PRIMARY_STATS.AST]: primStatAst,
      [Character.PRIMARY_STATS.BEA]: primStatBea,
      [Character.PRIMARY_STATS.CON]: primStatCon,
      [Character.PRIMARY_STATS.DEX]: primStatDex,
      [Character.PRIMARY_STATS.HEA]: primStatHea,
      [Character.PRIMARY_STATS.INT]: primStatInt,
      [Character.PRIMARY_STATS.LUC]: primStatLuc,
      [Character.PRIMARY_STATS.SPE]: primStatSpe,
      [Character.PRIMARY_STATS.STR]: primStatStr,
      [Character.PRIMARY_STATS.WIP]: primStatWip
    },
    HM: {
      ATK: hmAtkIcon,
      DEF: hmDefIcon,
      INI: hmIniIcon,
      AIM: hmAimIcon
    },
    ELEMENTS: {
      CHARACTER_INVENTORY: charSheetItemsFiltered,
      BACKPACK_SLOT: charBagSlot
    },
    ITEMS: {}
  },
  APPLICATION: {
    BG: {
      LOGIN: pageBgLogin,
      ADVENTURE: pageBgAdventure,
    },
    ELEMENTS: {
      BOOK_FRONT_COVER: bookCoverFront,
      BOOK_BACK_COVER: bookCoverBack,
      BOOK_PAGE_BG: bookPageBg,
      BOOK_PAGE_TURN: bookturnPage,
    }
  },
};