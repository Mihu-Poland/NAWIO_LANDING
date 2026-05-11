"use client";

/**
 * Wyświetla link do ponownego otwarcia ustawień cookies.
 *
 * @author Mihu
 */
export default function CookieSettingsLink() {
  /**
   * Otwiera baner cookies i umożliwia zmianę decyzji.
   */
  const handleOpenCookieSettings = () => {
    window.dispatchEvent(new Event("nawio:open-cookie-settings"));
  };

  return (
    <button
      type="button"
      onClick={handleOpenCookieSettings}
      className="block text-[#bcc6d8] hover:text-white"
    >
      Ustawienia cookies
    </button>
  );
}
