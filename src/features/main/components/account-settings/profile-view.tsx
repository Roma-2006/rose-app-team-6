'use client';

import { Button } from '@/shared/components/ui/button';

export default function ProfileView() {
  return (
    <form>
      <div></div>
      <footer className="flex justify-between">
        <Button buttonVariant="text" variant="ghost" title="Delete My Account" />
        <Button type="submit" buttonVariant="text" variant="primary" title="Save Changes" />
      </footer>
    </form>
  );
}
