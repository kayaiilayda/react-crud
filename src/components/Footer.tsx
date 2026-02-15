const Footer = () => {
  return (
    <footer className="bg-secondary mt-auto py-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-text-muted text-sm">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-primary font-semibold">İlayFlix</span> - Dizi &
          Film Günlüğü
        </p>
      </div>
    </footer>
  );
};

export default Footer;
