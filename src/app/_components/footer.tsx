import cx from "classnames";
import Link from "next/link";

interface HeaderProps extends React.HTMLProps<HTMLElement> {}

const Footer: React.FC<HeaderProps> = ({className, ...rest }) => {
  return (
    <footer className={cx('text-slate-200', className)} {...rest}>
      <section className="bg-[#222] p-20">
          <div className="text-center mb-20 text-lg">
            The project is under development, so <a className="darker-link" href="https://twitter.com/grapesjs" target="_blank">stay tuned</a>.
            <br/>
            Being a free and open source project contributors and supporters are extremely welcome.
          </div>
          <div className="flex justify-center">
            <a className="btn btn-gjs" href="/docs">Get Started</a>
          </div>
      </section>
      <section className="bg-[#333] text-center p-3">
        <div className="text-gray-300">
          made with ♥ by <a className="darker-link" href="https://github.com/artf">Artur Arseniev</a>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
