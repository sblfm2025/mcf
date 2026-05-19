export default function Preview() {
  return (
    <main className="workspace">
      <div className="page-heading">
        <p>Preview OBS</p>
        <h1>Semua layar</h1>
      </div>
      <div className="preview-grid">
        <section>
          <span>Main 6:4</span>
          <div className="preview-frame main-frame">
            <iframe title="Preview main" src="/overlay/main" />
          </div>
        </section>
        <section>
          <span>Left 2:3</span>
          <div className="preview-frame side-frame">
            <iframe title="Preview left" src="/overlay/left" />
          </div>
        </section>
        <section>
          <span>Right 2:3</span>
          <div className="preview-frame side-frame">
            <iframe title="Preview right" src="/overlay/right" />
          </div>
        </section>
      </div>
    </main>
  );
}
