import React, { useEffect, useState } from 'react';

import { AsyncExample, ClassExample, FrameExample, HookExample } from './examples/index.js';
import { CustomFrame } from './components/index.js';

const examples = [
  { id: 'async', label: 'Async', title: 'Async component', description: 'Load hCaptcha asynchronously and respond to verification callbacks.', Component: AsyncExample },
  { id: 'class', label: 'Class', title: 'Class component', description: 'Use the ref-based API from a traditional React class component.', Component: ClassExample },
  { id: 'hook', label: 'Hook', title: 'Provider and hook', description: 'Share readiness and execution state with HCaptchaProvider.', Component: HookExample },
];

export function App() {
  const [frame, setFrame] = useState(null);
  const [frameDocument, setFrameDocument] = useState(null);

  useEffect(() => {
    const iframe = document.getElementById('example-frame');
    if (!iframe) return undefined;

    const onLoad = () => {
      setFrame(iframe);
      setFrameDocument(iframe.contentWindow?.document ?? null);
    };

    iframe.addEventListener('load', onLoad);
    if (iframe.contentDocument?.readyState === 'complete') onLoad();
    return () => iframe.removeEventListener('load', onLoad);
  }, []);

  return (
    <main className="page-shell">
      <header className="hero">
        <p className="eyebrow">@hcaptcha/react-hcaptcha</p>
        <h1>React examples that keep verification simple.</h1>
        <p className="hero-copy">Explore practical patterns for adding privacy-focused hCaptcha verification to React forms, from callbacks to provider-based hooks.</p>
        <a className="docs-link" href="https://github.com/hCaptcha/react-hcaptcha" target="_blank" rel="noreferrer">View the library on GitHub <span aria-hidden="true">→</span></a>
      </header>

      <nav className="example-nav" aria-label="Example navigation">
        {examples.map(({ id, label }) => <a key={id} href={`#${id}`}>{label}</a>)}
        <a href="#frame">Iframe</a>
      </nav>

      <section className="example-grid" aria-label="React examples">
        {examples.map(({ id, title, description, Component }) => (
          <article className="example-card" id={id} key={id}>
            <div className="card-heading"><div><p className="card-kicker">Example</p><h2>{title}</h2></div><span className="status-dot" aria-label="Interactive example" /></div>
            <p className="card-description">{description}</p>
            <div className="demo-surface"><Component /></div>
          </article>
        ))}
      </section>

      <section className="example-card frame-card" id="frame">
        <div className="card-heading"><div><p className="card-kicker">Advanced</p><h2>Isolated iframe</h2></div><span className="status-dot" aria-label={frameDocument ? 'Frame ready' : 'Loading frame'} /></div>
        <p className="card-description">Render a captcha in a separate document while preserving the same component API.</p>
        <div className="frame-wrap"><CustomFrame frame={frame}>{frameDocument ? <FrameExample document={frameDocument} /> : <p className="loading">Loading isolated example…</p>}</CustomFrame></div>
      </section>

      <footer>Requires a valid hCaptcha sitekey to complete verification.</footer>
    </main>
  );
}
