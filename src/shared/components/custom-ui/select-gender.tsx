import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { TSelectGenderProps } from '@/shared/types/select-gender';
import { useTranslations } from 'next-intl';

export default function SelectGender({ value, onChange }: TSelectGenderProps) {
  const t = useTranslations('auth.auth-register.user-info');
  return (
    <div>
      <label className="inline-block mb-2.5">{t('gender')}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder={t('gender-placeholder')} />
        </SelectTrigger>
        <SelectContent>
          {/* <SelectGroup> */}
          <SelectItem value="Male" key="male">
            {t('male')}
          </SelectItem>
          <SelectItem value="Female" key="female">
            {t('female')}
          </SelectItem>
          {/* </SelectGroup> */}
        </SelectContent>
      </Select>
    </div>
  );
}
