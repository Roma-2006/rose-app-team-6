import { AlertCircleIcon } from 'lucide-react';
import { Alert, AlertAction, AlertDescription } from './ui/alert';

type ErrorAlertProps = {
  errorMessage?: string;
  isRtl: boolean;
};

export default function ErrorAlert({
  isRtl,
  errorMessage = 'Something went wrong',
}: ErrorAlertProps) {
  return (
    <Alert className="w-full mt-1 relative flex items-center justify-start ">
      <AlertCircleIcon />
      <AlertDescription>{errorMessage}</AlertDescription>
      <AlertAction></AlertAction>
    </Alert>
  );
}
