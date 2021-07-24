curUviEl.classList.add('uv-background low');
if (curUvi <= 2) {
  curUviEl.classList.add('uv-background low');
} else if (curUvi <= 5) {
  curUviEl.classList.add('uv-background moderate');
} else if (curUvi <= 7) {
  curUviEl.classList.add('uv-background high');
} else if (curUvi < 10) {
  curUviEl.classList.add('uv-background very-high');
} else if (curUvi >= 11) {
  curUviEl.classList.add('uv-background extreme');
} else {
  curUviEl.classList.add('uv-background low');
}
