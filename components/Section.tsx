import { twMerge } from "tailwind-merge";

interface SectionProps {
    className?: string;
    children?: React.ReactNode;
}

const Section = ({ className, children }: SectionProps) => {
    return <section className={twMerge(className, "l-section")}>{children}</section>;
};

export default Section;
