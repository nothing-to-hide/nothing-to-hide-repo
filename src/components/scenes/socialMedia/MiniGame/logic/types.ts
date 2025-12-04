export type Position = {
  left: number;
  top: number;
};

export type HiddenObjectData = {
  src: string;
  width: number;
  possiblePositions: Position[];
};

export type PreparedHiddenObject = HiddenObjectData & {
  position: Position;
};

export type ObjectSearchData = {
  backgroundImage: string;
  hiddenObjects: HiddenObjectData[];
  timeForSearch: number;
};

export type PreparedObjectSearch = {
  backgroundImage: string;
  hiddenObjects: PreparedHiddenObject[];
  timeForSearch: number;
};
