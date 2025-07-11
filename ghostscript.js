// ghostscript.js

(function () {
  // Add CSS rule to hide all <ghost> tags
  const style = document.createElement('style');
  style.textContent = 'ghost { display: none !important; }';
  document.head.appendChild(style);

  function parseGhostScript(ghostSource) {
    let ghostCode = ghostSource.replace(/#(\w+)/g, (_, v) => v);

    ghostCode = ghostCode.replace(/out\((.*?)\)/g, 'console.log($1)');

    ghostCode = ghostCode.replace(/err\((.*?)\)/g, 'console.error($1)');

    const lines = ghostCode.split('\n').map(line => line.trimEnd());
    const controlKeywords = ['if', 'else if', 'else', 'for', 'while', 'switch', 'event'];

    let outputLines = [];
    let inBlock = false;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim();

      // Detect and start control block
      if (!inBlock) {
        const matchedControl = controlKeywords.some(kw => {
          const regex = new RegExp(`^${kw}(\\s|\\()`);
          return regex.test(line);
        });

        if (matchedControl) {
          outputLines.push(line + ' {');
          inBlock = true;
          continue;
        }
      }

      outputLines.push(line);

      // End block on semicolon
      if (inBlock && line.endsWith(';')) {
        outputLines.push('}');
        inBlock = false;
      }
    }

    // If still inside a block, close it
    if (inBlock) outputLines.push('}');

    return outputLines.join('\n');
  }

  function runGhostTags() {
    const blocks = document.querySelectorAll('ghost');

    blocks.forEach(block => {
      const isExternal = block.hasAttribute('src');
      const runCode = code => {
        const parsed = parseGhostScript(code);
        try {
          eval(parsed);
        } catch (e) {
          console.error('GhostScript runtime error:', e);
        }
        // NO removal here, so the element stays but is hidden by CSS
      };

      if (isExternal) {
        const src = block.getAttribute('src');
        fetch(src)
          .then(res => res.text())
          .then(runCode)
          .catch(err => {
            console.error(`GhostScript failed to load "${src}":`, err);
            // no removal
          });
      } else {
        runCode(block.textContent);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runGhostTags);
  } else {
    runGhostTags();
  }
})();
window.runGhostTags = runGhostTags;