import Link from "next/link";
import cx from "classnames";

const clsContainer = 'container mx-auto px-5';
const clsHeadInner = 'flex flex-wrap items-center md:justify-between gap-7 flex-col md:flex-row';

interface HeaderProps extends React.HTMLProps<HTMLElement> {
  isHome?: boolean,
}

const Header: React.FC<HeaderProps> = ({isHome, className, ...rest }) => {
  const navLinks = [
    { content: 'Docs', href: '/docs' },
    { content: 'GitHub', href: 'https://github.com/grapesjs/grapesjs', target: '_blank' },
    { content: 'Twitter/X', href: 'https://x.com/grapesjs', target: '_blank' },
  ];

  if (isHome) {
    navLinks.unshift(
      { content: 'Support', href: '#support' },
      { content: 'Features', href: '#features' }
    )
  }

  return (
    <header className={cx(className, 'bg-gjs')} {...rest}>
      <div className={cx(clsContainer, clsHeadInner, 'py-4')}>
        <Link id="logo-cont" href="/" className="select-none flex gap-3 items-center">
          <img className="h-[40px]" src="/assets/images/grapesjs-logo-cl.png"/>
          <span className="text-3xl">GrapesJS</span>
        </Link>
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
