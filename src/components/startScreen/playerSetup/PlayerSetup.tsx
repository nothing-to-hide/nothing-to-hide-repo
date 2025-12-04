import React, { useState } from "react";
import { useTranslation } from "../../../utils/hooks/useTranslation";
import { TextInput } from "../../common/Controls/Text/Text";
import { IconSelector } from "../../common/Controls/IconSelector/IconSelector";
import { Button } from "../../common/Controls/Button/Button";
import { IMAGES } from "../../../constants/Images";
import { Modal } from "../../common/Controls/Modal/Modal";
import { AVATAR } from "../../../constants/Game";

const PLAYER_NAME_MAX_LENGTH = 20;
const usernameRegex = /^[a-zA-Z0-9]+$/;

export type SetupInfo = {
  playerName: string;
  avatar: AVATAR;
};

export type ErrorInfo = {
  errorPlayerName: string;
  errorAvatar: string;
};

type PlayerSetupProps = {
  onSetupComplete: () => void;
  setupInfo: SetupInfo;
  setSetupInfo: (setupInfo: SetupInfo) => void;
};

export const PlayerSetup = (props: PlayerSetupProps) => {
  const { onSetupComplete, setupInfo, setSetupInfo } = props;
  const { localize } = useTranslation();
  const localizedPlayerSetup = localize.commonGame.playerSetup;

  const [localPlayerName, setLocalPlayerName] = useState(setupInfo.playerName);
  const [localAvatar, setLocalAvatar] = useState(setupInfo.avatar);
  const [error, setError] = useState<Partial<ErrorInfo>>({});

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalPlayerName(value);

    const trimmed = value.trim();

    if (!trimmed) {
      setError((prev) => ({ ...prev, playerName: localizedPlayerSetup.errorUsername }));
    } else if (!usernameRegex.test(trimmed)) {
      setError((prev) => ({ ...prev, playerName: localizedPlayerSetup.errorUsernameInvalid }));
    } else {
      setError((prev) => ({ ...prev, playerName: undefined }));
    }
  };

  const handleAvatarSelect = (avatarPath: AVATAR) => {
    setLocalAvatar(avatarPath);
    if (error.errorAvatar) setError({ ...error, errorAvatar:""  });
  };

  const handleSubmit = () => {
    const trimmedName = localPlayerName.trim();

    const errors = {
      errorPlayerName: !trimmedName
        ? localizedPlayerSetup.errorUsername
        : !usernameRegex.test(trimmedName)
          ? localizedPlayerSetup.errorUsernameInvalid
          : undefined,
      errorAvatar: localAvatar == AVATAR.UNDEFINED ? localizedPlayerSetup.errorAvatar: undefined,
    };

    setError(errors);

    if (!errors.errorPlayerName && !errors.errorAvatar) {
      setSetupInfo({
        playerName: trimmedName,
        avatar: localAvatar,
      });
      onSetupComplete();
    }
  };

  return (
    <Modal
      open={true}
      isBlocking={true}
      title={`${localizedPlayerSetup.welcomeTo} ${localizedPlayerSetup.title}`}
    >
      <>
        <span>{localizedPlayerSetup.description}</span>

        <TextInput
          label={localizedPlayerSetup.usernameLabel}
          value={localPlayerName}
          onChange={handleUsernameChange}
          maxLength={PLAYER_NAME_MAX_LENGTH}
          placeholder={localizedPlayerSetup.usernamePlaceholder}
          errorMessage={error.errorPlayerName}
        />

        <IconSelector
          label={localizedPlayerSetup.avatarLabel}
          icons={Object.values(AVATAR).filter((a): a is AVATAR => a !== AVATAR.UNDEFINED && typeof a !== 'string').map((a) => ({
            key: a as unknown as string,
            path: IMAGES.getAvatar(a) || "",
          }))}
          selectedKey={localAvatar as unknown as string}
          onSelect={handleAvatarSelect as unknown as (key: string) => void}
          iconSize={70}
          errorMessage={error.errorAvatar}
        />

        <Button style={{width: '50%'}} label={localize.commonGame.startScreen.startGame} onClick={handleSubmit} />
      </>
    </Modal>
  );
};
