import {
  CheckCircle2,
  Code,
  Compass,
  Cpu,
  LucideIcon,
  Palette,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react"

const icons = {
  search: Search,
  workflow: Workflow,
  palette: Palette,
  code: Code,
  "shield-check": ShieldCheck,
  rocket: Rocket,
  compass: Compass,
  "check-circle-2": CheckCircle2,
  cpu: Cpu,
  sparkles: Sparkles,
} satisfies Record<string, LucideIcon>

export type IconName = keyof typeof icons

export function Icon({ name, className }: { name: string; className?: string }) {
  const IconComponent = icons[name as IconName] ?? Sparkles
  return <IconComponent className={className} />
}
