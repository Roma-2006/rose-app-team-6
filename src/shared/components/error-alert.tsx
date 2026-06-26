import { AlertCircleIcon } from 'lucide-react';
import { Alert, AlertAction, AlertDescription } from './ui/alert';

type ErrorAlertProps = {
  errorMessage?: string;
};

export default function ErrorAlert({ errorMessage = 'Something went wrong' }: ErrorAlertProps) {
  return (
    <Alert className="w-full mt-1 relative flex items-center justify-start ">
      <AlertCircleIcon />
      <AlertDescription>{errorMessage}</AlertDescription>
      <AlertAction></AlertAction>
    </Alert>
  );
}
