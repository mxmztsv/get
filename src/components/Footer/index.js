export const Footer = () => {
  return (
    <>
      <div className="footer-container">
        <div
          className="footer-elem"
          onClick={() => {
            window.open(
              "mailto:support@getstake.io",
              "_blank",
              "noopener,noreferrer"
            );
          }}
        >
          Support E-Mail:
          <div className="footer-link">support@getstake.io</div>
        </div>
        <div
          className="footer-elem"
          onClick={() => {
            window.open(
              "https://t.me/GetCustomerSupport",
              "_blank",
              "noopener,noreferrer"
            );
          }}
        >
          Support Telegram:
          <div className="footer-link">@GetCustomerSupport</div>
        </div>
      </div>
    </>
  );
};
