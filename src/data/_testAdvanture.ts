import { IAdventure } from "../types/common";
import { CustomDate } from "../utils/formatDate";

export const testAdventure: IAdventure[] = [
    {
      id: 1,
      name: "teszt1.",
      creationDate: CustomDate.formatDate("2020-02-02 01:02:03"),
      lastUpdate: CustomDate.formatDate("2020-02-02 01:02:03"),
      notes: [
        {
          id: 1,
          date: CustomDate.formatDate("2020-02-02 01:02:03"),
          sendBy: "Csicska",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
          id: 2,
          date: CustomDate.formatDate("2021-03-03 03:04:05"),
          sendBy: "Csicska2",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
      ],
      character: {
        name: "Béla1",
        level: 17,
        race: "Ork",
        class: "Varázsló",
        primaryStats: [
          {
            name: "Erő",
            val: 18,
          },
          {
            name: "Ügyesség",
            val: 18,
          }
        ],
        secondaryStats: [
          {
            name: "Életerő",
            val: 18,
            scaling: [
              {
                lvl: 1,
                newVal: 18,
              },
              {
                lvl: 2,
                newVal: 19,
              }
            ],
          },
          {
            name: "Alkalmasság",
            val: 18,
            scaling: [
              {
                lvl: 1,
                newVal: 18,
              }
            ]
          }
        ]
      },
    },
    {
      id: 2,
      name: "teszt2.",
      creationDate: CustomDate.formatDate("2020-02-02 01:02:03"),
      lastUpdate: CustomDate.formatDate("2020-02-02 01:02:03"),
      notes: [
        {
          id: 21,
          date: CustomDate.formatDate("2011-06-06 08:09:08"),
          sendBy: "Csicska3",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
          id: 22,
          date: CustomDate.formatDate("2010-02-07 01:09:08"),
          sendBy: "Csicska4",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
      ],
      character: {
        name: "Béla2",
        level: 17,
        race: "Ork",
        class: "Varázsló",
        primaryStats: [
          {
            name: "Erő",
            val: 18,
          },
          {
            name: "Ügyesség",
            val: 18,
          }
        ],
        secondaryStats: [
          {
            name: "Életerő",
            val: 18,
            scaling: [
              {
                lvl: 1,
                newVal: 18,
              },
              {
                lvl: 2,
                newVal: 19,
              }
            ],
          },
          {
            name: "Alkalmasság",
            val: 18,
            scaling: [
              {
                lvl: 1,
                newVal: 18,
              }
            ]
          }
        ]
      },
    },
    {
      id: 3,
      name: "Sárkányok vihara",
      creationDate: CustomDate.formatDate("2020-02-02 01:02:03"),
      lastUpdate: CustomDate.formatDate("2020-02-02 01:02:03"),
      notes: [
        {
          id: 31,
          date: CustomDate.formatDate("2011-06-06 08:09:08"),
          sendBy: "Csicska3",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
          id: 32,
          date: CustomDate.formatDate("2010-02-07 01:09:08"),
          sendBy: "Csicska4",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
      ],
      character: {
        name: "Béla3",
        level: 17,
        race: "Ork",
        class: "Varázsló",
        primaryStats: [
          {
            name: "Erő",
            val: 18,
          },
          {
            name: "Ügyesség",
            val: 18,
          }
        ],
        secondaryStats: [
          {
            name: "Életerő",
            val: 18,
            scaling: [
              {
                lvl: 1,
                newVal: 18,
              },
              {
                lvl: 2,
                newVal: 19,
              }
            ],
          },
          {
            name: "Alkalmasság",
            val: 18,
            scaling: [
              {
                lvl: 1,
                newVal: 18,
              }
            ]
          }
        ]
      },
    },
    {
      id: 4,
      name: "Sárkányok vihara2",
      creationDate: CustomDate.formatDate("2020-02-02 01:02:03"),
      lastUpdate: CustomDate.formatDate("2020-02-02 01:02:03"),
      notes: [
        {
          id: 41,
          date: CustomDate.formatDate("2011-06-06 08:09:08"),
          sendBy: "Csicska3",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
        {
          id: 42,
          date: CustomDate.formatDate("2010-02-07 01:09:08"),
          sendBy: "Csicska4",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        },
      ],
      character: {
        name: "Béla4",
        level: 17,
        race: "Ork",
        class: "Varázsló",
        primaryStats: [
          {
            name: "Erő",
            val: 18,
          },
          {
            name: "Ügyesség",
            val: 18,
          }
        ],
        secondaryStats: [
          {
            name: "Életerő",
            val: 18,
            scaling: [
              {
                lvl: 1,
                newVal: 18,
              },
              {
                lvl: 2,
                newVal: 19,
              }
            ],
          },
          {
            name: "Alkalmasság",
            val: 18,
            scaling: [
              {
                lvl: 1,
                newVal: 18,
              }
            ]
          }
        ]
      },
    },
  ];