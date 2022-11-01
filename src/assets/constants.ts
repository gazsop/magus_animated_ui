import {
  shared_USER,
  shared_EVENTS,
  shared_ROLL,
  shared_PLACEHOLDER,
  shared_MONEY,
  shared_ITEM,
  shared_LISTOF_POST_REQ_TYPES,
  shared_STATES,
  shared_ERROR
} from "../../../shared/magus_app_constants";

//frontend specific constants

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

// routed constants from shared
export const USER = shared_USER;
export const EVENTS = shared_EVENTS;
export const ERROR = shared_ERROR;
export const STATES = shared_STATES;
export const ROLL = shared_ROLL;
export const PLACEHOLDER = shared_PLACEHOLDER;
export const MONEY = shared_MONEY;
export const ITEM = shared_ITEM;
export const LISTOF_POST_REQ_TYPES = shared_LISTOF_POST_REQ_TYPES;
