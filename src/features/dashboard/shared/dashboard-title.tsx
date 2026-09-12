type DashboardTitleProps = {
  title: string;
};

export function DashboardTitle({ title }: DashboardTitleProps) {
  return <h2 className=" font-semibold  text-2xl  w-full h-[29px] text-black ">{title}</h2>;
}
