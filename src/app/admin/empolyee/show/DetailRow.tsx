export const DetailRow = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
}) => (
  <div className="flex items-start gap-3 rounded-lg border p-4 dark:border-white/10">
    {icon && <div className="mt-1 text-brand-500">{icon}</div>}
    <div>
      <div className="text-xs font-medium text-gray-500 dark:text-white/70">
        {label}
      </div>
      <div className="text-sm font-semibold text-gray-800 dark:text-white">
        {value}
      </div>
    </div>
  </div>
);