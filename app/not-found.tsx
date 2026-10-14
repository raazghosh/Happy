export default function NotFound() {
  return (
    <main style={{
      minHeight: "100svh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--color-cream)",
      color: "var(--color-burgundy)",
      textAlign: "center",
      padding: "2rem",
      fontFamily: "Georgia, serif",
    }}>
      <h1 style={{ fontSize: "clamp(2rem,6vw,4rem)", marginBottom: "1rem" }}>Page not found</h1>
      <p style={{ color: "var(--color-text-muted)", marginBottom: "2rem" }}>
        Let me take you back somewhere nicer.
      </p>
      <a href="/" style={{
        display: "inline-flex",
        padding: "0.875rem 2rem",
        background: "linear-gradient(135deg,#581C32,#D96C91)",
        color: "white",
        borderRadius: "40px",
        textDecoration: "none",
        fontWeight: 700,
      }}>
        Back to the surprise ♥
      </a>
    </main>
  );
}
