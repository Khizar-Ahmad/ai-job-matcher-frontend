interface SkillTagProps {
  label: string;
  variant?: 'default' | 'volt' | 'match' | 'missing';
}

const variantClass: Record<string, string> = {
  default: 'tag',
  volt: 'tag-volt',
  match: 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono bg-emerald-400/10 border border-emerald-400/30 text-emerald-400',
  missing: 'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono bg-red-400/10 border border-red-400/30 text-red-400',
};

export const SkillTag = ({ label, variant = 'default' }: SkillTagProps) => (
  <span className={variantClass[variant]}>{label}</span>
);
