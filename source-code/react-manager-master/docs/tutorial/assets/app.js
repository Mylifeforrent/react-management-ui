const chapters = window.TUTORIAL_CHAPTERS || []
const nav = document.querySelector('#chapterNav')
const content = document.querySelector('#chapterContent')
const searchInput = document.querySelector('#searchInput')

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, char => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }
    return entities[char]
  })
}

function getActiveId() {
  return location.hash.replace('#', '') || chapters[0]?.id
}

function renderNav(filter = '') {
  const keyword = filter.trim().toLowerCase()
  const activeId = getActiveId()
  const visibleChapters = chapters.filter(item => {
    const haystack = `${item.chapter} ${item.title} ${item.summary} ${item.sources.join(' ')}`.toLowerCase()
    return haystack.includes(keyword)
  })

  if (!visibleChapters.length) {
    nav.innerHTML = '<div class="empty">没有匹配的章节</div>'
    return
  }

  nav.innerHTML = visibleChapters
    .map(
      item => `
        <button class="nav-item ${item.id === activeId ? 'active' : ''}" data-id="${item.id}">
          <strong>${item.chapter} ${item.title}</strong>
          <small>${item.goals[0]}</small>
        </button>
      `
    )
    .join('')
}

function renderChapter(id = getActiveId()) {
  const chapter = chapters.find(item => item.id === id) || chapters[0]
  if (!chapter) {
    content.innerHTML = '<section class="chapter-card">暂无章节内容</section>'
    return
  }
  document.title = `${chapter.chapter} - ${chapter.title}`
  content.innerHTML = `
    <section class="chapter-card">
      <span class="eyebrow">${chapter.chapter}</span>
      <h2>${chapter.title}</h2>
      <p>${chapter.summary}</p>
      <div class="meta-grid">
        <div class="meta-box">
          <strong>学习目标</strong>
          ${chapter.goals.map(goal => `<span>${goal}</span>`).join('')}
        </div>
        <div class="meta-box">
          <strong>参考资料</strong>
          ${chapter.sources.map(source => `<span>${source}</span>`).join('')}
        </div>
        <div class="meta-box">
          <strong>章节实验</strong>
          <a class="demo-link" href="${chapter.demo}">打开 demo</a>
        </div>
      </div>
    </section>

    <section class="lesson-section">
      <h3>由浅入深</h3>
      <div class="section-grid">
        ${chapter.steps
          .map(
            step => `
              <article class="step-card">
                <b>${step[0]}</b>
                <p>${step[1]}</p>
              </article>
            `
          )
          .join('')}
      </div>
    </section>

    <section class="lesson-section">
      <h3>项目源码对照</h3>
      <div class="code-grid">
        ${chapter.refs
          .map(
            ref => `
              <article class="code-card">
                <strong>${ref[0]}</strong>
                <code>${ref[0]}${ref[1]}</code>
                <p>${ref[2]}</p>
              </article>
            `
          )
          .join('')}
      </div>
    </section>

    <section class="lesson-section">
      <h3>关键代码片段</h3>
      <div class="code-card">
        <pre><code>${escapeHtml(chapter.snippet)}</code></pre>
      </div>
    </section>

    <section class="practice-card">
      <h3>练习与验收</h3>
      <ul>
        ${chapter.practice.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </section>
  `
  renderNav(searchInput.value)
}

nav.addEventListener('click', event => {
  const button = event.target.closest('button[data-id]')
  if (!button) return
  location.hash = button.dataset.id
})

searchInput.addEventListener('input', event => {
  renderNav(event.target.value)
})

window.addEventListener('hashchange', () => {
  renderChapter(getActiveId())
})

renderNav()
renderChapter()
