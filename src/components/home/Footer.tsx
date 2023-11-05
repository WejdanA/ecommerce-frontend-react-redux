export const Footer = () => {
  return (
    <>
      <footer id="footer" className="footer">
        <section id="important-links" className="important-links">
          <h2 className="links-heading">Important Links</h2>
          <ul className="links-menue" role="menu">
            <li role="presentation">
              <a href="#" role="menuitem">
                Our Blog
              </a>
            </li>
            <li role="presentation">
              <a href="#" role="menuitem">
                Join The Team
              </a>
            </li>
            <li role="presentation">
              <a href="#" role="menuitem">
                Resources
              </a>
            </li>
          </ul>
        </section>

        <section id="contact-us" className="contact-us">
          <h2 className="links-heading">Contact Us</h2>
          <ul className="links-menue" role="menu">
            <li role="presentation">
              <a href="#" role="menuitem" aria-describedby="contact via phone">
                923-476-387
              </a>
            </li>
            <li role="presentation">
              <a
                href="mailto:someone@example.com"
                role="menuitem"
                aria-describedby="contact via email">
                someone@example.com
              </a>
            </li>
          </ul>
        </section>

        <section id="social-links" className="social-links">
          <h2 className="social-heading">Find Us ON</h2>
          <ul className="social-menue" role="menu">
            <li role="presentation">
              <a href="#" className="footer-link" role="menuitem" aria-label="instagram link">
                <i className="fab fa-instagram-square socialmedia-icon" aria-hidden="true"></i>
              </a>
            </li>

            <li role="presentation">
              <a href="#" className="footer-link" role="menuitem" aria-label="twitter link">
                <i className="fab fa-twitter-square socialmedia-icon" aria-hidden="true"></i>
              </a>
            </li>

            <li role="presentation">
              <a href="#" className="footer-link" role="menuitem" aria-label="facebook link">
                <i className="fab fa-facebook-square socialmedia-icon" aria-hidden="true"></i>
              </a>
            </li>
          </ul>
        </section>
      </footer>
    </>
  )
}
