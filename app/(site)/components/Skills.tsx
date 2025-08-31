import { skills } from '@/data/skills'

export default function Skills() {
  return (
    <div className="card p-6">
      <h3 className="font-semibold mb-4">Skills</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map(s => (<span key={s} className="badge">{s}</span>))}
      </div>
    </div>
  )
}