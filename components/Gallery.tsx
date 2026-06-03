import ProjectCard from './ProjectCard';
import projects from '@/data/projects';

export { projects };

export default function Gallery() {
  return (
    <div className="flex flex-wrap gap-6 justify-center">
      {projects.map((p, i) => (
        <ProjectCard key={p.id} {...p} delay={i * 0.05} />
      ))}
    </div>
  );
}
