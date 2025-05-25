import { twMerge } from "tailwind-merge";

interface ContainerProps {
    className?: string;
    children?: React.ReactNode;
}

const Container = ({ className, children }: ContainerProps) => {
    return <div className={twMerge(className, "l-container")}>{children}</div>;
};

export default Container;
