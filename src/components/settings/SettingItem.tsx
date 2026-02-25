export default function SettingItem({ setting }: any) {

  return (
    <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-white/1">

      <div>
        <p className="text-sm font-medium">{setting.label}</p>
        <p className="text-xs text-zinc-500 mt-1">{setting.description}</p>
      </div>

      {setting.action}

    </div>
  );
}