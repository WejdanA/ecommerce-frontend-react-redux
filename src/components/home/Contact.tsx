export const Contact = () => {
  return (
    <section id="newsletter-container" className="newsletter-container">
      <div className="newsletter-text">
        <h3 className="newsletter-heading">
          Subscribe Our News Letter to learn more about digital marketing.
        </h3>
        <p className="sub-heading">
          tips about creating successful campaigns, measure performance and more
        </p>
      </div>
      <form id="news-form" className="news-form" action="">
        <label id="label" className="label" htmlFor="email">
          Enter your email
        </label>
        <input type="email" id="email" className="email" />
        <input type="submit" value="Subscribe" id="news-form-button" className="news-form-button" />
      </form>
    </section>
  )
}
