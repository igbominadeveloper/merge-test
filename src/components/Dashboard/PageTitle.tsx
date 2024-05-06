export default function PageTitle({ title, className }: { title: string; className?: string }) {
  return <h2 className={`text-xl font-bold md:text-2xl ${className}`}>{title}</h2>;
}
