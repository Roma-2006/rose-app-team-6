interface RegisterPageProps {
  params:
    | Promise<{
        register: string[];
      }>
    | {
        register: string[];
      };
}
