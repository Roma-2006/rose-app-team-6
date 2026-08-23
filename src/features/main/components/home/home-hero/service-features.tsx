import { useTranslations } from 'next-intl';
import { features } from 'process';

export default function ServiceFeatures() {
  const t = useTranslations('home');
  return (
    <div className="rounded-2xl bg-bg-secondary-fade p-6 min-h-36 flex items-center justify-center">
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 w-full items-center justify-items-center">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.id}
              className="flex items-center justify-center gap-4 w-full max-w-xs"
            >
              {/* ICON*/}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-bg-primary-saturated text-text-plain">
                <Icon className="h-10 w-10 text-text-inverse" />
              </div>

              <div className="text-start">
                <h4 className="font-semibold text-text-primary ">{t(feature.title)}</h4>
                <p className="text-sm text-zinc-400 leading-relaxed ">{t(feature.description)}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
