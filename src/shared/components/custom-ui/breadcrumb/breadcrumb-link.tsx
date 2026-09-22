// Lib
import { useRender } from '@base-ui/react/use-render';
import { mergeProps } from '@base-ui/react/merge-props';
import { cn } from '@/shared/lib/utils/tailwind-cn';

function BreadcrumbLink({ className, render, ...props }: useRender.ComponentProps<'a'>) {
  return useRender({
    defaultTagName: 'a',
    props: mergeProps<'a'>(
      {
        className: cn('transition-colors hover:text-foreground', className),
      },
      props
    ),
    render,
    state: {
      slot: 'breadcrumb-link',
    },
  });
}

export { BreadcrumbLink };
