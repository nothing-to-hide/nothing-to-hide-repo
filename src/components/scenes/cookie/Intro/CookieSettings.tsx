import { useState } from "react";
import { Modal } from "../../../common/Controls/Modal/Modal";
import { ToggleSwitch } from "./ToggleSwitch";
import { useTranslation } from "../../../../utils/hooks/useTranslation";
import { Button } from "../../../common/Controls/Button/Button";

type CookieSettingsProps = {
  open?: boolean;
  onComplete: () => void;
};

const ESSENTIAL_KEYS = ["login", "security", "language", "system"] as const;
const NON_ESSENTIAL_KEYS = [
  "tracking",
  "advertising",
  "marketing",
  "thirdParty",
  "social",
  "remarketing",
  "analytics",
] as const;

type EssentialKey = (typeof ESSENTIAL_KEYS)[number];
type NonEssentialKey = (typeof NON_ESSENTIAL_KEYS)[number];

const DEFAULT_COOKIES = {
  login: true,
  security: true,
  language: true,
  system: true,
  tracking: true,
  advertising: true,
  marketing: true,
  thirdParty: true,
  social: true,
  remarketing: true,
  analytics: true,
} satisfies Record<EssentialKey | NonEssentialKey, boolean>;

export function CookieSettings({ open = true, onComplete }: CookieSettingsProps) {
  const { localize } = useTranslation();
  const [cookies, setCookies] = useState(DEFAULT_COOKIES);

  const isReady =
    ESSENTIAL_KEYS.every((key) => cookies[key]) && NON_ESSENTIAL_KEYS.every((key) => !cookies[key]);

  return (
    <Modal open={open} isBlocking title={localize.scenes.cookie.intro.cookies.title}>
      <div className="cookie-settings">
        <p className="cookie-text-intro">{localize.scenes.cookie.intro.cookies.cookieInfo2}</p>
        <div className="cookie-grid">
          <section>
            <h3 className="cookie-essential-title">
              {localize.scenes.cookie.intro.cookies.essentialTitle}
            </h3>
            {ESSENTIAL_KEYS.map((key) => (
              <div className="cookie-row" key={key}>
                <p>{localize.scenes.cookie.intro.cookies.essential[key]}</p>
                <ToggleSwitch
                  checked={cookies[key]}
                  onChange={(value) => setCookies((prev) => ({ ...prev, [key]: value }))}
                />
              </div>
            ))}
          </section>

          <section>
            <h3 className="cookie-essential-title">
              {localize.scenes.cookie.intro.cookies.nonEssentialTitle}
            </h3>
            {NON_ESSENTIAL_KEYS.map((key) => (
              <div className="cookie-row" key={key}>
                <span className="cookie-label">
                  {localize.scenes.cookie.intro.cookies.nonEssential[key]}
                </span>
                <ToggleSwitch
                  checked={cookies[key]}
                  onChange={(value) => setCookies((prev) => ({ ...prev, [key]: value }))}
                />
              </div>
            ))}
          </section>
        </div>
        {!isReady && (
          <p className="cookie-text-intro">{localize.scenes.cookie.intro.cookies.cookieInfo3}</p>
        )}
        {isReady && (
          <div className="cookie-actions">
            <Button
              label={localize.scenes.cookie.intro.cookies.buttonTextContinue}
              onClick={onComplete}
            />
          </div>
        )}
      </div>
    </Modal>
  );
}