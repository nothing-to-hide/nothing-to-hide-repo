import { LANGUAGES } from "../../constants/Languages";
import { useSettings } from "../../context/SettingsContext";
import { Language } from "../../translations";
import { useTranslation } from "../../utils/hooks/useTranslation";
import { AudioManager, AudioVolumeType } from "../../utils/managers/AudioManager";
import { Button } from "../common/Controls/Button/Button";
import { Checkbox } from "../common/Controls/Checkbox/Checkbox";
import { IconSelector } from "../common/Controls/IconSelector/IconSelector";
import { Modal } from "../common/Controls/Modal/Modal";
import { Slider } from "../common/Controls/Slider/Slider";

type SettingsDialogProps = {
  handleClose: () => void;
  open: boolean;
  isBlocking?: boolean;
  buttonLabel?: string;
};

export const SettingsDialog = (props: SettingsDialogProps) => {
  const { handleClose, open, isBlocking = false, buttonLabel } = props;
  const { settings, updateSettings } = useSettings();
  const { localize } = useTranslation();

  const handleAudioEnabledChange = (enabled: boolean) => {
    AudioManager.getInstance().setEnabled(enabled);
    updateSettings({ ...settings, audioEnabled: enabled });
  };

  const handleAudioVolumeChange = (value: number, type: AudioVolumeType) => {
    AudioManager.getInstance().setVolume(value, type);
    updateSettings({ ...settings, [type]: value });
  };

  const handleLanguageChange = (key: Language) => {
    updateSettings({ ...settings, language: key });
  };

  return (
    <Modal
      title={localize.general.settings.title}
      onClose={handleClose}
      open={open}
      isBlocking={isBlocking}
    >
      <div className="settings-dialog-content">

        {/* Sound */}
        <Checkbox
          label={localize.general.settings.audioEnabled}
          checked={settings.audioEnabled}
          onChange={handleAudioEnabledChange}
        />
        <div className="settings-audio-row">
          <Slider
            label={localize.general.settings.musicVolume}
            min={0}
            max={1}
            step={0.05}
            onChange={(value) => handleAudioVolumeChange(value, "musicVolume")}
            value={settings.musicVolume}
            disabled={!settings.audioEnabled}
          />
          <Slider
            label={localize.general.settings.soundEffectsVolume}
            min={0}
            max={1}
            step={0.05}
            onChange={(value) => handleAudioVolumeChange(value, "soundEffectsVolume")}
            value={settings.soundEffectsVolume}
            disabled={!settings.audioEnabled}
          />
        </div>

        <hr /> {/* spacer */}

        {/* Language */}
        <IconSelector
          label={localize.general.settings.chooseLanguage}
          icons={Object.values(LANGUAGES).map((l) => ({
            key: l.code,
            svg: l.svg,
          }))}
          selectedKey={settings.language}
          onSelect={(key) => handleLanguageChange(key as unknown as Language)}
        />

        <hr /> {/* spacer */}

        <Button
          label={buttonLabel ? buttonLabel : localize.general.common.back}
          onClick={handleClose}
        />
      </div>
    </Modal>
  );
};
