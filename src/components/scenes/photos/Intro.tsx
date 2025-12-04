import { useEffect, useState } from "react";
import { IMAGES } from "../../../constants/Images";
import { PhotosIntroTranslation, ActionOption } from "../../../types/translations/Scenes";
import { useTranslation } from "../../../utils/hooks/useTranslation";

type PhotosIntroProps = {
  onComplete: () => void;
};

type InstaComment = {
  username: string;
  text: string;
  timestamp: string;
};

const comments: InstaComment[] = [
  {
    username: "jonas_K12",
    text: "Bruh 💀",
    timestamp: "2m",
  },
  {
    username: "lara.ti22",
    text: "OMG!!😂",
    timestamp: "8m",
  },
  {
    username: "tim.xbc10",
    text: "hahahaha",
    timestamp: "14m",
  },
];

export const PhotosIntro = ({ onComplete }: PhotosIntroProps) => {
  const [showNotification, setShowNotification] = useState(false);
  const [canContinue, setCanContinue] = useState(false);
  const { localize } = useTranslation();
  const photosIntro = localize.scenes.photos.intro as PhotosIntroTranslation;
  const actionOptions = photosIntro.actions;
  const [maxMessage, setMaxMessage] = useState(photosIntro.initialMessage);
  const [isMessageVisible, setIsMessageVisible] = useState(true);
  const [notificationAnimation, setNotificationAnimation] = useState("");
  const [disabledActions, setDisabledActions] = useState<Set<string>>(new Set());
  const [lastActionId, setLastActionId] = useState<string | null>(null);

  useEffect(() => {
    if (lastActionId) {
      const selectedAction = actionOptions.find((option) => option.id === lastActionId);
      if (selectedAction) {
        setMaxMessage(selectedAction.response);
      }
    } else {
      setMaxMessage(photosIntro.initialMessage);
    }
  }, [actionOptions, lastActionId, photosIntro.initialMessage]);

  const handleActionClick = (action: ActionOption) => {
    setDisabledActions((prev) => new Set(prev).add(action.id));
    setNotificationAnimation("slide-out");

    setTimeout(() => {
      setIsMessageVisible(false);
      setTimeout(() => {
        setMaxMessage(action.response);
        setLastActionId(action.id);
        setIsMessageVisible(true);
        setNotificationAnimation("slide-in");
        if (action.isCorrect) {
          setCanContinue(true);
        }
      }, 100);
    }, 400);
  };

  const handleContinue = () => {
    if (!showNotification) {
      setShowNotification(true);
      setNotificationAnimation("slide-in");
      return;
    }

    if (!canContinue) {
      return;
    }

    onComplete();
  };

  return (
    <div className="scene-intro">
      <div className="chat-room">
        <div className="chat-room-background"></div>
        <div className="chat-frame insta-frame">
          {showNotification && (
            <>
              <div
                className={`notification-banner ${notificationAnimation}`}
                role="status"
                aria-live="assertive"
              >
                <div className="notification-content">
                  <p className="notification-title">{photosIntro.notificationTitle}</p>
                  {isMessageVisible && <p className="notification-text">{maxMessage}</p>}
                </div>
              </div>
              <div
                className="insta-action-overlay"
                role="dialog"
                aria-labelledby="insta-action-title"
              >
                <div className="insta-action-card">
                  <h2 id="insta-action-title">{photosIntro.overlayTitle}</h2>
                  <p>{photosIntro.overlayPrompt}</p>
                  <div className="insta-action-grid">
                    {actionOptions.map((action) => (
                      <button
                        key={action.id}
                        className="insta-action-choice"
                        type="button"
                        onClick={() => handleActionClick(action)}
                        disabled={disabledActions.has(action.id)}
                      >
                        {action.label}
                        {disabledActions.has(action.id) && (
                          <span>{action.isCorrect ? " ✅" : " ❌"}</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
          <header className="insta-header">
            <div className="insta-header-profile">
              <div className="insta-header-avatar">{photosIntro.header.avatarLabel}</div>
              <div>
                <strong>{photosIntro.header.profileName}</strong>
                <span>{photosIntro.header.subtitle}</span>
              </div>
            </div>
            <div className="insta-options">•••</div>
          </header>

          <div className="insta-media">
            <img
              src={IMAGES.photosSceneImages.embarrassingPictureOfMax}
              alt="Embarrassing picture of Max"
            />
          </div>

          <div className="insta-actions">
            <button className="insta-action-button" type="button">
              ❤️ {photosIntro.feedActions.like}
            </button>
            <button className="insta-action-button" type="button">
              💬 {photosIntro.feedActions.chat}
            </button>
            <button className="insta-action-button" type="button">
              🔄 {photosIntro.feedActions.share}
            </button>
          </div>

          <section className="insta-comments" aria-label={photosIntro.commentsLabel}>
            {comments.map(({ username, text, timestamp }) => (
              <article className="insta-comment" key={`${username}-${timestamp}`}>
                <div className="insta-comment-avatar">{username.slice(0, 2).toUpperCase()}</div>
                <div className="insta-comment-content">
                  <div className="insta-comment-header">
                    <span className="insta-comment-username">{username}</span>
                    <span className="insta-comment-time">{timestamp}</span>
                  </div>
                  <p className="insta-comment-text">{text}</p>
                  <div className="insta-comment-actions">
                    <button type="button">Like</button>
                    <button type="button">Reply</button>
                  </div>
                </div>
              </article>
            ))}
          </section>

          <div className="chat-continue">
            <button
              type="button"
              className="button"
              onClick={handleContinue}
              hidden={!canContinue && showNotification}
            >
              {localize.commonGame.playerSetup.continueButton} →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
