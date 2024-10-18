import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

interface TransitionlinkProps extends LinkProps {
  children: ReactNode;
  href: string;
  className: string;
}

const Transitionlink: React.FC<TransitionlinkProps> = ({
  href,
  children,
  className,
  ...props
}) => {
  const router = useRouter();

  const handleTransition = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <Link
      href={href}
      {...props}
      className={className}
      onClick={handleTransition}
    >
      {children}
    </Link>
  );
};
export default Transitionlink;
