import Link from "next/link";
import cx from "classnames";
import { GRAPESJS_REPO, GRAPESJS_X } from "@/lib/constants";
import Icon from "@mdi/react";
import { mdiGithub } from '@mdi/js';

const clsContainer = 'container mx-auto px-5';
const clsHeadInner = 'flex flex-wrap items-center md:justify-between gap-7 flex-col md:flex-row';

interface HeaderProps extends React.HTMLProps<HTMLElement> {
  isHome?: boolean,
  transparent?: boolean,
}

const Header: React.FC<HeaderProps> = ({isHome, className, transparent, ...rest }) => {
  const navLinks = [
    { content: 'Careers', href: '/careers' },
    { content: 'Blog', href: '/blog' },
    { content: 'Docs', href: '/docs' },
    // { content: 'Blog', href: '/blog' },
    { content: <Icon path={mdiGithub} size={1}/>, href: GRAPESJS_REPO, target: '_blank' },
    { content: <span className="text-xl">𝕏</span>, href: GRAPESJS_X, target: '_blank' },
  ];

  if (isHome) {
    navLinks.unshift(
      { content: 'Support', href: '#support' },
      { content: 'Features', href: '#features' },
      { content: 'Libre Friends', href: '/libre-friends/' }
    )
  }

  return (
    <header className={cx(className, !transparent && 'bg-gjs')} {...rest}>
      <div className={cx(clsContainer, clsHeadInner, 'py-4')}>
        <div className="relative">
          <Link id="logo-cont" href="/" className="select-none flex gap-3 items-center">
            <img className="h-[40px]" src="/assets/images/grapesjs-logo-cl.png"/>
            <span className="text-3xl">GrapesJS</span>
          </Link>
        </div>
        <nav className="flex flex-wrap justify-center items-center gap-6">
          {navLinks.map(({ href, target, content }) => (
            <Link href={href} target={target} key={href}>
              {content}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
