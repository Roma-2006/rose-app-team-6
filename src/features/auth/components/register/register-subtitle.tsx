import { useTranslations } from 'next-intl';
import Stepper from '../../../../shared/components/custom-ui/stepper';
import { RegisterSubtitleProps } from '../../types/register';
export default function RegisterSubtitle(props: RegisterSubtitleProps) {
  const t = useTranslations('auth.auth-register');
  return (
    <>
      <Stepper currentStep={props.currentStep} />
      <div className="mb-6 pb-4 border-b border-border-muted mt-9">
        <h1 className="text-3xl pb-4 font-bold text-text-plain">{t(props.title)}</h1>
        <h2 className="text-xl pb-4 font-semibold text-text-primary">{t(props.subTitle)}</h2>
        <p className="text-base text-text-plain">{t(props.registerSubTitle)}</p>
      </div>
    </>
  );
}
