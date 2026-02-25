import SettingItem from "./SettingItem";

export default function SettingsSection({ section }: any) {

  const Icon = section.icon;

  return (
    <div className="bg-[#121216] border border-white/5 rounded-2xl overflow-hidden">

      <div className="p-6 border-b border-white/5 flex items-center gap-4">
        <div className="p-2.5 bg-zinc-800 rounded-xl text-zinc-400">
          <Icon className="w-5 h-5"/>
        </div>

        <div>
          <h3 className="text-lg font-semibold">{section.title}</h3>
          <p className="text-sm text-zinc-500">{section.description}</p>
        </div>
      </div>

      <div className="divide-y divide-white/5">
        {section.settings.map((setting: any, i: number) => (
          <SettingItem key={i} setting={setting}/>
        ))}
      </div>

    </div>
  );
}