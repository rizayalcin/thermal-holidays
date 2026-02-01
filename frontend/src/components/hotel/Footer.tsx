const Footer = () => {
  return (
    <footer className="bg-foreground py-16 text-primary-foreground">
      <div className="content-container">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-serif text-2xl">Thermal Holidays</h3>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-primary-foreground/70">
              Curating exceptional thermal and wellness experiences at the world's 
              most distinguished spa destinations.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="label-subtle mb-4 text-primary-foreground/60">Explore</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Destinations
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Experiences
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Gift Cards
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="label-subtle mb-4 text-primary-foreground/60">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Reservations
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Travel Advisors
                </a>
              </li>
              <li>
                <a href="#" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Press
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-primary-foreground/20 pt-8">
          <p className="text-xs text-primary-foreground/50">
            © 2025 Thermal Holidays. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
