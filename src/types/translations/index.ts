import { CommonGameTranslation } from "./CommonGame";
import { GeneralTranslation } from "./General";
import { SceneTranslations } from "./Scenes";

export interface ITranslation {
  general: GeneralTranslation;
  commonGame: CommonGameTranslation;
  scenes: SceneTranslations;
}
