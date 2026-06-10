import type { ReactNode } from 'react'

export interface ConceptCard {
  title: string
  body: string
}

export interface CodeReference {
  label: string
  path: string
  lines: string
  note: string
}

export interface ChapterLesson {
  chapter: string
  title: string
  subtitle: string
  from: string[]
  goals: string[]
  concepts: ConceptCard[]
  basic: ReactNode
  advanced: ReactNode
  project: ReactNode
  references: CodeReference[]
  exercise: string
  checklist: string[]
}

interface ChapterShellProps {
  lesson: ChapterLesson
}

export default function ChapterShell({ lesson }: ChapterShellProps) {
  return (
    <main className='chapter-demo'>
      <aside className='chapter-rail'>
        <span className='eyebrow'>{lesson.chapter}</span>
        <h1>{lesson.title}</h1>
        <p>{lesson.subtitle}</p>
        <div className='source-list'>
          <strong>参考资料</strong>
          {lesson.from.map(item => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </aside>

      <section className='chapter-body'>
        <section className='panel'>
          <h2>学习目标</h2>
          <ul className='goal-grid'>
            {lesson.goals.map(goal => (
              <li key={goal}>{goal}</li>
            ))}
          </ul>
        </section>

        <section className='panel'>
          <h2>原理递进</h2>
          <div className='concept-grid'>
            {lesson.concepts.map(concept => (
              <article key={concept.title} className='concept-card'>
                <h3>{concept.title}</h3>
                <p>{concept.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className='demo-grid'>
          <article className='panel demo-panel'>
            <span>01 基础概念</span>
            {lesson.basic}
          </article>
          <article className='panel demo-panel'>
            <span>02 进阶交互</span>
            {lesson.advanced}
          </article>
          <article className='panel demo-panel'>
            <span>03 项目对照</span>
            {lesson.project}
          </article>
        </section>

        <section className='panel'>
          <h2>项目源码对照</h2>
          <div className='reference-list'>
            {lesson.references.map(reference => (
              <article key={reference.path}>
                <strong>{reference.label}</strong>
                <code>
                  {reference.path}
                  {reference.lines}
                </code>
                <p>{reference.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className='panel practice'>
          <h2>练习与验收</h2>
          <p>{lesson.exercise}</p>
          <div className='checklist'>
            {lesson.checklist.map(item => (
              <label key={item}>
                <input type='checkbox' />
                {item}
              </label>
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}
