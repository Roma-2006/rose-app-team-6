import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { TSelectGenderProps } from '@/shared/types/select-gender';
import { useTranslations } from 'next-intl';
import { cn } from '@/shared/lib/utils/tailwind-cn';
export default function SelectGender({ value, onChange, disabled }: TSelectGenderProps) {
  const t = useTranslations('auth.auth-register.user-info');
  return (
    <div>
      <label className={cn('inline-block mb-2.5', disabled && 'text-zinc-400')}>
        {t('gender')}
      </label>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger disabled={disabled}>
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
